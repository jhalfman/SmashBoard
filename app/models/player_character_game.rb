class PlayerCharacterGame < ApplicationRecord
  belongs_to :player_character
  belongs_to :game
end
