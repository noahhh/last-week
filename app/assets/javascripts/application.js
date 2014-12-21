//trying to get this working using the info at... http://stackoverflow.com/questions/765205/how-to-pass-text-in-a-textbox-to-javascript-function
//also this... http://stackoverflow.com/questions/15460947/insert-a-variable-into-data-attribute-ajax
//and this... http://stackoverflow.com/questions/19808202/php-ajax-how-to-pass-url-variable-through-ajax

$( "#buttons" ).click(function() {
    var lastfmusername = 'user=' +                               document.getElementById("textbox1").value;
    //takes the text input (aka the lastfm username) from the form and also the text needed for the URL format in the AJAX request to the API and defines it as a variable
    $.ajax({
        type: 'POST',
        url: 'http://ws.audioscrobbler.com/2.0/',
        data: 'method=user.getfriends&' +
            lastfmusername + //this is where I pass in the variable
            '&limit=10&' +
            'api_key=84f102d8aaa1c663732540d339bf2100&' +
            'format=json',
        dataType: 'json',
        success: function(data) {
            var users = data.friends.user;
            $.each(users, function(i, user) {
                $.ajax({
                    type: 'POST',
                    url: 'http://ws.audioscrobbler.com/2.0/',
                    data: 'method=user.gettopartists&' +
                        'user=' +
                        user.name +
                        '&period=7day&' +
                        'api_key=84f102d8aaa1c663732540d339bf2100&' +
                        'format=json',
                    dataType: 'json',
                    success: function(data1) {
                        if(typeof data1.topartists.artist[0] !== "undefined") {
                            $.when($('.success').append('<div class="username">' + user.name + "'s " + "top " + "band " + "this " + "week" + '</div>')).then($('.success').append('<div class="topartist">' + '<a href="' + data1.topartists.artist[0].url + '"' + '>' + data1.topartists.artist[0].name + '</a>' + " - " + data1.topartists.artist[0].playcount + '</div>' + '<br>'));
                        }
                    }
                });
            });
        }
    });
});
