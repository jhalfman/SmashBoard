class Character < ApplicationRecord
    has_many :player_characters
    has_many :players, through: :player_characters
end
