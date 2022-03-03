const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-2'
});

const storage = multer.memoryStorage({
    destination: function (req, res, callback) {
        callback(null, '')
    }
});

const upload = multer({ storage: storage });

router.get('/cursos/file', (req, res) => {
    res.render('cursos/file');
});

router.post('/cursos/file', upload.single('image'), (req, res) => {

    let myFile = req.file.originalname.split(".");
    const fileType = myFile[myFile.length - 1];

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Not Upload')
        }
        console.log('Upload')
    });

    req.flash('success_msg', 'Se cargo el archivo correctamente');
    res.redirect('/cursos/file')
});
module.exports = router;