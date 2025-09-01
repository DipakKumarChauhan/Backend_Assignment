const mongoose =  require('mongoose');

const ProjectSchema  =  new mongoose.Schema({
    title: {
        type:String,
        required: true,

    },
    description: String,
    links: [String]
});

const WorkSchema  =  new mongoose.Schema({
    company: String,
    role: String,
    startDate: Date,
    endDate: Date,
    description: String

});

const ProfileSchema =  new mongoose.Schema({
    name: {
        type: String , 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    education: [String],
    skills: [String],
    projects: [ProjectSchema],
    work: [WorkSchema],
    links: {
        github:String,
        linkedin: String,
        // portfolio: String
    }
}, {timestamps: true});

module.exports =  mongoose.model('Profile', ProfileSchema);