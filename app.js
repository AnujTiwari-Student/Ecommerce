const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv').config()
const flash = require('connect-flash')
const expressSession = require('express-session')

const db = require('./config/mongooseConnection')

const ownersRouter = require('./routes/ownersRouter')
const initialRoute = require('./routes/index')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')

const dbgr = require('debug')("development:app")


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname , 'public')))
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash())

app.use('/' , initialRoute)
app.use('/owners' , ownersRouter);
app.use('/users' , usersRouter)
app.use('/products' , productsRouter)

app.listen(3000, ()=>{
    dbgr(`Server is running on port 3000`); 
})