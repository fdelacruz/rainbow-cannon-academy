class DecksController < ApplicationController
  include DecksHelper
  def create
    array_of_deck_hashes = get_decks(session['uid'], session['access_token'])
    create_decks_for(User.find(session[:user_id]), array_of_deck_hashes)
    redirect_to root_path
  end

  def update
    user = User.find(session[:user_id])
    array_of_deck_hashes_from_quizlet = get_decks(session['uid'], session['access_token'])
    array_of_deck_objects_from_db = user.decks
    update_decks_in_db(array_of_deck_hashes_from_quizlet, array_of_deck_objects_from_db, user)
    redirect_to root_path
  end

  def index

  end
end
