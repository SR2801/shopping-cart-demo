class ApplicationController < ActionController::API
  include ActionController::Flash
  include Authentication
  # before_action :authenticate_with_token!
  respond_to :json

  def status
    render json: { data:'ok' }
  end
end
