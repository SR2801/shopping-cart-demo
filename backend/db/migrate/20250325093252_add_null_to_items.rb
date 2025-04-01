class AddNullToItems < ActiveRecord::Migration[8.0]
  def change
    add_column :items, :null, :bigint
  end
end
