const router = require('express').Router();
let User = require('../models/user.model');


router.route('/signup').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const score = 0
    if(!username){
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank '
        })
    }
    if(!password){
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank '
        })
    }
    if(score !== 0){
        return res.send({
            success: false,
            message: 'Error: Server Error [default score]'
        });
    }
    User.find({
        username: username
    }, (err, previousUsers) =>{
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server Error '
            });
        } else if(previousUsers.length>0) {
            return res.send({
                success: false,
                message:'Error: Username already exists'
            });
        }
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.score = score;
        newUser.save((err, user) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            return res.send({
                success: true,
                message: 'Sign Up Complete'
            });
        });
    });
});

module.exports = router;