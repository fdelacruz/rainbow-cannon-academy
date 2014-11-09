module WelcomeHelper
  def all_decks_in_nested_array_form(user_id = nil)
    if user_id
      User.find(user_id).decks.map {|deck| [deck.title, deck.id]}
    else
      IncludedDeck.all.map {|deck| [deck.title, deck.id]}
    end
  # Returns something like [['Hot',1],['Medium',2],['Cold',3]]
  end
end
