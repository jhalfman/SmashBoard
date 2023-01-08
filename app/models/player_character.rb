class PlayerCharacter < ApplicationRecord
  belongs_to :player
  belongs_to :character
  has_many :player_character_games
  has_many :games, through: :player_character_games
  has_many :penalties
  has_many :rules, through: :penalties
end
