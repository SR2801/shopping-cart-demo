class CartItemsController < ApplicationController
  # include Authentication
  before_action :authenticate_with_token!
  # before_action :get_item, only: %i[add_to_cart]
  # before_action :get_cart, only: %i[show add_to_cart]
  before_action :get_cart_item, only: %i[update remove]

  
  # curl -X POST -H "Content-Type: application/json" -d '{"item_id": 10, "item_count": 1}' http://localhost:3000/carts/2/add_to_cart

  private


  # Find the cart item by its ID
  def get_cart_item
    puts "##########Params: #{params}"
    @cart_item = CartItem.find_by(id: params[:id], cart_id: current_user.carts.id)
    render json: {
      error: 'Cart Item not found'
    }, status: :not_found if @cart_item.nil?
  end

  # def get_item

  #   @item = Item.find(params[:item_id]) # Find the item by its ID
  #   if @item.nil?
  #     render json: { error: 'Item not found' }, status: :not_found 
  #   end
  # end

end