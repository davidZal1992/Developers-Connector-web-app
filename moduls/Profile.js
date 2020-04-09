const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    website:{
        type: String
    },
    gender:{
        type:String,
        required: true
    },
    location:{
        type: String,
    },
    status:{
        type: String,
        required: true
    },
    skills: {
        type:[String],
        required: true
    },
    bio: {
        type: String
    },
    githunusername:{
        type: String
    },
    experiencre: [
        {
            title:{
                type: String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location:{
                type: String
            },
            from:{
                type:Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    education:[{
        school: {
            type: String,
            required: true
        },
        fieldofstudy:{
            type:String,
            required:true
        },
        from:{
            type:Date,
            required: true
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }
    ],
        social: {
            youtube:{
                type:String
            },
            facebook:{
                type: String
            },
            linkedin:{
                type: String
            },
            instagram:{
                type:String
            }
        },  
        }); 

        module.exports = Profile = mongoose.model('profile',ProfileSchema)
        
