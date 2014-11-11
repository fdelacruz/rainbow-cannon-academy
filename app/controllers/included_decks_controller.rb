class IncludedDecksController < ApplicationController

  def selection
    # binding.pry
    choice = params[:choice]["quiz_selection"]
    redirect_to "/included_decks/#{choice}"
  end

  def show
    @included_deck = IncludedDeck.find(params[:id])
  end

  def driver # this could be in any controller
    render :driver
  end

  def json
    render :json => IncludedDeck.find(params[:id]).cards.to_json
  end

end
