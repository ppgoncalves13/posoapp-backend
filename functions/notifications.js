const db = require("./firestore.js").db
const messaging = require("./firestore.js").messaging

getNotifications = async () => {
    console.log("Start notifications process...")
    const users_ref = db.collection('med_intake')
    const users_snapshot = await users_ref.get();

    const users = []
    const date = new Date()

    users_snapshot.forEach(user => {
        let user_data = user.data()

        const reg_token = user_data.registration_token

        users.push({ "token": reg_token, "email": user.id })
    });

    let intakes = []

    for (let user of users) {
        const intakes_ref = db.collection('med_intake').doc(user.email).collection(_formatDate(date))
        const intakes_snapshot = await intakes_ref.get()

        intakes_snapshot.forEach(intake => {
            intake_data = intake.data()
            intakes.push({
                "token": user.token,
                ...intake_data
            })
        })
    }

    console.log(`# of intakes ${intakes.length}`)

    for (let intake of intakes) {
        const now = new Date().getTime()
        const in_5_minutes = now + 300000

        if (intake.time > now && intake.time <= in_5_minutes) {

            const message = {
                notification: {
                    title: intake.med_name,
                    body: `Tomar medicamento : ${_formatTime(intake.time)}`
                }
            }

            messaging.sendToDevice(intake.token, message)
        }
    }
}

_formatTime = (time) => {
    const date = new Date(time)

    return `${date.getHours()}:${date.getMinutes()}`
}

_formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDay() + 1;

    if (month < 10) {
        month = `0${month}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    return `${day}-${month}-${date.getFullYear()}`
}

module.exports = getNotifications