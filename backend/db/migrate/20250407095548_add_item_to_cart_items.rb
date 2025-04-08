class AddItemToCartItems < ActiveRecord::Migration[8.0]
  def change
    remove_column :cart_items, :item_id
    add_reference :cart_items, :item, foreign_key: true
  end
end
