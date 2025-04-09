class CartItem < ApplicationRecord
    belongs_to :cart
    belongs_to :item
    # has_one :item
  
    validates :quantity, numericality: { greater_than_or_equal_to: 1 }
  

    def get_subtotal
      self.item_count * self.item.price
    end
    private

end

