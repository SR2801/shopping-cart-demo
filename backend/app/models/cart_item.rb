class CartItem < ApplicationRecord
  class CartItem < ApplicationRecord
    belongs_to :cart
    belongs_to :item
  
    validates :quantity, numericality: { greater_than_or_equal_to: 1 }
  
    # This will allow cart item to add items to the cart with a default quantity of 1
    after_initialize :set_default_quantity, if: :new_record?
  
    private
  
    def set_default_quantity
      self.quantity ||= 1
    end
  end
  
end
