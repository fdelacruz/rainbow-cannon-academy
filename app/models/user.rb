class User < ActiveRecord::Base
  validates :uid, uniqueness: true
  has_many :decks

  def decks
    sql = "SELECT * FROM decks WHERE user_id = #{self.id} AND created_at IN(Select max(created_at) from decks GROUP BY quizlet_deck_id );"
    ActiveRecord::Base.connection.execute(sql).map { |deck| Deck.new deck }
  end
end

# User.find(3).decks.where(:created_at).in()
