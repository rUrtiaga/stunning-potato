const mongoose = require("mongoose")
const { MONGO_URL } = require("../../config")

async function cleanDB(params) {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    await mongoose.connection.db
        .dropDatabase()
        .then(() => console.log("database droped"))
        .catch(e => {
            throw "error dropping db"
        })
    await mongoose.disconnect()
}

cleanDB()
