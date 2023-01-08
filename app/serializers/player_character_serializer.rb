class PlayerCharacterSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :character_id
  has_one :player
  has_one :character
end
