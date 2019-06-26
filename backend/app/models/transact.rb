class Transact < ApplicationRecord
  belongs_to :user

  def self.transactions_map(transactions)
    map = {}
    transactions.each do |t|
      if map[t.ticker]
        map[t.ticker]["quantity"] += t.quantity
      else
        map[t.ticker] = { "quantity" => t.quantity }
      end
    end
    map
  end


end
