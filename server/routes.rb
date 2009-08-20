
#--
# Routes
#++

get '/jspec/*' do |path|
  send_file JSPEC_ROOT + '/lib/' + path
end

post '/results' do
  puts "%20s: %s %s" % [browser, passes, failures]
end

#--
# Simulation Routes
#++

get '/slow/*' do |seconds|
  sleep seconds.to_i
end

get '/status/*' do |code|
  halt code.to_i
end

get '/content' do
  if params[:type] && params[:body]
    content_type params[:type]
    params[:body]
  else
    not_found 'Content type and body required'
  end
end

#--
# Helpers
#++

helpers do
  def browser_name
    Browser.subclasses.find do |browser|
      browser.matches_agent? env['HTTP_USER_AGENT']
    end.new
  rescue
    'Unknown'
  end
  
  def color str, code
    "\e[#{code}m#{str}\e[0m"
  end
  
  def browser
    color browser_name, 1
  end
  
  def passes
    color params[:passes], 32
  end
  
  def failures
    color params[:failures], 31
  end
end