class CreateCarts < ActiveRecord::Migration[8.0]
  def change
    create_table :carts do |t|
      t.integer :user_id
      t.integer :item_id
      t.integer :item_count

      t.timestamps
    end
  end
end
