class PlayerCharacterSerializer < ActiveModel::Serializer
  attributes :id
  has_one :player
  has_one :character
end
