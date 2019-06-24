class CreateTransacts < ActiveRecord::Migration[5.2]
  def change
    create_table :transacts do |t|
      t.decimal :price
      t.integer :quantity
      t.string :ticker
      t.string :user_id

      t.timestamps
    end
  end
end
