import express from 'express';
import Event from '../schemas/Event.js';
import User from '../schemas/User.js';
import mongoose from 'mongoose';
import { MongoChecker, IsMongoError } from './helpers/mongo_helpers.js';

const router = express.Router();

/*** Events API routes ****************/

//Get all events route
router.get('/api/events', MongoChecker, (req, res) => {
    Event.find().sort( [['_id', -1]] )
    .then(event => res.json(event))
    .catch(err => {
        if (IsMongoError(err)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(err)
			res.status(400).send('bad request');
		}
    })
})

// Get a single event by id
router.get('/api/events/:id', MongoChecker, (req, res) => {
    const id = req.params.id;

    console.log(id);
    Event.findById(id).then(event => res.send(event))
    .catch(err => {
        if (IsMongoError(err)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(err)
			res.status(400).send('bad request');
		}
    })
})

//Create a new event route
router.post('/api/events', MongoChecker, async (req, res) => {
    const event = new Event({
        name: req.body.name,
        time: req.body.time,
        place: req.body.place,
        category: req.body.category,
        capacity: req.body.capacity,
        img: req.body.img
    });

    try {
        const newEvent= await event.save();
        res.send(newEvent)
    } catch (error) {
    	if (IsMongoError(error)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(error)
			res.status(400).send('bad request');
		}
    }
})

//delete a specific event route
router.delete('/api/events/:id', MongoChecker, (req, res) => {
    const id = req.params.id

    Event.findByIdAndDelete(id)
    .then(event => res.send(event))
    .catch(err => {
        if (IsMongoError(err)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(err)
			res.status(400).send('bad request');
		}
    });
})

router.patch('/api/events/:id/:attendantid', MongoChecker, async (req, res) => {
    const eventid = mongoose.Types.ObjectId(req.params.id);
    const attendantid = mongoose.Types.ObjectId(req.params.attendantid);

    try {
        let event = await Event.findById(eventid);
        let user = await User.findById(attendantid);
        const indexOfUser = event.attendants.indexOf(attendantid);
        const indexOfEvent = user.events.indexOf(eventid);
        //This is the only place user events is modified so it should
        //be consistent with event attendants including it.
        if(indexOfUser > -1){
            event.attending -= 1;
            event.attendants.splice(indexOfUser, 1);
            user.events.splice(indexOfEvent,1);
        }else{
            event.attending += 1;
            event.attendants.push(attendantid);
            user.events.push(eventid);
        }
        let updatedEvent = await event.save();
        let updatedUser = await user.save();
        res.send({"activity": updatedEvent, "user":updatedUser});
    } catch (error) {
    	if (IsMongoError(error)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(error)
			res.status(400).send('bad request');
		}
    }
});

export default router;