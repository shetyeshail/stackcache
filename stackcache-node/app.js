//TO-DO
//requst the JSON from stackoverflow website
//setup javascript promises
//using promise send one link at a time to the scrapeStack function
//save each site in a new folder with a new folder name

var request = require("superagent");
var scraper = require('website-scraper');

var express = require("express");
var app = express();

var site = "http://stackoverflow.com/questions/513832/how-do-i-compare-strings-in-java";
var name = "siteName";

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/scrape', function(req, res){
    scrapeStack(site, "new.html", "test");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function reqestStack(){
  request
  	.get("https://api.stackexchange.com/2.2/tags/javascript/faq?site=stackoverflow")
  	.end(function(err, res){
  		res.body.items.forEach(function(item){
  			console.log(item.link);
  		})
  	})
}

function scrapeStack(site, directory){
  scraper.scrape({
  urls: [
    site
  ],
  directory: '/home/shail/Documents/code/stackcache/cache/'+directory,
  subdirectories: [
    {directory: 'img', extensions: ['.jpg', '.png', '.svg']},
    {directory: 'js', extensions: ['.js']},
    {directory: 'css', extensions: ['.css']}
  ],
  sources: [
    {selector: 'img', attr: 'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'script', attr: 'src'}
  ],
  request: {
    headers: {
      //'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
    }
  }
}).then(function (result) {
  console.log(result);
}).catch(function(err){
  console.log(err);
});
}
