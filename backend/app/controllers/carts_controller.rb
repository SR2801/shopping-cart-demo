class CartsController < ApplicationController
  before_action :authenticate_with_token!, only: %i[index destroy]
  before_action :get_cart, only: %i[index destroy]
  before_action :get_cart_item, only: %i[update remove]


  def index
    item_info = @cart.cart_items.map do |cart_item|
      item = Item.find(cart_item.item_id)
      cart_item.subtotal = cart_item.item_count * item.price
      {
        id: cart_item.id,
        item: {
          id: item.id,
          name: item.name,
          price: item.price
        },
        item_count: cart_item.item_count,
        sub_total: cart_item.subtotal
      }
    end
  
    render json: { data: item_info }, status: :ok
  end

  def destroy
    @cart.destroy
    # head :no_content
    render json: { data: "Cart deleted"}, status: :ok
  end


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
    else
      # If op is a number (and positive), set item_count to the number provided
      if params[:op].to_i > 0
        @cart_item.update!(item_count: params[:op].to_i)
      else
        render json: { error: 'item_count must be a positive integer' }, status: :unprocessable_entity
        return
      end
    end

    @cart_item.subtotal = @cart_item.item_count * Item.find(@cart_item.item_id).price
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
    cart_id =  current_user.carts.id
    @cart = Cart.find_by(id: cart_id)
    if @cart.nil?
      @cart = Cart.create(id: cart_id)
    end
    render json: { error: 'Cart not found' }, status: :not_found if @cart.nil?
  end

  def get_cart_item
    @cart_item = CartItem.find_by(id: params[:id], cart_id: current_user.carts.id)
    render json: {
      error: 'Cart Item not found'
    }, status: :not_found if @cart_item.nil?
  end
end
