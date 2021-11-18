const { Router } = require('express');
const { User } = require('../db');

const JWT = require('jsonwebtoken');
const passportConf = require('../passport');
const passport = require('passport');


const userPortalRouter = Router();

userPortalRouter.use(passport.initialize())

userPortalRouter.get("/:userToSearch", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { userToSearch } = req.params; // TODO: replace with token after incorportating authentication
    console.log(userToSearch);
    User.find({username: userToSearch}, (err, data) => {
        if(err) {
            res.status(500).send(`Error: ${error.message}`);
        }
        else {
            // console.log(data);
            res.json(data);
        }
    })
})

module.exports = { userPortalRouter };