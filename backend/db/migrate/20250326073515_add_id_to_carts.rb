class AddIdToCarts < ActiveRecord::Migration[8.0]
  def change
    add_column :carts, :id, :integer
  end
end
