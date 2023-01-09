class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :player_characters
end
