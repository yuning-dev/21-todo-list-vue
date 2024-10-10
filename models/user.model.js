const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    mongoose.Schema(
        {
            username: String,
            email: String,
            password: String,
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Role'
                }
            ]
        },
        { timestamps: true}
    )
)

module.exports = User