class AddDefaultQuantityToCartItems < ActiveRecord::Migration[8.0]
  def change
    change_column_default :cart_items, :item_count, 1
  end
end
