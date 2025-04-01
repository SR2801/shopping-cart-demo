class RemoveNullFromItems < ActiveRecord::Migration[8.0]
  def change
    change_table :items do |t|
      t.remove :null
      t.decimal :rating, precision: 5, scale: 2
    end
  end
end
