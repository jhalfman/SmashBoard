class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :retired
  has_many :player_characters
end
