
require 'rubygems'
require 'rack'
require 'server/browsers'

module JSpec
  class Server
    attr_reader :responses, :browsers
    
    def initialize options = {}
      @responses = []
      @browsers = options.delete :browsers
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
      require 'rubygems'
      require 'growl'
      if failures
        notify_error "failed #{failures} assertions", :title => browser
      else
        notify_ok "#passed #{passes} assertions", :title => browser
      end
    rescue
      # Do nothing
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
    
    def when_finished &block
      Thread.new {
        while responses.length < browsers.length
          sleep 0.1
        end
        yield
      }
    end
    
    def self.start options, spec
      app = Rack::Builder.new do
        server = JSpec::Server.new :browsers => options.browsers
        server.when_finished { exit }
        run server
      end
      Thread.new { 
        sleep 1
        run_browsers options.browsers, spec
      }
      puts "JSpec server started\n\n"
      Rack::Handler::Mongrel.run app, :Port => 4444
      self
    end
    
    def self.run_browsers browsers, spec
      browsers.each do |name|
        browser(name).open spec
      end
    end
    
    def self.browser name
      eval("JSpec::Browser::#{name}").new
    end
  end
end