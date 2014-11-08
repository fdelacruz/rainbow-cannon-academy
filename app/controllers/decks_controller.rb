class DecksController < ApplicationController
  include DecksHelper
  def create
    array_of_deck_hashes = get_decks(session['uid'], session['access_token'])
    create_decks_for(User.find(session[:user_id]), array_of_deck_hashes)
  end

  def update
    array_of_deck_hashes_from_quizlet = get_decks(session['uid'], session['access_token'])
    array_of_deck_objects_from_db = User.find(session[:user_id]).decks
    quizlet_array_of_deck_id_and_modified_date = array_of_deck_hashes_from_quizlet.map {|deck| deck.slice("id", "modified_date")}
    db_array_of_deck_id_and_modified_date = User.first.decks.map {|deck| {"id" => deck.quizlet_deck_id, "modified_date" => deck.quizlet_modified_date} }
    unless quizlet_array_of_deck_id_and_modified_date == db_array_of_deck_id_and_modified_date
      create_decks_for(User.find(session[:user_id]), array_of_deck_hashes_from_quizlet)
    end
    redirect_to root_path
  end
end
