class PlayerCharacterGame < ApplicationRecord
  belongs_to :player_character
  belongs_to :game

  validates :player_character, uniqueness: {scope: :game}
end
