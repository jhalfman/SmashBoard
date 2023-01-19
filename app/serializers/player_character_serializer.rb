class PlayerCharacterSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :character_id
  has_many :player_character_games
  has_many :penalties
  has_one :player
  has_one :character
end
