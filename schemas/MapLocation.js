import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MapLocationSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    coord:{
        type: {
            lat:{
                type: Number,
                required: true
            },
            lng:{
                type: Number,
                required: true
            }
        },
        required: true
    },
    icon:{
        type:{
            url:{
                type: String,
                required: true
            },
            scaledSize:{
                type: Number,
                default: 25
            }
        }
    }
});

const MapLocation = mongoose.model('MapLocation', MapLocationSchema);

export default MapLocation;