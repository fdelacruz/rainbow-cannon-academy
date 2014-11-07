module DecksHelper

  def get_sets(uid, access_token)
    JSON.parse(`curl -H "Authorization: Bearer #{access_token}" "https://api.quizlet.com/2.0/users/#{uid}/sets"`)
  end


  def create_decks_for(user, array_of_deck_hashes)
    array_of_deck_hashes.each do |deck|
      title = deck['title']
      id = deck['id']
      term_count = deck['term_count']
      db_deck = Deck.create(title: title, quizlet_deck_id: id, term_count: term_count)
      user.decks.push(db_deck)
      create_cards_from_array_of_card_hashes(db_deck, deck['terms'])
    end
  end

  def create_cards_from_array_of_card_hashes(deck_object, array_of_card_hashes)
    array_of_card_hashes.each do |card|
        id = card['id']
        term = card['term']
        definition = card['definition']
        deck_object.cards.push(Card.create(quizlet_card_id: id, term: term, definition: definition))
      end
  end
end
