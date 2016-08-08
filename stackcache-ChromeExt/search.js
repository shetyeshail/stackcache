//when offline redirects to local host
chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
    if (navigator.onLine) {
        alert("Online");
    } else {
        alert("offline");
        chrome.tabs.update(tab.id, { url: "http://cachestack.io:3000/" });        
    }

});
