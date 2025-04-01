class AddBrandToItems < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :items, :brands, column: :brands_id, primary_key: :id
  end
end
