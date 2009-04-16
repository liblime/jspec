
require 'rubygems'
require 'rack'

module JSpec
  class Server
    def call env
      request = Rack::Request.new env
      agent = env['HTTP_USER_AGENT']
      display_results browser(agent), request['failures'], request['passes']
      [200, { 'Content-Type' => 'text/plain', 'Content-Length' => '5' }, 'close']
    end

    def display_results browser, failures, passes
      puts '%s - failures %s passes %s' % [bold(browser), red(failures), green(passes)]
    end

    def browser string
      case
      when /Safari/  ; :Safari
      when /Firefox/ ; :Firefox
      when /MSIE/    ; :MSIE
      when /Opera/   ; :Opera
      end
    end

    def bold string
      color string, 1
    end

    def red string
      color string, 31
    end

    def green string
      color string, 32
    end

    def color string, code
      "\e[#{code}m#{string}\e[m"
    end
    
    def self.start options
      app = Rack::Builder.new do
        run JSpec::Server.new
      end
      puts "JSpec server started, testing browsers #{options.browsers.join(', ')}\n"
      fork { run_browsers options.browsers }
      Rack::Handler::Mongrel.run app, :Port => 4444
      self
    end
    
    def self.run_browsers browsers
      
    end
  end
end