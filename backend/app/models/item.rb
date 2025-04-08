class Item < ApplicationRecord
  include Notifications

  has_rich_text :description
  has_one_attached :featured_image
  has_many :subscribers, dependent: :destroy
  after_update :update_log

  has_many :cart_items
  has_many :carts, through: :cart_items
  # belongs_to :cart_items, optional: false

  validates :name, presence: true
  validates :inventory_count, numericality: { greater_than_or_equal_to: 0 }
  validates :price, numericality: { greater_than: 0 }

  def update_log
    puts "####################################"
    puts "#{self.name} is updated"
    puts "####################################"
  end
end
