class CreateCartBulks < ActiveRecord::Migration[8.0]
  def change
    create_table :cart_bulks do |t|
      t.timestamps
    end
  end
end
