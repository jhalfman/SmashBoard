class NightSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at
  has_one :user
  has_many :games
end
