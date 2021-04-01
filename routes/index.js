var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var fs = require('fs');
var PDF = require('pdfkit');
var multer = require('multer');

router.get('/', function(req, res, next) {
    res.render('login');
});

router.get('/student', function(req, res, next) {
    try{
    var login_id = req.session.user_id;
    if(login_id){
        //  Fetch images of the student who logged in
        mongoose.model('images').find({'student_obj.student_id': login_id}, function(err, images) {
            if(err){
                console.log(err);
                res.end("Something went wrong!");
            }else{
                console.log(images);
                res.render('studentdashboard', {images:images});
            }
        });    
        
    }else
        res.render('login');
    }catch(e){
        console.log(e);
    }
});

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "public/uploads");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 10);

router.post('/upload_images', async function(req, res, next) {
    var login_id = req.session.user_id;
    if(login_id){
        var reqs = req.body;
        console.log(reqs);

        upload(req, res, function(err) {
            if (err) {
                console.log(err);
                return res.end("Something went wrong!");
            }else{
                for(var i=0;i<req.files.length;i++){
                    var image_obj = {
                        student_obj: {
                            student_id: login_id                        
                        },
                        image_path: req.files[i].path
                    };
                    console.log(image_obj);
                    // Saving images in the db
                    mongoose.model('images').create(image_obj);    
                }
                res.redirect('/student');
            }
            // return res.end("File uploaded sucessfully!.");
        });
    }else
        res.render('login');
});

router.post('/studentlogin', function(req, res, next) {
    var login_id = req.session.user_id;

    var reqs = req.body;
    console.log(reqs);
    mongoose.model('users').findOne({ Email: reqs.email, password: reqs.pass }, function(err, Obj) {
        if (err) { console.log(err) } else {
            if (Obj) {
                req.session.user_id = Obj._id;
                req.session.email_id = Obj.email_id;
                res.send({ status: 1, massage: 'Successfully login ', 'Obj': Obj });
            } else {
                res.send({ status: 2, massage: 'Invalid email  and password' });
            }
        }
    });
});

router.get('/register', function(req, res, next) {
    mongoose.model('users').find({ status: 1 }, function(err, Obj) {
        if (err) {
            console.log(err);
        } else {
            if (Obj) {
                res.render('issue', { dataobj: Obj });
            }
        }
    });
    res.render('register');
});

router.post('/register', function(req, res, next) {
    var reqs = req.body;
    try{
    console.log(reqs);
    var user_obj = {
        role_id: 1,
        first_name: reqs.first_name,
        last_name: reqs.last_name,
        Email: reqs.Email,
        password: reqs.password,
        Mobile_number: reqs.Mobile_number,
        gender: reqs.gender,
    };
    console.log(user_obj);
    mongoose.model('users').create(user_obj, function(err, Obj) {
        if (err) {
            console.log(err);
            res.json({ data: 'Failure' });
        } else {
            if (Obj) {
                res.render('register');
            } else {
                res.json({ data: 'Failure' });
                console.log('Object Failure');
            }
        }
    });
    }catch(e){
        console.log(e);
    }
});



module.exports = router;