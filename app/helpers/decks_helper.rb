module DecksHelper

  def get_decks(uid, access_token)
    JSON.parse(`curl -H "Authorization: Bearer #{access_token}" "https://api.quizlet.com/2.0/users/#{uid}/sets"`)
  end


  def create_decks_for(user, array_of_deck_hashes)
    array_of_deck_hashes.each do |deck|
      db_deck = Deck.create(user: user, title: deck['title'], quizlet_modified_date: deck['modified_date'], quizlet_deck_id: deck['id'], term_count: deck['term_count'], cards: deck['terms'])
      user.decks.push(db_deck)
    end
  end

  def quizlet_deck_comparison_array(quizlet_deck_hash)
    quizlet_deck_hash.map {|deck| deck.slice("id", "modified_date")}
  end

  def db_deck_comparison_array(user)
    user.decks.map {|deck| {"id" => deck.quizlet_deck_id, "modified_date" => deck.quizlet_modified_date} }
  end

  def update_decks_in_db(quizlet_deck_hash, db_deck_hash, user)
    unless quizlet_deck_comparison_array(quizlet_deck_hash) == db_deck_comparison_array(user)
      create_decks_for(user, quizlet_deck_hash)
    end
  end

end



