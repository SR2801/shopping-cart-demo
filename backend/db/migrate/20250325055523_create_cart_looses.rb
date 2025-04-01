class CreateCartLooses < ActiveRecord::Migration[8.0]
  def change
    create_table :cart_looses do |t|
      t.timestamps
    end
  end
end
