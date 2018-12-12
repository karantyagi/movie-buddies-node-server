module.exports = function (app) {
    var session = require('express-session');

    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    const userModel =
        require('./../models/user/user.model.server');

    // admin access
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/pending', findPendingHosts);
    app.post('/api/user', createUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/approve/:userId', approveHost);
    app.post('/api/premium/approve/:userId', grantPremiumAccess);
    app.post('/api/premium/revoke/:userId', revokePremiumAccess);

    // users (guest, hosts)
    app.post('/api/login', login);
    app.post('/api/register', register);
    // app.post('/api/profile', getProfile);
    app.get('/api/profile', profile);
    app.get('/api/profile/guest', getGuestProfile);
    app.get('/api/profile/host', getHostProfile);
    app.post('/api/logout', logout);
    app.put('/api/profile', updateProfile);
    app.put('/api/user', updateUser);
    app.delete('/api/user', deleteProfile);

    // // Get logged in user
    // function getProfile(req, res) {
    //     console.log('return session', res.status);
    //     if (res.status == 'success') {
    //         console.log('USER in SESSION', req.session['user']);
    //         userModel.findUserById(req.session['user']._id).then((user) =>
    //             res.json(user));
    //     } else {
    //         res.send(null);
    //     }
    // }

    // check which user is in session
    function profile(req, res) {
        console.log(req.session);
        if(req.session['user'] != null) {
            res.send(req.session['user']);
        } else { res.send(
            { "username" : "No session maintained"
            });}
    }


    function createUser(req, res) {
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            let user = req.body;
            userModel.findUserByUsername(user.username).then(function (u) {
                console.log(u);
                if (u != null) {
                    res.json({status: false});
                } else {
                    userModel.createUser(user).then(function (user) {
                        console.log(user);
                        if(user.role == 'Host' || user.role == 'Admin'){
                            if(user.rating == null){
                                user.rating = '5';}
                        }
                        userModel.createUser(user)
                            .then(function () {
                                res.send({status: true});
                            });
                    })
                }
            })

        }
        else {
            res.json({status: 'no-session-exists'});
        }
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (user) {
                res.send(user);
            });
    }

    function findUserById(req, res) {
        let userId = req.params['userId']
        userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function findPendingHosts(req, res) {
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            userModel.findPendingHosts()
                .then(function (user) {
                    res.json(user);
                });
        }
    }


    function login(req, res) {
        let user = req.body;
        let username = user.username;
        let password = user.password;
        userModel.findUserByCredentials(username, password)
            .then((u) => {
                if (u != null) {
                    if ((u.role === 'Guest' || u.role === 'Admin')
                        || (u.role === 'Host' && u.requestStatus != 'Pending')) {
                        req.session['user'] = u;
                        res.json({status: 'success', role: u.role, user: u})
                    } else {
                        res.json({status: 'Host verification pending', role: null, user: null});
                    }

                } else {
                    res.json({status: 'user does not exists', role: null, user: null });
                }

            });

    }

    function register(req, res) {
        let user = req.body;
        let username = user.username;
        userModel.findUserByUsername(username).then(function (u) {
            console.log(u);
            if (u != null) {
                res.json({status: false});
            } else {
                if(user.role == 'Host' || user.role == 'Host'){
                    if(user.rating == null){
                    user.rating = '5';}
                }
                userModel.createUser(user).then(function (user) {
                    req.session['user'] = user;
                    res.json({status: true});
                })
            }
        })

    }

    function getGuestProfile(req, res) {
        if (req.session && req.session['user']) {
            console.log('check this');
            console.log(req.session['user']);
            userModel.findUserById(req.session['user']._id).then((user) =>
                res.json(user)
            );
        } else {
            res.send(null);
        }

    }

    function getHostProfile(req, res) {
        if (req.session && req.session['user']) {
            console.log('check this');
            console.log(req.session['user']._id);
            userModel.findHostById(req.session['user']._id)
                .then((host) => {
                    console.log('--------- host \n', host);
                    res.json(host);
                })
            // res.json(req.session['user']);
        } else {
            res.send(null);
        }

    }

    function updateProfile(req, res) {
        if (req.session && req.session['user']) {
            let user = req.session['user'];
            let id = user._id;
            // console.log(id);
            let newUser = req.body;
            userModel.updateUser(id, newUser).then(
                function (status) {
                    newUser['_id'] = id;
                    req.session['user'] = newUser;
                    res.send(status);
                }
            );

        } else {
            res.send(null);
        }
    }


    function updateUser(req, res) {
            let newUser = req.body;
            console.log('  ---------------  000000000000000 -----------   ' ,newUser);
            userModel.updateUser(newUser._id, newUser).then(
                function (status) {
                    res.send(status);
                });
    }

    function logout(req, res) {
        if (req.session && req.session['user']) {
            //delete req.session['user'];
            req.session.destroy();
            res.send('logged-out');

        }
        else {
            res.send('no-session-exists');
        }

    }

    function deleteUser(req, res) {
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            let id = req.params['userId'];
            userModel.deleteUser(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.json({status: 'no-session-exists'});
        }
    }

    function deleteProfile(req, res) {
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            let id = req.session['user']._id;
            userModel.deleteUser(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('no-session-exists');
        }
    }

    function approveHost(req, res) {
        console.log('in here');
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            let id = req.params['userId'];
            console.log(id);
            userModel.approveHost(id).then((status) =>
            userModel.findUserById(id).then(user => {
               // console.log(user.email);
                sendEmailToUser(user.email, user.username);
               res.send(status);
            }))

        }
        else {
            res.send('no-session-exists');
        }
    }

    function grantPremiumAccess(req, res) {
        console.log('in here');
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            let id = req.params['userId'];
            console.log(id);
            userModel.grantPremiumAccess(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('no-session-exists');
        }
    }

    function revokePremiumAccess(req, res) {
        console.log('in here');
        if (req.session && req.session['user'] && req.session['user'].role === 'Admin') {
            let id = req.params['userId'];
            console.log(id);
            userModel.revokePremiumAccess(id).then(function (status) {
                res.send(status);
            })

        }
        else {
            res.send('no-session-exists');
        }
    }

    // function sendEmailToUser(emailAddress, username) {
    //     const sgMail = require('@sendgrid/mail');
    //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //     const msg = {
    //         to: emailAddress,
    //         from: 'JobSearchMadeEasy@enjoy.com',
    //         //templateId: 'e1ac3968-cf00-4d86-8012-869ab6d97429'
    //         subject: 'You are verified!!',
    //         text: 'Hi '+username+',\n' +
    //         'Welcome to Movie Buddies.\n' +
    //         'You are now a verified host. Thanks for joining us. Enjoy the features of ' +
    //         'our new application by logging in creating movie events and organize awesome movie parties',
    //     };
    //      return sgMail.send(msg);
    // }

}
