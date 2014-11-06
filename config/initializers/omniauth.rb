# OmniAuth.config.logger = Rails.logger


Rails.application.config.middleware.use OmniAuth::Builder do
  provider :quizlet, ENV['QUIZLET_ID'], ENV['QUIZLET_SECRET'], :scope => "read write_set write_group", :state => "welcome"
end
