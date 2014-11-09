class HomeController < ApplicationController
  #this needs a lot of work
  def index
    if current_user
      lastfm_auth = current_user.users.find_by(provider: :lastfm)
      if lastfm_auth
        response = HTTParty.get("http://ws.audioscrobbler.com/2.0/",
                                { user: "token #{lastfm_auth.token}" })
        @topartists = JSON.parse(response.body)
      end
    end
  end
end

