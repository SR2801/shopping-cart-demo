class User < ApplicationRecord
  # has_secure_password
  has_many :sessions, dependent: :destroy
  has_one :carts, class_name: 'Cart', dependent: :destroy
  after_create :create_user_cart

  normalizes :email, with: ->(e) { e.strip.downcase }
    devise :database_authenticatable, :registerable, :recoverable,:rememberable, :validatable

  private
  def create_user_cart
    ActiveRecord::Base.transaction do
      cart = create_carts!
      puts "#####################################################################################Association between #{self.id} and #{self.carts.id} = #{cart.id}"
    end
  end



end
