class WelcomeController < ApplicationController
  def index
  end

  def show
    p @response = request.env["omniauth.auth"]
    p "*"*30
    p @response['uid']
  end
end
