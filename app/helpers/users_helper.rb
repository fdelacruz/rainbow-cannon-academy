module UsersHelper

  def get_basic_details(uid, access_token)
    JSON.parse(`curl -H "Authorization: Bearer #{access_token}" "https://api.quizlet.com/2.0/users/#{uid}"`)
  end

end
