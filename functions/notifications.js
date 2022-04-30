const db = require("./firestore.js")
const fcm = require("./fcm.js")
const Queue = require('bull')

const notificationsQueue = new Queue("notifications");

notificationsQueue.process(function async(job) {

    let users = await db.collection('med_intake').get();

    for (let user in users) {
        const date = new Date()

        const reg_token = user.data().registration_token

        const future_intakes = await db.doc(user).collection(_formatDate(date)).where('time', '>', date.getTime()).get()

        for (let intake of future_intakes) {
            const now = new Date().getTime()
            const in_5_minutes = now + 300000

            if (intake.time <= in_5_minutes) { 

                const message = { 
                    to: reg_token, 
                    collapse_key: 'posoapp-a4ee9',
                    
                    notification: {
                        title: intake.med_name,
                        body: `Tomar medicamento : ${_formatTime(intake.time)}`
                    },
                    
                    data: {  //you can send only notification or only data(or include both)
                        my_key: 'my value',
                        my_another_key: 'my another value'
                    }
                }


                fcm.send(message, function(err, response){
                    if (err) {
                        console.log("Something has gone wrong!")
                    } else {
                        console.log("Successfully sent with response: ", response)
                    }
                })
            }
            
        }

    }
});

_formatTime = (time) => {
    const date = new Date(time)

    return `${date.getHours()}:${date.getMinutes()}`
} 

_formatDate = (date) => {
    let month = date.getMonth()+1;
    let day = date.getDay()

    if (month < 10) {
        month = `0${month}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    return `${day}-${month}-${date.getFullYear()}`
}

module.exports = notificationsQueue