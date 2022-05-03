const getNotifications = require("./functions/notifications")
const schedule = require('node-schedule');

// Repeat Queue every 2 mins
console.log("Start notifications Queue...")

const job = schedule.scheduleJob('*/1 * * * *', async () => await getNotifications());