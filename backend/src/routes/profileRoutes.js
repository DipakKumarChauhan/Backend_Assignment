const express = require('express');
const router =  express.Router();
const profileController =  require('../controllers/profileController');
const authenticate =  require('../middleware/auth');
const { profileValidationRules, validateProfile } = require('../middleware/validateProfile');
// Upsert (create or update) profile

router.post('/',authenticate, profileValidationRules, validateProfile, profileController.upsertProfile);

// Search profiles by skill

router.get('/search', profileController.findProfileBySkill);

// Get top skills

router.get('/top/skills', profileController.getTopSkills);


// Get profile by email

router.get('/:email', profileController.getProfile);


module.exports = router;