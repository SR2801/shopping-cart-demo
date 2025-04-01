class CreateJoinTableItems < ActiveRecord::Migration[8.0]
  def change
    create_join_table :items, :subscribers
  end
end
