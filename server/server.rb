
$:.unshift File.dirname(__FILE__) 

require 'sinatra'
require 'thread'
require 'browsers'
require 'routes'

module JSpec
  class Server
    
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
      browsers ||= Browser.subclasses.map { |browser| browser.new }
      Sinatra::Application.run!
      browsers.map do |browser|
        Thread.new {
          if browser.supported?
              browser.setup
            browser.visit uri + '/' + suite
            browser.teardown
          end
        }
      end.each { |thread| thread.join }
      sleep 5000
    end
    
  end
end