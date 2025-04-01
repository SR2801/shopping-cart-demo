class CreateUserCustomers < ActiveRecord::Migration[8.0]
  def change
    create_table :user_customers do |t|
      t.timestamps
    end
  end
end
