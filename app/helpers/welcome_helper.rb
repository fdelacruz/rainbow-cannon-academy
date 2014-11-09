module WelcomeHelper
  def all_included_decks_in_nested_array_form
    full_arr = []
    IncludedDeck.all.each do |deck|
      deck_arr = []
      deck_arr << deck.title
      deck_arr << deck.id
      full_arr << deck_arr
    end
    full_arr
  # Returns something like [['Hot',1],['Medium',2],['Cold',3]]
  end
end
