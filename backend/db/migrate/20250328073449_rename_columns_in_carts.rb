# db/migrate/20250328073449_rename_columns_in_carts.rb
class RenameColumnsInCarts < ActiveRecord::Migration[7.0]
  def change
    # Remove index if it exists
    remove_index :carts, name: "index_carts_on_items_id", if_exists: true

    # Drop existing index if it exists
    remove_index :carts, name: "index_carts_on_item_id", if_exists: true

    # Add new index
    add_index :carts, :item_id, name: "index_carts_on_item_id"
  end
end
