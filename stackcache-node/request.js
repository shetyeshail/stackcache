var request = require("superagent");

    request
        .get("https://api.stackexchange.com/2.2/tags/javascript/faq?site=stackoverflow")
        .end(function(err, res) {
            res.body.items.forEach(function(item) {
                console.log(item.link);
            })

        });