class AddCompositePrimaryKeyToCarts < ActiveRecord::Migration[6.0]
  def change
    # Adding the composite primary key to `id` and `item_id`
    add_index :carts, [:id, :item_id], unique: true, name: 'index_carts_on_id_and_item_id'
  end
end

