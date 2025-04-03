
Rails.application.routes.draw do
  # devise_for :users
  devise_for :users,  defaults: { format: :json }, controllers: {
    sessions: 'sessions',
    registrations: 'registrations'
  }


  resources :items, only: %i[index show]do
    post 'add_to_cart', to: 'items#add_to_cart'
  end
  root to: "items#index"


  resources :carts, only: %i[show destroy] do
    resources :cart_items, only: [] do
        patch 'update', on: :member  # Increment or decrement item count
        delete 'remove', on: :member  # Remove item from the cart
    end
  end
  get 'carts/', to: 'carts#show'
    
end
