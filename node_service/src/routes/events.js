const router = require("express").Router();
const { streamEvents, getEvents } = require("../controllers/eventController");

router.get("/stream", streamEvents);
router.get("/",       getEvents);

module.exports = router;
