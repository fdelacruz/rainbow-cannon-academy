use OmniAuth::Builder do
  provider :quizlet, 'client_id', 'secret_key', :scope => "read write_set write_group", :state => "RANDOM_STRING"
end
