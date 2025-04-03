class ApplicationController < ActionController::API
  include ActionController::Flash
  include Authentication
  # before_action :authenticate_with_token!

  def status
    render json: { data:'ok' }
  end
end
