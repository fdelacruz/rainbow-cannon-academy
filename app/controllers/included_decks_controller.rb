class IncludedDecksController < ApplicationController

  def selection
    # binding.pry
    choice = params[:choice]["quiz_selection"]
    redirect_to "/included_decks/#{choice}"
  end

  def show
    # binding.pry
  end

end
