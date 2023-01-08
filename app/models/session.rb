class Session < ApplicationRecord
  belongs_to :user
  has_many :games
end
