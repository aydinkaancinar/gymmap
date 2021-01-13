import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        min: 1,
        default: 1,
        required: true
    },
    attending: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    img: {
        type: String,
        required: true
    }, 
    attendants: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: []
    }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;