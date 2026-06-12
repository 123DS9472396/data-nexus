const router = require("express").Router();
const { receiveWebhook } = require("../controllers/eventController");

router.post("/pipeline", receiveWebhook);

module.exports = router;
