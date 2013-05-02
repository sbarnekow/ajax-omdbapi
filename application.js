$(document).ready(function(){
  $('form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    var searchInput = $('#searchbox').val();
    $.ajax({
      url: 'http://www.omdbapi.com/?s=' + searchInput,
      method: 'get',
      dataType: 'jsonp',
      success: function(searchResult){
        var movieArray = searchResult["Search"];
        var titleList = $('#movielist');
        for (var i = 0; i < movieArray.length; i++){
          $.ajax({
            url: 'http://www.omdbapi.com/?i=' + searchResult["Search"][i]["imdbID"],
            method: 'get',
            dataType: 'jsonp',
            success: function(movie){
              // console.log ('movie:', searchResult);
              console.log ('indivMovie:', movie);
              var plot = movie["Plot"];
              var released = movie["Released"];
              var poster = movie["Poster"];
              var titleLink = $('<li><div class="container"><div id="movieposter"><img src=' + poster + '/></div>' + '<div id="movie">' + movie["Title"] + '</div><div id="movieplot"><div id="releasedate">' + released + '</div>' + plot + '</div></div></li>');  
              titleLink.appendTo(titleList);

            }

          })

        }
        console.log(movieArray);
      }
    });
  });



  $('a').on('click', function(){
    var indivMovie = $(this);
    $.ajax({
      url: 'http://www.omdbapi.com/?t=' + indivMovie["Title"],
      method: 'get',
      dataType: 'json'
    })
  });
});