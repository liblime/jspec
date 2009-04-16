
require 'rubygems'
require 'rack'
require 'server/browsers'

module JSpec
  class Server
    attr_reader :responses
    
    def initialize
      @responses = []
    end
    
    def call env
      request = Rack::Request.new env
      agent = env['HTTP_USER_AGENT']
      responses << browser(agent)
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
    
    def when_finished browsers, &block
      Thread.new {
        while responses.length < browsers.length
          sleep 0.1
        end
        yield
      }
    end
    
    def self.start options
      app = Rack::Builder.new do
        server = JSpec::Server.new
        server.when_finished(options.browsers) { exit }
        run server
      end
      puts "JSpec server started, testing browsers #{options.browsers.join(', ')}\n"
      fork { 
        sleep 1
        run_browsers options.browsers
      }
      Rack::Handler::Mongrel.run app, :Port => 4444
      self
    end
    
    def self.run_browsers browsers
      browsers.each do |name|
        browser(name).open File.dirname(__FILE__) + '/server.html'
      end
    end
    
    def self.browser name
      eval("JSpec::Browser::#{name}").new
    end
  end
end