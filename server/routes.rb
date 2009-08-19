
#--
# Routes
#++

get '/jspec/*' do |path|
  headers['Cache-Control'] = 'no-cache'
  send_file JSPEC_ROOT + '/lib/' + path
end

post '/results' do
  puts "%20s: %s %s" % [browser, passes, failures]
end

#--
# Helpers
#++

helpers do
  def browser_name
    case env['HTTP_USER_AGENT']
    when /opera/i     ; 'Opera'
    when /chrome/i    ; 'Chrome'
    when /safari/i    ; 'Safari'
    when /firefox/i   ; 'Firefox'
    when /microsoft/i ; 'IE'
    else                'Unknown'
    end
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