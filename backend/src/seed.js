require('dotenv').config();

const mongoose =  require ('mongoose');

const Profile =  require('./models/Profile');

const connectDB =  require('./config/db');

const seedProfile =  {
    name: "Dipak Kumar Chauhan",
    email: "ece22133@iiitkalyani.ac.in",
    education: ["Btech", "IIIT Kalyani"],
    skills: ["Node.js", "MongoDB", "JavaScript", "Express", "React", "Deep learning", "Machine Learning"],
    projects: [
      {
        title: "API Playground",
        description: "Backend assignment project",
        links: ["https://github.com/yourusername/yourrepo"]
      }
    ],
    work: [
      {
        company: "Self",
        role: "stuident",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-30"),
        description: "Worked on backend APIs"
      }
    ],
    links: {
        github: "https://github.com/DipakKumarChauhan",
        linkedin: "https://www.linkedin.com/in/dipak-kumar-chauhan/",
        //portfolio: "https://yourportfolio.com"
      }
};

const seedDB = async () => {
    try {
      await connectDB();
      await Profile.deleteMany();       // Clean slate - delete old profiles
      await Profile.create(seedProfile);
      console.log('Database seeded with your profile.');
      process.exit(0);
    } catch (err) {
      console.error('Seeding error:', err);
      process.exit(1);
    }
  };

  seedDB();