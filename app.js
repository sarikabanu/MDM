var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function(req,res){
var q = 'sarika';
var filename = q ;
console.log('filename'+filename)
fs.readFile(filename,function(err,data){
    if(err)
    {
        res.writeHead(404,{'Content-type':'text/html'});
        return res.end(filename)
    }
    res.writeHead(200,{'Content-type':'text/html'});
    res.write(filename);
        return res.end()
});

}).listen(3000);
