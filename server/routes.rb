
helpers do
  def browser
    case env['HTTP_USER_AGENT']
    when /safari/i    ; 'Safari'
    when /opera/i     ; 'Opera'
    when /google/i    ; 'Chrome'
    when /firefox/i   ; 'Firefox'
    when /microsoft/i ; 'IE'
    else                'Unknown'
    end
  end
  
  def color str, code
    "\e[#{code}m#{str}\e[0m"
  end
  
  def passes
    color params[:passes], 32
  end
  
  def failures
    color params[:failures], 31
  end
end

get '/jspec/*' do |path|
  send_file JSPEC_ROOT + '/lib/' + path
end

post '/results' do
  puts "%15s - %s : %s" % [color(browser, 1), passes, failures]
end