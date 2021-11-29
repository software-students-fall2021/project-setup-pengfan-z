const JWT = require('jsonwebtoken');
const passport = require('passport');
const { Router } = require('express');
const { User } = require('../db');

const passportConf = require('../passport');

const userPortalRouter = Router();

userPortalRouter.use(passport.initialize());

userPortalRouter.get(
    '/:userToSearch',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { userToSearch } = req.params; // TODO: replace with token after incorportating authentication
        User.find({ username: userToSearch }, (err, data) => {
            if (err) {
                res.status(500).send(`Error: ${err.message}`);
            } else {
                // console.log(data);
                res.json(data);
            }
        });
    }
);

module.exports = { userPortalRouter };
