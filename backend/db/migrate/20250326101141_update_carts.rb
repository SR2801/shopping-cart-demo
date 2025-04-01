class UpdateCarts < ActiveRecord::Migration[8.0]
  def change
    remove_column :carts, :user_id
    remove_column :carts, :item_id
  end
end
