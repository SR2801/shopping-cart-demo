class RegistrationsController < Devise::RegistrationsController
    respond_to :json
    skip_before_action :authenticate_with_token!
    
    def new
      sign_up_params = params[:user]
      email = sign_up_params[:email]
      password = sign_up_params[:password]
      password_confirmation = sign_up_params[:password_confirmation]
  
      # Check if the user already exists
      if User.exists?(email: email)
        return render json: { error: "User with this email already exists!" }, status: :unprocessable_entity
      end
  
      # Check if passwords match
      unless password == password_confirmation
        return render json: { error: "Passwords do not match!" }, status: :unprocessable_entity
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
  
    # def sign_up_params
    #   params.require(:registration).permit(:email, :password)
    # end
    def respond_with(resource, _opts = {})
      puts "###################user: #{resource.id} #{resource.email} #{resource.password}}"
      if resource.persisted?
        render json: {message: "User registered successfully!", user: resource}, status: :ok
      else
        render json: {error: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end
end
