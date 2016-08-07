//TO-DO
//requst the JSON from stackoverflow website
//setup javascript promises
//using promise send one link at a time to the scrapeStack function
//save each site in a new folder with a new folder name

var request = require("superagent");
var scraper = require('website-scraper');

var express = require("express");
var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

//scrapping stackoverflow
app.get('/scrapestackoverflow', function(req, res) {
    requestStack();
});
//scrapping github
app.get('/scrapegithub', function(req, res) {
    requestGithub();
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

function requestGithub() {
    request
        .get("https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc")
        .end(function(err, res) {
            res.body.items.forEach(function(item) {
                console.log(item.html_url);
                var gitlinks = item.html_url;
                var promises = gitlinks.toString()
                    .split('\n')
                    .map(html_url => scrapeGithub(html_url, item.name))

                return Promise.all(promises);
            })
        })
}

function scrapeGithub(site, directory) {
    return scraper.scrape({
        urls: [
            site
        ],
        directory: '/home/shail/Documents/code/stackcache/cacheGithub/' + directory,
        subdirectories: [
            { directory: 'img', extensions: ['.jpg', '.png', '.svg'] },
            { directory: 'js', extensions: ['.js'] },
            { directory: 'css', extensions: ['.css'] }
        ],
        sources: [
            { selector: 'img', attr: 'src' },
            { selector: 'link[rel="stylesheet"]', attr: 'href' },
            { selector: 'script', attr: 'src' }
        ],
        request: {
            headers: {
                //'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
            }
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        console.log(err);
    });
}

function requestStack() {
    request
        .get("https://api.stackexchange.com/2.2/tags/javascript/faq?site=stackoverflow")
        .end(function(err, res) {
            res.body.items.forEach(function(item) {
                console.log(item.link);
                var stacklinks = item.link;
                var promises = stacklinks.toString()
                    .split('\n')
                    .map((link) => scrapeStack(link, item.question_id));

                return Promise.all(promises);
            })
        })
}

function scrapeStack(site, directory) {
    return scraper.scrape({
        urls: [
            site
        ],
        directory: '/home/shail/Documents/code/stackcache/cacheStackOverFLow/' + directory,
        subdirectories: [
            { directory: 'img', extensions: ['.jpg', '.png', '.svg'] },
            { directory: 'js', extensions: ['.js'] },
            { directory: 'css', extensions: ['.css'] }
        ],
        sources: [
            { selector: 'img', attr: 'src' },
            { selector: 'link[rel="stylesheet"]', attr: 'href' },
            { selector: 'script', attr: 'src' }
        ],
        request: {
            headers: {
                //'User-Agent': 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'
            }
        }
    }).then(function(result) {
        console.log(result);
    }).catch(function(err) {
        console.log(err);
    });
}
