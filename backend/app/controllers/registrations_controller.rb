class RegistrationsController < Devise::RegistrationsController
    skip_before_action :authenticate_with_token!
    
end
