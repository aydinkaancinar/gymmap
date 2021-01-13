import express from 'express';
import MapLocation from '../schemas/MapLocation.js';
import { MongoChecker, IsMongoError } from './helpers/mongo_helpers.js';

const router = express.Router();

/*** MapLocation API routes ****************/

//Get all maplocations route
router.get('/api/maplocations', MongoChecker, (req, res) => {
    MapLocation.find()
    .then(maplocations => res.json(maplocations))
    .catch(err => {
        if (IsMongoError(err)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(err)
			res.status(400).send('bad request');
		}
    })
})

//Create a new maplocation route
router.post('/api/maplocations', MongoChecker, async (req, res) => {
    const maplocation = new MapLocation({
        name: req.body.name,
        description: req.body.description,
        coord: req.body.coord,
        icon: req.body.icon,
    });

    try {
        const newMapLocation= await maplocation.save();
        res.send(newMapLocation)
    } catch (error) {
    	if (IsMongoError(error)) { 
			res.status(500).send('Internal server error');
		} else {
			console.log(error)
			res.status(400).send('bad request');
		}
    }
})

//delete a Map Location route
router.delete('/api/maplocations/:id', MongoChecker, (req, res) => {
    const id = req.params.id

    MapLocation.findByIdAndDelete(id)
    .then(maplocation => res.send(maplocation))
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