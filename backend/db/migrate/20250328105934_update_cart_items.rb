# db/migrate/XXXXXXX_create_cart_items.rb
class UpdateCartItems < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :cart_items, :carts, column: :cart_id, if_not_exists: true
    add_foreign_key :cart_items, :items, column: :item_id, if_not_exists: true
    
  end
end
