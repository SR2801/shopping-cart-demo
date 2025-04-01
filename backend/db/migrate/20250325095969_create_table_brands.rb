class CreateTableBrands < ActiveRecord::Migration[8.0]
  def change
    create_table :table_brands do |t|
      t.string :name
      add_foreign_key :brands, :items
      t.timestamps
    end
  end
end
