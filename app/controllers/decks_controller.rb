class DecksController < ApplicationController
  include DecksHelper
  def create
    create_decks_for(User.find(session[:user_id]), get_decks_from_quizlet(session['uid'], session['access_token']))
    redirect_to root_path
  end

  def update
    user = User.find(session[:user_id])
    check_for_updated_decks(get_decks_from_quizlet(session['uid'], session['access_token']), user.decks, user)
    redirect_to root_path
  end

  def index
    sql = 'SELECT * FROM decks WHERE user_id = 1 AND created_at IN(Select max(created_at) from decks GROUP BY quizlet_deck_id );'
    @results = ActiveRecord::Base.connection.execute(sql).map { |deck| Deck.new deck }
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
