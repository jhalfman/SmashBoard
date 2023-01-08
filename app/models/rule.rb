class Rule < ApplicationRecord
    has_many :penalties
    has_many :player_characters, through: :penalties
end
