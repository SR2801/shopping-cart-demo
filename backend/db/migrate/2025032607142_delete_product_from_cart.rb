class DeleteProductFromCart < ActiveRecord::Migration[8.0]
  def change
    rename_column :carts,  :items_id, :item_id
  end
end
