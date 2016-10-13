// Variables pora manejar la petición web y el renderizado html
var express    = require('express'),
    app        = express(),
    engines    = require('consolidate'),
    bodyParser = require('body-parser'),
    myRouter   = express.Router([]),
    mydocs     = new Array;

// Variables para manejar la persistencia
var MongoClient = require('mongodb').MongoClient,
    test        = require('assert');
// fijamos las propiedades del servidor de express
    app.engine('html',engines.nunjucks);
    app.set('view engine','html');
    app.set('views',__dirname+'/htmlviews');

    app.use( bodyParser.urlencoded({ extended: false}))
    /*app.use(bodyParser);
    app.use(myRouter);*/

// handler para errores internos del sistema
//TODO meter la plantilla de la página de errores
function errorHandler(err,req,res,next){
  console.error(err.message);
  console.error(err.stack);
  res.status(500);
  res.render('error_template',{error:err});
}
// esto es el get del home
app.get('/',(req,res)=>{
// por ejemplo podemos ver que estamos sirviendo:
//      console.log('data served');
      MongoClient.connect('mongodb://localhost:27017/video',(err,db)=>{
        test.equal(null,err);
        db.collection('movies').find({}).toArray((err,docs)=>{
          if(!err){
             console.log('%n películas servidas',docs.length);
             mydocs = docs;
             res.render('movies',{'movies':mydocs});
            }
            db.close();
        });
      });
});
// esto es el get del new
app.get('/new',(req,res)=>{
    res.render('insertmovie');
});
// esto es el post del insert
app.post('/insert',bodyParser.urlencoded({ extended: false}),(req,res)=>{
//    res.send("title: "+req.body.title+"<br>year: "+req.body.year+"<br>imdb ref: "+req.body.imdb);
    MongoClient.connect('mongodb://localhost:27017/video',(err,db)=>{
      test.equal(null,err);
      db.collection('movies').insertOne({"title":req.body.title,"year":req.body.year,"imdb":req.body.imdb});
      mydocs.push({"title":req.body.title,"year":req.body.year,"imdb":req.body.imdb});
      res.render('movies',{'movies':mydocs});
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
