class CreateIncludedDecks < ActiveRecord::Migration
  def change
    create_table :included_decks do |t|
      t.string :title
      t.integer :term_count
      t.json :cards

      t.timestamps
    end
  end
end
