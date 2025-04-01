class Brand < ApplicationRecord
  has_one_attached :logo_image
  validates :name, presence: true
end
