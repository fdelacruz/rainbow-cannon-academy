class IncludedDecksController < ApplicationController

  def selection
    # binding.pry
    choice = params[:choice]["quiz_selection"]
    redirect_to "/included_decks/#{choice}"
  end

  def show
    @included_deck = IncludedDeck.find(params[:id])
  end

  def json
    @included_deck = IncludedDeck.find(params[:id])
    return @included_deck.cards.to_json
  end

end
