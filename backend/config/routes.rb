Rails.application.routes.draw do
  # Item-related routes
  resources :items, only: %i[index show create update destroy] do
    post 'add_to_cart', to: 'items#add_to_cart'
  end
  root to: "items#index"
  # Cart-related routes  
  resources :carts, only: %i[index show destroy] do
    resources :cart_items, only: [] do
        patch 'update', on: :member  # Increment or decrement item count
        delete 'remove', on: :member  # Remove item from the cart
    end
  end
  #   # Custom route to add item to cart
  #   post 'add_to_cart', to: 'cart_items#add_to_cart'  # This matches POST /carts/:cart_id/add_to_cart
  # end
    # CartItems-related routes for adding, updating, and removing items in the cart
end
