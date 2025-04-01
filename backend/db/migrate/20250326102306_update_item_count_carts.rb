class UpdateItemCountCarts < ActiveRecord::Migration[8.0]
  def change
    change_column :carts, :item_count, :integer,  default: 1
  end
end
