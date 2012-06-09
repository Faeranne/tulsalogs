var mongodb = require('mongodb');

var server = new mongodb.Server('ds031617.mongolab.com',31617, {});
var db = new mongodb.Db('tulsabot', server, {});
exports.start = function(){
db.open(function(err,res){  
  db.authenticate('tulsabot',process.env.PASS,function(err,res){
  });
});
}
var logs = db.collection('logs');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.logs = function(req, res){
  var count;
  var year = req.params.year;
  var month = req.params.month;
  var day = req.params.day;
  var serv = req.params.serv;
  var loc = logs.find({'year':year,'month':month,'day':day,'service':serv});
  loc.count(function(err,num){count=num;
  res.writeHead(200, {'Content-Type':'text'});
  res.write('post count:'+count+'\n');
    loc.toArray(function(err,obj){
    for(var x=0;x<count;x++){  
      var from=obj[x].from;
      var time=obj[x].time;
      var message=obj[x].message;
      var string='('+time+') '+from+': '+message+'\n';
      res.write(string);
    }
    res.end();
    });
  });
}
  	

