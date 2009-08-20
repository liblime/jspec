
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
  
  ##
  # Override Sinatra's #send_file to prevent caching.
  
  def send_file path, opts = {}
    stat = File.stat(path)
    response['Cache-Control'] = 'no-cache'
    content_type media_type(opts[:type]) ||
      media_type(File.extname(path)) ||
      response['Content-Type'] ||
      'application/octet-stream'

    response['Content-Length'] ||= (opts[:length] || stat.size).to_s

    if opts[:disposition] == 'attachment' || opts[:filename]
      attachment opts[:filename] || path
    elsif opts[:disposition] == 'inline'
      response['Content-Disposition'] = 'inline'
    end

    halt ::Sinatra::Application::StaticFile.open(path, 'rb')
  rescue Errno::ENOENT
    not_found
  end
  
  ##
  # Find the browser name for the current user agent.
  
  def browser_name
    Browser.subclasses.find do |browser|
      browser.matches_agent? env['HTTP_USER_AGENT']
    end.new
  rescue
    'Unknown'
  end
  
  ##
  # Wrap _string_ with ansi escape sequence using _code_.
  
  def color string, code
    "\e[#{code}m#{string}\e[0m"
  end
  
  ##
  # Colored browser name.
  
  def browser
    color browser_name, 1
  end
  
  ##
  # Colored passes.
  
  def passes
    color params[:passes], 32
  end
  
  ##
  # Colored failures.
  
  def failures
    color params[:failures], 31
  end
end