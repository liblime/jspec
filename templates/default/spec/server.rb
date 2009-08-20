
get '/lib/*' do |path|
  send_file path
end