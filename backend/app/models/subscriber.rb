class Subscriber < ApplicationRecord
  belongs_to :item
  generates_token_for :unsubscribe
  after_create :log_new_subscriber
  def log_new_subscriber
    puts "###################################\n\tNew subscriber registered\n###################################"
  end
end
