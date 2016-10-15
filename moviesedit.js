// Variables pora manejar la petición web y el renderizado html
var express    = require('express'),
    app        = express(),
    engines    = require('consolidate'),
    bodyParser = require('body-parser'),
    myRouter   = express.Router([]),
    mydocs     = new Array,
// variables para gestionar ficheros
    myfs       = require('fs'),
    styleStr   = new String;

// Variables para manejar la persistencia
var MongoClient = require('mongodb').MongoClient,
    test        = require('assert');
// hoja de estilo
  myfs.readFile('./htmlviews/providestyle.css','utf-8', (err, data) => {
    if (err) throw err;
    styleStr = data.toString();
  });

// fijamos las propiedades del servidor de express
  app.engine('html',engines.nunjucks);
  app.set('view engine','html');
  app.set('views',__dirname+'/htmlviews');
  app.use( bodyParser.urlencoded({ extended: false}))

// handler para errores internos del sistema
//TODO meter la plantilla de la página de errores
function errorHandler(err,req,res,next){
  console.error(err.message);
  console.error(err.stack);
  res.render('error_template',{error:err});
  res.status(500);
}
// HOME PAGE
app.get('/',(req,res)=>{
  MongoClient.connect('mongodb://localhost:27017/video',(err,db)=>{
    test.equal(null,err);
    db.collection('movies').find({}).toArray((err,docs)=>{
      if(!err){
        mydocs = docs;
        res.render('movies',{'style':styleStr,'movies':mydocs});
      }
      db.close();
    });
  });
});
// FORMULARIO NUEVA PELÍCULA
app.get('/new',(req,res)=>{
  res.render('insertmovie',{'style':styleStr});
});
// TRAS LA INSERCION
app.post('/insert',bodyParser.urlencoded({ extended: false}),(req,res)=>{
  MongoClient.connect('mongodb://localhost:27017/video',(err,db)=>{
    test.equal(null,err);
    db.collection('movies').insertOne({"title":req.body.title,"year":req.body.year,"imdb":req.body.imdb});
    mydocs.push({"title":req.body.title,"year":req.body.year,"imdb":req.body.imdb});
    res.render('movies',{'movies':mydocs});
// TODO que no se quede en la url incorrecta
    db.close();
  });
});

// en cualquier otro caso
app.use((req,res)=>{
   res.sendStatus(404);
});
// arrancamos el servidor
    var server = app.listen(3000,function(){
       var port = server.address().port;
       console.log('Express server listening on port %s', port);
    });
