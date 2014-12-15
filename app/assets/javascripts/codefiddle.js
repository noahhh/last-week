/**
 * Created by Greg on 12/14/14.
 */
$.ajax({
    type: 'POST',
    url: 'http://ws.audioscrobbler.com/2.0/',
    data: 'method=user.getfriends&' +
        'user=gburt802&' +
        'limit=10&' +
        'api_key=<%=ENV['LASTFM_KEY']%>&' +
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
                    'api_key=<%=ENV['LASTFM_KEY']%>&' +
                    'format=json',
                dataType: 'json',
                success: function(data1) {
                    if(typeof data1.topartists.artist[0] !== "undefined") {
                        $.when($('.success').append('<div class="username">' + user.name + "'s " + "top " + "band " + "this " + "week" + '</div>')).then($('.success').append('<div class="topartist">' + '<a href="' + data1.topartists.artist[0].url + '"' + '>' + data1.topartists.artist[0].name + '</a>' + " - " + data1.topartists.artist[0].playcount + '</div>'));
                    }
                }
            });
        });
    }
});