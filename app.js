const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const db = require('./config/mongooseConnection')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname , 'public')))

app.use('/owners' , ownersRouter);
app.use('/users' , usersRouter)
app.use('/products' , productsRouter)

app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`);  
})