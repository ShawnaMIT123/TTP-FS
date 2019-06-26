class User < ApplicationRecord
  has_secure_password
  has_many :transacts
  validates :email, uniqueness: { case_sensitive: false }

  def stock_withdraw(amount)
    self.balance -= amount
    self.save
  end
end
