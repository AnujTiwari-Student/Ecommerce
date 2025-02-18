const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
.then(function(){
    console.log(`Connected to Database successfully`);
})
.catch(function(err){
    console.log(`Error connecting to database: ${err}`)
})

module.exports = mongoose.connection;