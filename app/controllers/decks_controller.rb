class DecksController < ApplicationController
  include DecksHelper
  def create
    array_of_deck_hashes = get_sets(session['uid'], session['access_token'])
    create_decks_for(User.find(session[:user_id]), array_of_deck_hashes)
  end
end
