require('dotenv').config()

module.exports = {
    url: process.env.MONGO_DB_TESTDG || "mongodb+srv://dbadmin:zppe9KyygG9deZE6@clusterdg.ain8b.mongodb.net/test?retryWrites=true&w=majority"
};