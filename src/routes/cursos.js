const express =require('express');
const { route } = require('.');
const router = express.Router();

const Curso =require('../models/Curso');
const {isAuthenticated }= require('../helpers/auth');



router.get('/cursos/add', isAuthenticated,(req,res) => {
    res.render('cursos/new-cursos');
});
router.post('/cursos/new-cursos',isAuthenticated,async(req,res) =>{
    const {title,description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Por favor inserte el nombre del curso'});
    }
    if(!description) {
        errors.push({text: 'Por favor escriba una descripcion '});
    }
    if(errors.length > 0 ) {
        res.render('cursos/new-cursos', {
            errors, 
            title,
            description
        });
        
    }else{
       const newCurso = new Curso({title,description});
       newCurso.user = req.user.id;
      await newCurso.save();
      req.flash('success_msg', 'Se agrego correctamente');
      res.redirect('/cursos');
      
    }
    
});

router.get('/cursos',isAuthenticated, async (req,res) =>{
    const cursos= await Curso.find({user: req.user.id}).sort({date: 'desc'});
    res.render('cursos/all-cursos',{ cursos});

    });

    router.get('/cursos/edit/:id',isAuthenticated,async(req,res) =>{
      const curso = await  Curso.findById(req.params.id);
        res.render('cursos/edit-cursos',{curso});
    });

     router.put('/cursos/edit-cursos/:id',isAuthenticated, async (req,res)=> {
         const {title,description} = req.body;
         await Curso.findByIdAndUpdate(req.params.id,{title,description});
         req.flash('success_msg', 'Se actualizo  correctamente');
         res.redirect('/cursos');

     });
  
    router.delete('/cursos/delete/:id',isAuthenticated, async (req,res) => {
        await Curso.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Se elimino  correctamente');
        res.redirect('/cursos');



    });
module.exports = router;