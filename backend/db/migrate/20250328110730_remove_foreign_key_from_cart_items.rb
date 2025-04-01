# db/migrate/XXXXXXX_remove_foreign_key_from_cart_items.rb
class RemoveForeignKeyFromCartItems < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :cart_items, column: :cart_id
    remove_foreign_key :cart_items, column: :item_id
  end
end
