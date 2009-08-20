
#--
# Routes
#++

get '/jspec/*' do |path|
  send_file JSPEC_ROOT + '/lib/' + path
end

post '/results' do
  require 'json'
  # TODO: add #option helper .. switch / json
  data = JSON.parse request.body.read
  puts "\n\n  --- %s Passes: %s Failures: %s ---" % [bold(browser_name), green(data['stats']['passes']), red(data['stats']['failures'])]
  if not data['options'].include?('verbose') || data['options']['verbose']
    data['results'].compact.each do |suite|
      puts "\n  " + bold(suite['description'])
      suite['specs'].compact.each do |spec|
        next if spec['status'] == 'pass' && data['options'].include?('failuresOnly') && data['options']['failuresOnly'] 
        puts '    ' +  send(spec['status'] == 'pending' ? :blue : :green, spec['description'])
        puts '      ' +  red(spec['message']) if spec['message']
      end
    end
  end
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
  # Bold _string_.
  
  def bold string
    color string, 1
  end
  
  ##
  # Color _string_ red.
  
  def red string  
    color string, 31
  end
  
  ##
  # Color _string_ green.
  
  def green string
    color string, 32
  end
  
  ##
  # Color _string_ blue.
  
  def blue string
    color string, 34
  end
end