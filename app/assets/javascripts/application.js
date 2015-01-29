$( "#button" ).click(function() {
    $( "#textbox" ).blur();
    var lastfmusername = 'user=' +                               document.getElementById("textbox").value;
    $('#textbox').val('');
    $.ajax({
        type: 'POST',
        url: 'http://ws.audioscrobbler.com/2.0/',
        data: 'method=user.getfriends&' +
            lastfmusername +
            '&api_key=84f102d8aaa1c663732540d339bf2100&' +
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
                            $.when($('.success').append('<span class="username">'
                                + '<b>' + '<a href="'
                                + "http://www.last.fm/user/"
                                + user.name + '"' + 'target="_blank"' + '>' + user.name
                                + '</a>' + '</b>' + "'s "
                                + "top artist last week was: "
                                + '</span>' + '<br>')).then($('.success').append('<span class="topartist">'
                                + '<a href="'
                                + data1.topartists.artist[0].url
                                + '"' + 'target="_blank"' + '>'
                                + data1.topartists.artist[0].name
                                + '</a>' + " (" + data1.topartists.artist[0].playcount
                                + " plays)" + '</span>' + '<br>' + '<br>'));
                        }
                    }
                });
            });
        }
    }).done(function(data) {
        $(".success").html(data);
    });
});


