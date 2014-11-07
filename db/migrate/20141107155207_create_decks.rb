class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.integer :quizlet_deck_id
      t.string :title
      t.integer :term_count
      t.integer :quizlet_modified_date
      t.belongs_to :user

      t.timestamps
    end
  end
end
