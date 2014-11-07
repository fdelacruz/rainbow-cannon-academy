# OmniAuth.config.logger = Rails.logger


Rails.application.config.middleware.use OmniAuth::Builder do
  provider :quizlet, ENV['QUIZLET_ID'], ENV['QUIZLET_SECRET'], :scope => "read", :state => "welcome"
end
