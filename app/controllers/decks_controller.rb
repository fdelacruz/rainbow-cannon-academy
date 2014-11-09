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
    sql = 'SELECT * FROM decks WHERE user_id = 3 AND created_at IN(Select max(created_at) from decks GROUP BY quizlet_deck_id );'
    @results = ActiveRecord::Base.connection.execute(sql)
  end

  def show
    @deck = Deck.find(params[:id])
  end

  def selection
    choice = params[:choice]["quiz_selection"]
    @deck = Deck.find(choice)
    redirect_to @deck
  end

  def json
    render :json => Deck.find(params[:id]).cards.to_json
  end
end
