const mongoose  =  require('mongoose');

const dbUrl ='mongodb+srv://Alejandro:jony3lopez13@alejandro.sqxn4.mongodb.net/software?retryWrites=true&w=majority'
mongoose.connect(dbUrl,{useNewUrlParser:true})
//mongodb+srv://Jony:jony3lopez13@jony.8cf4r.mongodb.net/software?retryWrites=true&w=majority


.then(db => console.log('DB is connected'))
.catch(err => console.error(err));