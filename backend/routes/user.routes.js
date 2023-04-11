//All User related routes

//import dependencies
const router = require("express").Router();
const {validateCreateUserTravelHistory} = require("../middleware/validateUserTravelRequest");
const {getUsersTravelHistory, createUserTravelHistory} = require("../controllers/user.controller")

// route to fetch all the form submissions i.e all users travel history
router.get("/", getUsersTravelHistory);

//route to create a new travel history for a user
router.post("/create/travel-history", validateCreateUserTravelHistory, createUserTravelHistory)

module.exports = router;