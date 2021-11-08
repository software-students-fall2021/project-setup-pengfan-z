const { Router } = require("express");
const axios = require("axios");
const loginRouter  = Router();
const e = require("express");
const account = require("../public/teamPasswords.js");


loginRouter.get("/", (req,res)  =>{
  
    let userName = req.query.username; 
    let passWord = req.query.password; 
   // let storedUsername = account.accountName;
    //console.log(storedUsername);
    console.log(userName);
    console.log(passWord);
    // for all objects in account, check accountNames and then passwords, then send res messages 
    //axios.get(url) async functions 
    const entries = Object.entries(account);
    //console.log(entries);
    for (item in entries){
       //console.log(entries[item][1].accountName);
        let key = entries[item][1];
        //console.log(`${key}: ${value}`);
        console.log(key.accountName);
        console.log(userName);
        if (key.accountName == userName ){
            console.log(key.accountName);
            if (key.accountPassword == passWord ){
                console.log(key.passWord);
                res.send({response: 'success'})
                console.log("Found");
            }
        }

        //we need to capture accountName
    }    
    res.send({response: 'hello'})
    console.log("Not Found");
   /*  try{
        res.send(account);
    }
    catch(err){
        res.send(err)
    } */
});


module.exports = {
    loginRouter,
  };