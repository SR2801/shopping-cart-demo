class Cart < ApplicationRecord
  belongs_to :user
  has_many :cart_items, dependent: :destroy 
  has_many :items, through: :cart_items

  def get_total_price    
    self.cart_items.reduce(0.0) do |total_price, cart_item| 
      total_price + cart_item.get_subtotal
    end
  end
end
