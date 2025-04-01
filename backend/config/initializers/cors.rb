Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins 'http://localhost:4200'
    origins '*'
    resource '*',
    headers: :any,
    methods: [:get, :post, :put, :patch, :delete, :options, :head, :add_to_cart]
  end
end