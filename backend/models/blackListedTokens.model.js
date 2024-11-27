const mongoose = require('mongoose');

const blackListedTokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true, unique: true },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 2 * 24 * 60 * 60 // 2 days in seconds
        }
    }
)

const blackListedTokenModel = mongoose.model('BlackListedToken' , blackListedTokenSchema);

module.exports = blackListedTokenModel;