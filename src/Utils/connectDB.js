const mongoose = require('mongoose');

const connect = async () => {
    try {
        const urlDb =
            process.env.TYPE === 'DEV'
                ? process.env.MONGO_URI_COMPASS
                : process.env.MONGO_URI_CLOUD;
        await mongoose.connect(urlDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected Successfully`);
    } catch (err) {
        console.log(`MongoDB Connection Failed`);
    }
};

module.exports = { connect };
