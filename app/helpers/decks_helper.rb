module DecksHelper

  def get_decks(uid, access_token)
    JSON.parse(`curl -H "Authorization: Bearer #{access_token}" "https://api.quizlet.com/2.0/users/#{uid}/sets"`)
  end


  def create_decks_for(user, array_of_deck_hashes)
    array_of_deck_hashes.each do |deck|
      db_deck = Deck.create(title: deck['title'], quizlet_modified_date: deck['modified_date'], quizlet_deck_id: deck['id'], term_count: deck['term_count'], cards: deck['terms'])
      user.decks.push(db_deck)
    end
  end
end
