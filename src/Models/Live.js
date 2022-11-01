const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liveModel = new Schema(
    {
        iframeURL: { type: String, required: true },
        descVideo: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Live', liveModel);
