import express from 'express';
import User from '../schemas/User.js';
import { MongoChecker, IsMongoError } from './helpers/mongo_helpers.js';

const router = express.Router();

/*** User API routes ****************/
//create user route
router.post('/api/users', MongoChecker, async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const test = await User.findOne({ username });
	if(test) return res.status(400).json({ error: 'Username is registered'});

	// Create a new user
	const user = new User({
		username,
		password,
	}) 

	try {
		// Save the user
		const newUser = await user.save();
		req.session.user = user._id;
        req.session.username = user.username;
		res.send(newUser);
	} catch (error) {
		if (IsMongoError(error)) { 
			res.status(500).send('Internal server error')
		}else {
			console.log(error)
			res.status(400).send('Bad Request')
		}
	}
})

/*** Login and Logout routes ***/
//login
router.post('/api/users/login', MongoChecker, async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    try {
		const user = await User.findByUsernamePassword(username, password);
		if (!user) {
            res.redirect('/login');
        } else {
            req.session.user = user._id;
            req.session.username = user.username
            res.status(200).send(user);
        }
    } catch (error) {
    	if (IsMongoError(error)) { 
			res.status(500);
		} else {
			console.log(error)
			res.status(400);
		}
    }
})

//logout
router.get('/api/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/');
		}
	})
})

/*** User modification routes ***/

// user update route
router.patch('/api/users/:id', (req, res) => {
	const id = req.params.id

    User.findById(id).then( user =>{

        user.role = req.body.role ? req.body.role: user.role;
        user.weight = req.body.weight ? req.body.weight: user.weight;
		user.age = req.body.age ? req.body.age: user.age;
		user.height = req.body.height ? req.body.height: user.height;
		user.profilePicture = req.body.profilePicture ? req.body.profilePicture: user.profilePicture;
		user.activities = req.body.activities ? req.body.activities: user.activities;

        user.save().then(user => res.json(user))
    }).catch(err => {
		if (IsMongoError(err)) { 
			res.status(500).redirect('/login');
		} else {
			console.log(err)
			res.status(400).redirect('/login');
		}
	});
});
export default router;