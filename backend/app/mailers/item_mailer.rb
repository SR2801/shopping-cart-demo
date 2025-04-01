class ItemMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.item_mailer.in_stock.subject
  #
  default from: "no-reply@cornerwoods.ia.ooo"
  def in_stock
    @greeting = "Hi"
    @item = params[:item]
    mail to: params[:subscriber].email

    # mail to: "to@example.org"
  end
end
