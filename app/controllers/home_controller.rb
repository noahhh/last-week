class HomeController < ApplicationController

  def index
    # if lastfm != nil
    #   lastfm
    # end
  end

  # def lastfm
  #   lastfm = HTTParty.get("http://ws.audioscrobbler.com/2.0/method=user.getfriends&user=#{define_the_last_fm_username_here_as_a_variable}&limit=10&api_key=#{ENV["LASTFM_KEY"]}&format=json")
  #   lastfm_data = JSON.parse(lastfm.body)
  #   @topartists = lastfm_data["data"]
  # end
end
