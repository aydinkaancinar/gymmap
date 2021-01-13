import express from 'express';
import Activity from '../schemas/Activity.js';
import { MongoChecker, IsMongoError } from './helpers/mongo_helpers.js';

const router = express.Router();

/*** Activity API routes ****************/

//Get all activities route
router.get('/api/activities', MongoChecker, (req, res) => {

    Activity.find().sort( [['_id', -1]] )
    .then(activities => res.json(activities))
    .catch(err => {
        if (IsMongoError(err)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(err)
			res.status(400).send('bad request');
		}
    })
})

// Get a single activity by id
router.get('/api/activities/:id', MongoChecker, (req, res) => {
    const id = req.params.id;
    Activity.findById(id)
    .then(activity => res.send(activity))
    .catch(err => {
        if (IsMongoError(err)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(err)
			res.status(400).send('bad request');
		}
    })
})

//Create a new activity route
router.post('/api/activities', MongoChecker, async (req, res) => {

    const activity = new Activity({
        description: req.body.description,
        img: req.body.img,
        detail: req.body.detail,
        username: req.body.username,
        userimg: req.body.userimg
    })

    try {
        const newActivity = await activity.save();
        res.send(newActivity)
    } catch (error) {
    	if (IsMongoError(error)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(error)
			res.status(400).send('bad request');
		}
    }
})

//delete a specific activity route
router.delete('/api/activities/:id', MongoChecker, (req, res) => {
    const id = req.params.id

    Activity.findByIdAndDelete(id)
    .then(activity => res.send(activity))
    .catch(err => {
        if (IsMongoError(err)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(err)
			res.status(400).send('bad request');
		}
    });
})

export default router;