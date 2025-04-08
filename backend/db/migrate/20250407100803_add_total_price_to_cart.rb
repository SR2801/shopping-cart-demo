class AddTotalPriceToCart < ActiveRecord::Migration[8.0]
  def change
    add_column :carts, :total_price, :decimal, precision: 2, scale: 2
  end
end
