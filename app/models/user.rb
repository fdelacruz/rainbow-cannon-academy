class User < ActiveRecord::Base
  validates :uid, uniqueness: true
  has_many :decks

end
