require 'json'

quizlet_deck_ids = [
  57770474,
  57774344,
  57773662,
  57771057,
  57772843,
  57776161,
  57775757,
  57771255,
  57775372,
  57772495,
  57777172,
]

quizlet_deck_ids.each do |deck_number|

## ACCESS TOKEN FOR NEXT LINE IS NEEDED FOR SEEDING ##
sets = JSON.parse(`curl -H "Authorization: Bearer BqsgfNU5KfYYhrvjRCCTU35Y6cxU4HffnTBwQ7E5" "https://api.quizlet.com/2.0/sets/#{deck_number}"`)
cards =  sets["terms"].map { |hash| {"term" => hash["term"] , "definition"=> hash["definition"]} }
IncludedDeck.create(title: sets["title"], term_count: sets["term_count"], cards: cards)

end






