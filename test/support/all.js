
/**
 * Module dependencies.
 */

var cluster = require('../../')
  , should = require('../../support/should')
  , http = require('http')
  , fs = require('fs');

require('../common');

var server = http.createServer(function(req, res){
  setTimeout(function(){
    res.writeHead(200);
    res.end('Hello World');
  }, 1000);
});

cluster = cluster(server)
  .set('workers', 6)
  .use(cluster.pidfiles())
  .use(cluster.cli())
  .use(cluster.logger(__dirname + '/../logs'))
  .use(cluster.repl(8888, 'localhost'))
  .use(cluster.stats())
  .listen(3000);

cluster.on('listening', function(){
  console.log('listening');
});