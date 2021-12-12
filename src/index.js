const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const { extname } = require('path');
const methodOveriide = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//Inicia
const app = express();
require('./database');
require('./config/passport');

//setting
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({ 

    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    
}));
app.set('view engine','.hbs');
//midleawares
app.use(express.urlencoded({extended:false}));
app.use(methodOveriide('_method'));
app.use(session({
    secret: 'appsession',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global vatibales
app.use((req,res, next) => {
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    res.locals.user= req.user || null; 
    next();
})
//routes 
app.use(require('./routes/index'));
app.use(require('./routes/cursos'));
app.use(require('./routes/users'));
app.use(require('./routes/file'));




//stitac files
app.use(express.static(path.join(__dirname,'public')));

//server 
app.listen(app.get('port'),() => {
    console.log('Server on port', app.get('port'));
});