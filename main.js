var apikey = 'dc6zaTOxFJmzC';

$(document).ready(function() {
  
  /* 
  * The following two functions are used for making the API call using
  * pure Javascript. I wouldn't worry about the details
  */

  function encodeQueryData(data)
  {
     var ret = [];
     for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
     return ret.join("&");
  }

  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous 
      xmlHttp.send(null);
  }

  /*
  * The following functions are what do the work for retrieving and displaying gifs
  * that we search for.
  */

  function getGif(query) {
    console.log(query);
    query = query.replace(' ', '+');
    var params = { 'api_key': apikey, 'q': query};
    params = encodeQueryData(params);

    // api from https://github.com/Giphy/GiphyAPI#search-endpoint 

    httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {
      var gifs = JSON.parse(data);
      var firstgif = gifs.data[0].images.fixed_width.url;
      $("#image").html("<img src='" + firstgif + "'>");
      console.log(gifs.data);
    });
  }

  $("#submitButton").on("click", function() {
    var query = $("#inputQuery").val();
    getGif(query);
  });
})
