class UsersController < ApplicationController
  include UsersHelper

  def create
    user_details = get_basic_details(session['uid'], session['access_token'])
    User.create(uid: user_details['username'], profile_img: user_details['profile_image'])
    redirect_to decks_create_path
  end

  def new
  end
end
