
$:.unshift File.dirname(__FILE__) 
require 'webrick'
require 'browsers'
require 'servlets'

module JSpec
  class Server
    
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
    # Initialize with _host_ and _port_.
    
    def initialize host, port
      @host, @port = host, port
    end
    
    ##
    # Start the server
    
    def start
      trap('INT') { server.shutdown }
      say 'Starting server at http://%s:%d' % [host, port]
      @server = WEBrick::HTTPServer.new(
        :Port => port,
        :Host => host,
        :DocumentRoot => Dir.pwd
      )
      mount_servlets_to server
      server.start
    end
    
    ##
    # Mount all servlets extending JSpec::Servlet to _server_.
    
    def mount_servlets_to server
      Servlet.subclasses.each do |servlet|
        server.mount *servlet.mount
      end
    end
    
  end
end