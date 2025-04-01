class AddRefToCarts < ActiveRecord::Migration[8.0]
  def change
    add_reference :carts, :users
    add_reference :carts, :items
  end
end
