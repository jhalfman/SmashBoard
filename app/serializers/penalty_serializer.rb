class PenaltySerializer < ActiveModel::Serializer
  attributes :id, :description, :rule_id, :player_character_id, :created_at
  has_one :player_character
  has_one :rule
end
