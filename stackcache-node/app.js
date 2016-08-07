var request = require("request");

var url = "https://api.stackexchange.com/2.2/tags/java/faq?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&filter=default";
request({
	url: url,
	json: true
}, function(err, response, body){
	if (!err && response.statusCode === 200) {
		var jsons = JSON.stringify(body)
        console.log(jsons); // Print the json response
    }
})