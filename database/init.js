const mongoose = require('mongoose')
mongoose.Promise = Promise

function connectDB(){
    const url = process.env.MONGO
    const options = {
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        keepAlive: 10
    }
    const db = mongoose.connection

    db.on('error' ,function (e){
        console.log(e)
    })

    db.on('connected', () => {
        console.log('connected to MongoDB')
    })

    function connect (){
        mongoose.connect(url, options).then(r => console.log('result'))
    }
    connect()
}

module.exports = {connectDB}