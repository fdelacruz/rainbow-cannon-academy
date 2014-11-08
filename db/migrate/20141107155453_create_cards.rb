class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.integer :quizlet_card_id
      t.string :term
      t.string :definition
      t.belongs_to :deck

      t.timestamps
    end
  end
end
