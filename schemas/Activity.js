import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    description:{
        type: String,
        required: true,
        default: 'Activity description'
    },
    img :{
        type: String
    },
    detail :{
    	type: String,
    	default: 'Activity detail'
    },
    username: {
    	type : String,
    	required: true,
    	default :'username'
    }, 
    userimg: {
    	type: String
    }
});

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;