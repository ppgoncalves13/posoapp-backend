const getNotifications = require("./functions/notifications")
const schedule = require('node-schedule');
var http = require('http');
require('dotenv').config()

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end("<html></html>", 'utf-8');
}).listen(process.env.PORT || 5000);

// Repeat Queue every 2 mins
console.log("Start notifications Queue...")

const job = schedule.scheduleJob('*/2 * * * *', async () => await getNotifications());

