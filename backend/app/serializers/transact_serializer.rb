class TransactSerializer < ActiveModel::Serializer
  attributes :price, :quantity, :ticker, :created_at
end
