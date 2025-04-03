class ItemsController < ApplicationController
  include Authentication
  # allow_unauthenticated_access
  before_action :authenticate_with_token!, only: %i[add_to_cart]

  before_action :get_item, only: %i[show update destroy]
  before_action :get_item_for_cart, only: %i[add_to_cart]
  before_action :get_cart, only: %i[add_to_cart]

  # GET /items
  def index
    @items = Item.all.order(rating: :desc)
    render json: { data: @items }, status: :ok
  end

  # GET /items/:id
  def show
    render json: { data: @item}, status: :ok
  end

  # POST /items
  def create
    @item = Item.new(item_params)
    if @item.save
      render json: { data: @item }, status: :created
    else
      render json: { errors: @item.errors.messages }, status: :unprocessable_entity
    end
  end

  # PATCH /items/:id
  def update
    if @item.update(item_params)
      render json: { data: @item }, status: :ok
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /items/:id
  def destroy
    @item.destroy
    head :no_content
  end

  def add_to_cart
    @cart_item = @cart.cart_items.find_or_create_by(item_id: @item.id)  # Find or create the cart item
    # Increment the item count
    @cart_item.increment!(:item_count)
    render json: { message: 'Item added to cart', item: @cart_item }, status: :created
  end

  private

  # Strong parameters for creating and updating items
  def item_params
    params.expect(item: %i[ :name ])
  end

  # Find the item by its ID
  
  def get_item
    # id = (params.get(:item_id).nil?)?params[:id] : params[:item_id]
    # puts "#################################################Id: #{id} Param: #{params}"
    @item = Item.find_by(id: params[:id] )
    render json: { error: 'Item not found' }, status: :not_found if @item.nil?
  end
  def get_item_for_cart
  puts "#################################################Id: #{params}"
  @item = Item.find_by(id: params[:item_id])
  render json: { error: 'Item not found' }, status: :not_found if @item.nil?
  end

  def get_cart
    # @cart = Cart.find_or_create_by(id: 6)
    puts "###########################################################Current user: #{current_user.id}, cart_id : #{current_user.carts}"
    @cart = current_user.carts

    if @cart.nil?
      render json: { error: "Cart not found for user_id: #{current_user.id}" }, status: :not_found 
    else
      puts "#######{@cart}"
    end
  end
end
