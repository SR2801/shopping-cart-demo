class AddForeignKeyCartItemToItem < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :cart_items, column: :item_id
    add_foreign_key :cart_items, :items, column: :item_id
  end
end
