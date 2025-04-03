module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_with_token!
  end

  def current_user
    return @current_user if @current_user

    header = request.headers['Authorization']
    if header.blank?
      Rails.logger.warn "Missing Authorization header"
      return nil
    end

    token = header.split(' ').last
    decoded = JwtService.decode(token)

    if decoded.nil?
      Rails.logger.warn "Invalid or expired JWT"
      return nil
    end

    @current_user = User.find_by(id: decoded[:user_id])
  end

  def authenticate_with_token!
    unless current_user
      render json: { error: 'Unauthorized. Please log in.' }, status: 401
    end
  end
end
