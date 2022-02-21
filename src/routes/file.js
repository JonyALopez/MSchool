const express =require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({destination: (req,file,cb)=>{

    cb(null,'./archivos')
},
filename:(req,file,cb) =>{
    cb(null,file.originalname)
}
})
const upload = multer({storage: storage});

router.get('/cursos/file',(req,res) =>{
    res.render('cursos/file');
});

router.post('/cursos/file',upload.array('archivos'),(req,res)=>{
    console.log(req.file)
    req.flash('success_msg', 'Se cargo el archivo correctamente');
        res.redirect('/cursos');
   // res.send('archivos se subieron correctamente')
})


module.exports = router;
