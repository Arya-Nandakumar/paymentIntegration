const express = require('express')
const app = express()
const router = require('./routes/paymentRoutes')



//initializing port
const port = process.env.PORT || 4599

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(express.static('public'))
app.use(express.json())
app.set('view engine','ejs')


 
//listen
app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`)
})




