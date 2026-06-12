const Event = require("../models/Event");

const clients = new Set();   // SSE connected clients

const addClient = (res) => {
  clients.add(res);
  res.on("close", () => clients.delete(res));
};

const broadcast = (data) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(client => client.write(payload));
};

const receiveWebhook = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    broadcast(event);
    res.status(201).json({ message: "Event logged", event });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const streamEvents = (req, res) => {
  res.set({
    "Content-Type":  "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection":    "keep-alive",
  });
  res.flushHeaders();
  addClient(res);

  // Send last 10 events on connect
  Event.find().sort({ created_at: -1 }).limit(10)
    .then(events => {
      events.reverse().forEach(e => {
        res.write(`data: ${JSON.stringify(e)}\n\n`);
      });
    });
};

const getEvents = async (req, res) => {
  const { pipeline_id, event_type, limit = 50 } = req.query;
  const filter = {};
  if (pipeline_id) filter.pipeline_id = Number(pipeline_id);
  if (event_type)  filter.event_type  = event_type;
  const events = await Event.find(filter)
    .sort({ created_at: -1 })
    .limit(Number(limit));
  res.json(events);
};

module.exports = { receiveWebhook, streamEvents, getEvents };
