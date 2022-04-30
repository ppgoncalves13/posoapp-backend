const FCM = require('fcm-node')
var serverKey = require('./../serviceAccountKey.json')
const fcm = new FCM(serverKey)

module.exports = fcm;