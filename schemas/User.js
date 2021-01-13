import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    weight:{
        type: Number,
        default: 0,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
        required: true,
    },
    height: {
        type: Number,
        default: 0,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    activities: {
        type: [{
            value: String,
            label: String,
        }],
        required: true,
        default: []
    },
    events: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: []
    }
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this 

	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	});
}

const User = mongoose.model('User', UserSchema);

export default User;