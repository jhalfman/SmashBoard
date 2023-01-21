class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin
  has_many :nights
  has_many :penalties
end
