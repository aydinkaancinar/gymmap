import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

import users from './routes/users.js';
import activities from './routes/activities.js';
import events from './routes/events.js';
import maplocations from './routes/maplocations.js';

import 'path';

const app = express();

//MONGODB setup
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'csc309202',
    cookie: { 
        expires: 600000000,
        httpOnly: true 
    },
    saveUninitialized: false,
    resave: false,
}));

//API uses
app.use(users);
app.use(activities);
app.use(events);
app.use(maplocations);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`));