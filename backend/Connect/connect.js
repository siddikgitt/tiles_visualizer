const mongoose = require("mongoose");
const connect = () => {
    return mongoose.connect("mongodb+srv://siddikkhanpathan4:HazkTm3qVqeW3Jo3@cluster0.oawarha.mongodb.net/?retryWrites=true&w=majority")
}

module.exports = connect;