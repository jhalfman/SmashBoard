class GameSerializer < ActiveModel::Serializer
  attributes :id, :time, :notes
  has_many :penalties
  has_many :player_characters
end
