const mongoose = require('mongoose')
const config = require('config')
const dbgr = require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGODB_URI")}/EcommerceApp`)
.then(function(){
    dbgr(`Connected to Database successfully`);
})
.catch(function(err){ 
    dbgr(`Error connecting to database: ${err}`);
});

module.exports = mongoose.connection;