class DropCarts < ActiveRecord::Migration[8.0]
  def change
    drop_table :carts
  end
end
