class AddSubtotalToCartItems < ActiveRecord::Migration[8.0]
  def change
    add_column :cart_items, :subtotal, :decimal
  end
end
