require Rails.root.join('app', 'services', 'jwt_service')
class SessionsController < Devise::SessionsController
  # respond_to :json
  skip_before_action :authenticate_with_token!, only: [:create, :new ]  # Don't require authentication for login

  def create
    user = User.find_by(email: params[:email])
    if user.nil?
      render json: {error: 'User unavailable, please sign up'}, status: :not_found
    elsif user && user.valid_password?(params[:password])
      token = JwtService.encode({ user_id: user.id })
      cart = user.carts || user.carts.create  # Ensure user has a cart

      render json: { message: 'Signed in successfully.', user: user, cart_id: cart.id, token: token }, status: :ok
    else
      render json: { error: 'Invalid password', encrypted_password:user.encrypted_password, given_password: params[:password]}, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    render json: { message: "Logged out successfully" }, status: :ok
  end
end
