class Penalty < ApplicationRecord
  belongs_to :player_character
  belongs_to :rule
  belongs_to :game
  belongs_to :user
end
