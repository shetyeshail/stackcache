var request = require("request");

request.get({
    url:"https://api.stackexchange.com/2.2/tags/java/faq?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&filter=default",
    json:{}
  },
  function(err, res, data){
    console.log(data);
    data.items.map(function(d,i){
        console.log(d.link);
        return downcache(d.link, function(err, resp, body){});
    }
    
    )
  }
  );
