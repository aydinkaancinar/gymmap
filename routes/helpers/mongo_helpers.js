import mongoose from 'mongoose';
//This middleware is copied from class all credit to MARK
const MongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        console.log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}
const IsMongoError = (error) => { 
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}
export { IsMongoError, MongoChecker };