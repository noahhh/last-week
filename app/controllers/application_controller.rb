class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery

  private

  def current_user
    @current_user ||= User.find_by(session[:current_user_id]) if session[:current_user_id]
  end

  def current_user=(user)
    @current_user = user
    session[:current_user_id] = user.id
  end

  def logged_in?
    !!current_user
  end

  helper_method :current_user, :logged_in?
end
