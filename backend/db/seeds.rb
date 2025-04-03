# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Item.create([
  { name: 'Laptop', price: 1000.0, inventory_count: 10, rating: 4.5 },
  { name: 'Smartphone', price: 500.0, inventory_count: 15, rating: 4.3 },
  { name: 'Headphones', price: 100.0, inventory_count: 20, rating: 4.7 },
  { name: 'Keyboard', price: 50.0, inventory_count: 25, rating: 4.2 },
  { name: 'Mouse', price: 30.0, inventory_count: 30, rating: 4.6 },
  { name: 'Monitor', price: 200.0, inventory_count: 8, rating: 4.4 },
  { name: 'Printer', price: 150.0, inventory_count: 5, rating: 4.1 },
  { name: 'Tablet', price: 300.0, inventory_count: 12, rating: 4.5 }
])


User.create([
  { email: 'aaaa@example.com', password: 'aaaaaa', password_confirmation: 'aaaaaa' },
  { email: 'bbbb@example.com', password: 'bbbbbb', password_confirmation: 'bbbbbb' },
  { email: 'cccc@example.com', password: 'cccccc', password_confirmation: 'cccccc' }
])