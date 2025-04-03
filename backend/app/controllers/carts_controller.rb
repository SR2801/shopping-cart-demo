class CartsController < ApplicationController
  before_action :authenticate_with_token!, only: %i[show destroy]
  before_action :get_cart, only: %i[show destroy]

  def index
    puts params
    @carts = Cart.all
    render json: {data: @carts}, status: :ok
  end
  # GET /carts/:cart_id
  def show
    item_info = @cart.cart_items.map do |cart_item|
      item = Item.find(cart_item.item_id)
      {
        id: cart_item.id,
        item: {
          id: item.id,
          name: item.name,
          price: item.price
        },
        item_count: cart_item.item_count
      }
    end
  
    render json: { data: item_info }, status: :ok
  end

  # def show
  #   render json: { data: @cart.cart_items }, status: :ok
  # end

# curl -X DELETE http://localhost:3000/carts/2

  def destroy
    @cart.destroy
    # head :no_content
    render json: { data: "Cart deleted"}, status: :ok
  end


  private

  # Find the cart by its ID
  def get_cart
    # @cart = Cart.find_by(id: params[:id])
    puts "params are: #{params}"
    cart_id =  current_user.carts.id
    # @cart = Cart.find_by(id: params[:id] || 6)
    puts "#{current_user.carts}: current user"
    @cart = Cart.find_or_create_by(id: cart_id)
    puts "Cart found? : #{params[:id] }? Cart Id: #{cart_id}"
    render json: { error: 'Cart not found' }, status: :not_found if @cart.nil?
  end
end
