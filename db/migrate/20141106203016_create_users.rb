class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :uid
      t.string :profile_img

      t.timestamps
    end
  end
end
