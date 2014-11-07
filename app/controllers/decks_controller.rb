class DecksController < ApplicationController
  include DecksHelper
  def create
    @decks = get_sets(session['uid'], session['access_token'])
    @decks.each do |deck|
      title = deck['title']
      id = deck['id']
      term_count = deck['term_count']
      db_deck = Deck.create(title: title, quizlet_deck_id: id, term_count: term_count)
      deck['terms'].each do |card|
        id = card['id']
        term = card['term']
        definition = card['definition']
        db_deck.cards.push(Card.create(quizlet_card_id: id, term: term, definition: definition))
      end
    end
  end
end
