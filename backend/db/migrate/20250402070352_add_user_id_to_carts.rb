class AddUserIdToCarts < ActiveRecord::Migration[8.0]
  def change
    remove_column :carts, :user_id
    add_reference :carts, :user, null: false, foreign_key: true
  end
end
