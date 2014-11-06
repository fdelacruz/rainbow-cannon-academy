class WelcomeController < ApplicationController
  def index
  end

  def show
    response = request.env["omniauth.auth"]
    session['uid'] = response['uid']
    session['access_token'] = response['extra'].access_token
    redirect_to users_create_path
  end
end
