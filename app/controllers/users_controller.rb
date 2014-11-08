class UsersController < ApplicationController
  include UsersHelper

  def create
    user_details = get_basic_details(session['uid'], session['access_token'])
    user = User.find_by_uid(user_details['username'])
    unless user
      user = User.create(uid: user_details['username'], profile_img: user_details['profile_image'])
      session[:user_id] = user.id
      redirect_to decks_create_path
    else
      session[:user_id] = user.id
      redirect_to decks_update_path
    end
  end
end
