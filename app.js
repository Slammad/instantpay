const express=require('express');
const morgan =require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const usersRoute =require('./api/routes/users');
const cors=require('cors')
const app=express();

mongoose.connect("mongodb://localhost:27017/instantpay",{
    useNewUrlParser:true
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())


app.use('/users',usersRoute)

app.use((req,res,next)=>{
    const error = new Error("End point not found");
    error.status=404;
    next(error)
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})



module.exports=app;