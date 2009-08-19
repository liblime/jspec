
module JSpec
  class Server
    
    ##
    # Host string.
    
    attr_reader :host
    
    ##
    # Port number.
    
    attr_reader :port
    
    ##
    # Initialize with _host_ and _port_. Defaulting to
    # localhost and port 4444.
    
    def initialize host = :localhost, port = 4444
      
    end
    
  end
end