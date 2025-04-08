class CartsController < ApplicationController
  before_action :authenticate_with_token!, only: %i[index destroy]
  before_action :get_cart, only: %i[index destroy update remove]
  before_action :get_cart_item, only: %i[update remove]


  def index
    item_info = @cart.cart_items.map do |cart_item|
      @cart_item = cart_item
      {
        id: cart_item.id,
        item: {
          id: cart_item.item.id,
          name: cart_item.item.name,
          price: cart_item.item.price
        },
        subtotal: get_subtotal,
        # subtotal: get_subtotal cart_item,
        item_count: cart_item.item_count
      }
    end
  
    render json: { data: item_info, total_price: get_total_price }, status: :ok
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
      if params[:op].to_i > 0
        @cart_item.update!(item_count: params[:op].to_i)
      else
        render json: { error: 'Item count must be a positive.' }, status: :unprocessable_entity
        return
      end
    end
    get_subtotal
    @cart_item.subtotal = @cart_item.item_count * @cart_item.item.price
    render json: { data: @cart_item }, status: :ok
  end

  def remove
    @cart_item.destroy
    head :no_content
  end


  private

  def get_cart
    @cart = current_user.carts
    render json: { error: 'Cart not found' }, status: :not_found if @cart.nil?
    # puts @cart.cart_items.each{|cart_item| puts cart_item.subtotal}
  end

  def get_cart_item
    @cart_item = @cart.cart_items.find_by(id: params[:id])
    render json: {
      error: 'Cart Item not found'
    }, status: :not_found if @cart_item.nil?
  end

  def get_subtotal
    @cart_item.subtotal = @cart_item.item_count * @cart_item.item.price
  end

  def get_total_price    
    @cart.total_price = @cart.cart_items.reduce(0.0) do |total_price, cart_item| 
      puts "curr toal #{total_price}, curr_subtotal: #{cart_item.subtotal}"
      total_price + cart_item.subtotal.to_f
    end
  end
end
