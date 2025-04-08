class AddDefaultToCartandCartItems < ActiveRecord::Migration[8.0]
  def change
    change_column :cart_items, :subtotal, :decimal, precision: 10, scale: 2, default: 0.0
    change_column :carts, :total_price, :decimal, precision: 10, scale: 2, default: 0.0
  end
end