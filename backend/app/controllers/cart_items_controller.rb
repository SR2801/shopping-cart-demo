class CartItemsController < ApplicationController
  include Authentication
  allow_unauthenticated_access
  # before_action :get_item, only: %i[add_to_cart]
  # before_action :get_cart, only: %i[show add_to_cart]
  before_action :get_cart_item, only: %i[update remove]

  
  # curl -X POST -H "Content-Type: application/json" -d '{"item_id": 10, "item_count": 1}' http://localhost:3000/carts/2/add_to_cart

  def show
  end
  # def add_to_cart
  #     if @cart_item.nil?
  #       @cart_item = @cart.cart_items.create(item_id: @item.id)  # Find or create the cart item
  #     end
  #     # Increment the item count
  #     @cart_item.increment!(:item_count)


  #   render json: { message: 'Item added to cart', item: @cart_item }, status: :created
  # end

  # curl -X POST -H "Content-Type: application/json" -dATCH -H "Content-Type: application/json"   -d '{"item_id": 10, "op": "1"}'   http://localhost:3000/cart_items/1/update

  def update
    case params[:op]
    when '+'
      @cart_item.increment!(:item_count)
    when '-'
      if @cart_item.item_count > 1
        @cart_item.decrement!(:item_count)
      else
        @cart_item.destroy
      end
    # else
    #   # If op is a number (and positive), set item_count to the number provided
    #   if params[:op].to_i > 0
    #     @cart_item.update!(item_count: params[:op].to_i)
    #   else
    #     render json: { error: 'item_count must be a positive integer' }, status: :unprocessable_entity
    #     return
      # end
    end
    render json: { data: @cart_item }, status: :ok
  end

  # DELETE /carts/:cart_id/cart_items/:id/remove_item
  def remove
    @cart_item.destroy
    head :no_content
  end

  private

  # Find the cart by its ID
  def get_cart
    @cart = Cart.find(params[:cart_id])
    if @cart.nil?
      render json: { error: 'Cart not found' }, status: :not_found 
    else
      puts "#######{@cart}"
    end
  end

  # Find the cart item by its ID
  def get_cart_item
    @cart_item = CartItem.find_by(id: params[:id], cart_id: params[:cart_id])
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