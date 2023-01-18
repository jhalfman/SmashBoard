class PlayerCharacterSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :character_id
  has_many :player_character_games
  has_one :player
  has_one :character
end
