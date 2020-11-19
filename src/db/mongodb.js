// npm installed packages
const mongoose = require('mongoose');
const chalk = require('chalk');

// constants
const mongoDBURL = 'mongodb://127.0.0.1:27017';
const dbName = 'event-manager';

mongoose.connect(mongoDBURL+"/"+dbName,{
    useNewUrlParser:true,
    useCreateIndex:true,
},(error,dbClient)=>{
    if(error){
        return console.log(chalk.red(error));
    }
    console.log(chalk.green("Connected Successfully"));
})