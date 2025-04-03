# app/controllers/api/sessions_controller.rb
# module Api
# 
#
require Rails.root.join('app', 'services', 'jwt_service')
class SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_with_token!, only: [:create]  # Don't require authentication for login

  def create
    # params = params[:user]
    user = User.find_by(email: params[:email])
    # puts "params: #{params} username: #{user_params[:email]}, user: #{User.find_by(email: user_params[:email])}"
    if user.nil?
      render json: {message: 'User unavailable, please sign up'}, status: :not_found
    elsif user && user.valid_password?(params[:password])
      token = JwtService.encode({ user_id: user.id })
      cart = user.carts || user.carts.create  # Ensure user has a cart

      render json: { message: 'Signed in successfully.', user: user, cart_id: cart.id, token: token }, status: :ok
    else
      render json: { error: 'Invalid email or password', encrypted_password: user.encrypted_password, given_password: JwtService.decode(params[:password]) }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    render json: { message: "Logged out successfully" }, status: :ok
  end
end
