class SessionController < ApplicationController
  def destroy
    session.clear
    redirect_to root_path
  end

  def create
  end
end
