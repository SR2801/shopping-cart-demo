class AdddForiegnKeyCartItems < ActiveRecord::Migration[8.0]
  def change
    add_reference :carts, :items, index: true, foreign_key: true
  end
end
