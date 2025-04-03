class ApplicationController < ActionController::API
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
  # around_action :switch_locale
  

  # def switch_locale(&action)
  #   locale = params[:locale] || I18n.default_locale
  #   I18n.with_locale(locale, &action)
  # end
  include ActionController::Flash
  include Authentication
  # before_action :authenticate_with_token!

  def status
    render json: { data:'ok' }
  end
end
