const { Router } = require('express');
const { User } = require('../db');

const userPortalRouter = Router();

userPortalRouter.get("/:userToSearch", async (req, res) => {
    const { userToSearch } = req.params;
    console.log(userToSearch);
    User.find({username: userToSearch}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            // console.log(data);
            res.json(data);
        }
    })
})

module.exports = { userPortalRouter };