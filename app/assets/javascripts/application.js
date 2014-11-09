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

$(function(){ $(document).foundation(); });

$.ajax({
	type: 'POST',
	url: 'http://ws.audioscrobbler.com/2.0/',
	data: 'method=user.getfriends&' +
	'user=gburt802&' +
	'limit=10&' +
	'api_key=433b1f8a183487738257bd91cd0467aa&' +
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
	    'api_key=433b1f8a183487738257bd91cd0467aa&' +
	    'format=json',
	    dataType: 'json',
				success: function(data1) {
					if(typeof data1.topartists.artist[0] !== "undefined") {
					$.when($('#success').append('<p>' + user.name + " name ")).then($('#success').append(data1.topartists.artist[0].name + " band " + '</p>'));
				}
			}
			});
		});
	}
});
