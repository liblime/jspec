
$:.unshift File.dirname(__FILE__) 

require 'sinatra/base'
require 'thread'
require 'browsers'

module JSpec
  class Server < Sinatra::Base
    
    ##
    # Suite HTML.
    
    attr_accessor :suite
    
    ##
    # Host string.
    
    attr_reader :host
    
    ##
    # Port number.
    
    attr_reader :port
    
    ##
    # Server instance.
    
    attr_reader :server
    
    ##
    # Initialize.
    
    def initialize suite, port
      @suite, @port, @host = suite, port, :localhost
    end
    
    ##
    # URI formed by the given host and port.
    
    def uri
      'http://%s:%d' % [host, port]
    end
    
    ##
    # Start the server with _browsers_ which defaults to all supported browsers.
    
    def start browsers = nil
      say "Starting server at #{uri} ( Press CTRL + C to shutdown )"
      browsers ||= Browser.subclasses.map{ |b| b.new }
      trap('INT') { shutdown }
      thread = Thread.new { run! }
      browsers.each do |browser|
        if browser.supported?
          say "Running suite in #{browser}"
          browser.setup
          browser.visit uri + '/' + suite
          browser.teardown
        end
      end
      thread.join
      sleep 5000
    end
    
    ##
    # Shutdown.
    
    def shutdown
      say "\nShutting down server"
      exit 1
    end
    
    #--
    # Routes
    #++
    
    get '/*' do |a|
      p a
    end
    
  end
end