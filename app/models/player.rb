class Player < ApplicationRecord
    has_many :player_characters
    has_many :characters, through: :player_characters
    
    validates :name, uniqueness: {case_sensitive: false}
end
