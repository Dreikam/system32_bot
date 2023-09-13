const Pusher = require("pusher");
const PusherListen = require("pusher-js/node");

const pusherTrigger = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const pusherListen = new PusherListen(process.env.PUSHER_KEY, {
  cluster: process.env.PUSHER_CLUSTER,
});

module.exports = {pusherListen, pusherTrigger}