const notificationsQueue = require("./notifications.js")

// Repeat Queue every 2 mins
notificationsQueue.add({ repeat: { cron: '*/2 * * * *' }});