class HomeController < ApplicationController
  #this may well need some work. line 4 used to be authorizations instead of users; line 7 used to be authorization instead of user.
  def index
    if logged_in?
      lastfm_auth = current_user.users.find_by(provider: :lastfm)
      if lastfm_auth
        response = HTTParty.get("http://ws.audioscrobbler.com/2.0/",
                                { user: "token #{lastfm_auth.token}" })
        @topartists = JSON.parse(response.body)
      end
    end
  end
end

