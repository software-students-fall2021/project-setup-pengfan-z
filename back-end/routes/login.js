const { Router } = require('express');
const axios = require('axios');
const loginRouter = Router();
const e = require('express');
const account = require('../public/teamPasswords.js');


loginRouter.post('/', (req, res) => {
  let userName = req.body.username;
  let passWord = req.body.password;
  
  const entries = Object.entries(account);
  //console.log(entries);
  for (item in entries) {
    //console.log(entries[item][1].accountName);
    let key = entries[item][1];
    //console.log(`${key}: ${value}`);
   // console.log(key.accountName);
   // console.log(userName);
    if (key.accountName == userName) {
      if (key.accountPassword == passWord) {
        return res.send({ response: true });
        // console.log("Found");
      }
    }

    //we need to capture accountName
  }
  
  res.send({ response: false });
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
