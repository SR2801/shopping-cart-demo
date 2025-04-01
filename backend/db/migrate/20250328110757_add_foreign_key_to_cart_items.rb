# db/migrate/XXXXXXX_add_foreign_key_to_cart_items.rb
class AddForeignKeyToCartItems < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :cart_items, :carts, column: :cart_id
    add_foreign_key :cart_items, :items, column: :item_id
  end
end
