

// src/controllers/profileController.js

const Profile = require('../models/Profile');

// Create or Update Profile
exports.upsertProfile = async (req, res) => {
  try {
    console.log("Received update for:", req.body.email);
    console.log("Payload:", req.body);

    const filter = { email: req.body.email };
    const update = req.body;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const profile = await Profile.findOneAndUpdate(filter, update, options);
    console.log("Updated profile:", profile);

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error in upsertProfile: ", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};


// Get Profile by email
exports.getProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Profile.findOne({ email });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Query (search) Profiles by Skill
exports.findProfileBySkill = async (req, res) => {
  try {
    const skill = req.query.q;
    if (!skill) return res.status(400).json({ error: "Query parameter 'q' is required." });

    const profiles = await Profile.find({ skills: { $in: [skill] } });
    res.json(profiles);
  } catch (error) {
    console.error("Error in findProfileBySkill: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Top skills (optionally by frequency)
exports.getTopSkills = async (req, res) => {
  try {
    const skills = await Profile.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(skills);
  } catch (error) {
    console.error("Error in getTopSkills: ", error);
    res.status(500).json({ error: "Server Error" });
  }
};
