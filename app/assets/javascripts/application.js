// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require turbolinks
//= require_tree .

/*What we want to do here is call the function findfavs that makes the ajax call to last fm when the user clicks submit and we want to pass the username into the function to make the call on that user.
 */


$(function(){ $(document).foundation(); });

$(function()
    $('#lastfmsubmitbutton').on('click', function(e){
        e.preventDefault()},

        $('#success').html('<div id="loader">loading...</div>'),

        FindFavs(username)


function FindFavs(username){
    $.ajax({
      var username = $ ('#lastfmusername').val(),
	    type: 'POST',
	    url: 'http://ws.audioscrobbler.com/2.0/',
	    data: 'method=user.getfriends&' +
	    'user=' + username +
	    'limit=10&' +
	    'api_key=' + ENV['LASTFM_KEY'] +
	'   format=json',
	dataType: 'json',
	success: function(data) {
		var users = data.friends.user;
		$.each(users, function(i, user) {
			$.ajax({
//				type : 'POST',
//				url : 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + user.name + '&period=7day&api_key=' + ENV['LASTFM_KEY']+'&format=json',
//				dataType : 'json',
//				success : function(data1) {
//					$('#success').append(user.name);
//					$('#success').append(data1.topartists.artist[1].name);
				type: 'POST',
				url: 'http://ws.audioscrobbler.com/2.0/',
	            data: 'method=user.gettopartists&' +
	            'user=' + user.name +
	            '&period=7day&'
	            'api_key=' + ENV['LASTFM_KEY'] +
	            '&format=json',

				success: function(data1) {
					if(typeof data1.topartists.artist[0] !== "undefined") {
					$.when($('.success').append('<div class="username">' + user.name + "'s " + "top " + "band " +
					"this " + "week" + '</div>')).then($('.success').append('<div class="topartist">' +
					'<a href="' + data1.topartists.artist[0].url + '"' + '>' + data1.topartists.artist[0].name +
					'</a>' + " - " + data1.topartists.artist[0].playcount + '</div>'));
				}
			}
			});
		});
	}
})}};
