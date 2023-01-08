class PlayerCharacterGameSerializer < ActiveModel::Serializer
  attributes :id, :game
  has_one :player_character
end
