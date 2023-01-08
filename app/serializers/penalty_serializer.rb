class PenaltySerializer < ActiveModel::Serializer
  attributes :id, :description
  has_one :player_character
  has_one :rule
end
