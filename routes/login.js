const router = require('express').Router();
const User = require('../models/user.model');
const UserSession = require('../models/userSession.model');

router.route('/').get((req , res) => {
    User.find({}).select({"username":1,"score":1,"_id":0})
    .then( users => {
        res.json(users)})
    .catch(err => res.send(err))
})
router.route('/user').post((req, res) => {
    const userId = req.body.userId
    // const ObjectId = require('mongoose').Types.ObjectId;
    // const idFromToken = {_id: new ObjectId(token.toString())}
    User.findById(userId,
        (err, userInfo) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            if (userInfo == null) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid userId'
                });
            } else {

                res.send(userInfo)
            }
        })
});
router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //Check input Username and Password
    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank '
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank '
        })
    }
    //Check for Username Against password
    User.find({
        username: username
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid username or password'
            });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid username or password'
            });
        }
        //Create User session

        const userSession = new UserSession();
        userSession.userId = user._id;

        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid log in',
                token: doc._id
            });
        });
    });
});

router.route('/verify').get((req, res) => {
    const token = req.query.token;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error '
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid Session'
            });
        } else {
            return res.send({
                success: true,
                message: 'Session Verified',
                userId: sessions[0].userId
                
            });
        }
    });
});
router.route('/submit').post((req, res) => {
    const userId = req.body.userId
    let score = req.body.score
    User.findById(userId,
        (err, userInfo) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }
            if (userInfo == null) {
                return res.send({
                    success: false,
                    message: 'Your score was not submitted, you may not be logged in'
                });
            } else {
                User.findOneAndUpdate({
                    _id: userId
                }, {
                    $set:{score: (userInfo.score+score)}
                }, (err, user) => {
                    if(err) {
                        return res.send({
                            success: false,
                            message: 'Error: Server Error'
                        });
                    } else {
                        return res.send({
                            success: true,
                            message: 'Score Submitted'
                        })
                    }
                })
            }
        });
    
})
router.route('/logout').get((req, res) => {
    const token = req.query.token;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: { isDeleted: true }
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        } else {
            return res.send({
                success: true,
                message: 'Logout Successful'
            });
        }
    });
});

module.exports = router;