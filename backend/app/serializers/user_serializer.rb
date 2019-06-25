class UserSerializer < ActiveModel::Serializer
  attributes :email, :balance, :transacts
end
