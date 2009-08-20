
get '/jspec/*' do |path|
  send_file JSPEC_ROOT + '/lib/' + path
end

post '/results' do
  require 'json'
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
  halt 200
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
