class Transact < ApplicationRecord
  belongs_to :user

  def transactions_map(transactions)
    map = Hash.new(0)
    transactions.each do |t|
      map[t.ticker] += t.quantity
    end
    map
  end


end
