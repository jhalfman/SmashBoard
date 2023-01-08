class PenaltySerializer < ActiveModel::Serializer
  attributes :id, :description, :rule_id, :player_character_id
  has_one :player_character
  has_one :rule
end
