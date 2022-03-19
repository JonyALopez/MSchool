const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-2'
});

var data;
async function getData() {
    data = await s3.listObjectsV2({
        Bucket: process.env.AWS_BUCKET_NAME
    }).promise();

    let key = [];
    for (let index = 0; index < data['Contents'].length; index++) {
        let types = data['Contents'][index]['Key'].slice(-3);
        let values = false;
        if (types === 'mp4') {
            values = true;
        }
        key.push({ name: data['Contents'][index]['Key'], type: types, value: values });
    }
    return key;
}

router.get('/cursos/files', (req, res) => {
    let urlKey = [];
    (async() => {
        urlKey = await getData();
        console.log("-");
        res.render('cursos/files', { urlKey });
    })()
})
module.exports = router;