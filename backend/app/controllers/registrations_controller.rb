class RegistrationsController < Devise::RegistrationsController
    respond_to :json
    skip_before_action :authenticate_with_token!
    
    def new
      sign_up_params = params[:user]
      email = sign_up_params[:email]
      password = sign_up_params[:password]
  
      # Check if the user already exists
      if User.exists?(email: email)
        return render json: { error: "User with this email already exists!" }, status: :unprocessable_entity
      end
  
      # Create a new user
      user = User.new(email: email, password: password)
  
      if user.save
        render json: { message: "User registered successfully!", user: user }, status: :ok
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: {message: "User registered successfully!", user: resource}, status: :ok
      else
        render json: {error: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end
end
