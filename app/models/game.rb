class Game < ApplicationRecord
    belongs_to :night
    has_many :penalties
    has_many :player_character_games
    has_many :player_characters, through: :player_character_games
end
