class UserSerializer < ActiveModel::Serializer
  attributes :email, :balance, :first_name, :last_name
end
