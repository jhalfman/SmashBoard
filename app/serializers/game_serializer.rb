class GameSerializer < ActiveModel::Serializer
  attributes :id, :time, :notes
end
