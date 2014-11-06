class WelcomeController < ApplicationController
  def index
  end

  def show
    @response = request.env["omniauth.auth"]
  end
end
