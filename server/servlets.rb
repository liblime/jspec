
class ::WEBrick::HTTPServer
  def access_log(config, req, res)
    # nop
  end
end
 
class ::WEBrick::BasicLog
  def log(level, data)
    # nop
  end
end
 
class WEBrick::HTTPResponse
  alias :send :send_response
  
  def send_response socket
    send(socket) unless fail_silently?
  end
  
  def fail_silently?
    @fail_silently
  end
  
  def fail_silently
    @fail_silently = true
  end
end
 
class WEBrick::HTTPRequest
  def to_json
    headers = '{' + map { |key, val| "#{key.inspect}: #{val.inspect}" }.join(', ') + '}'
    %({ "headers": #{headers}, "body": #{body.inspect}, "method": #{request_method.inspect} })
  end
end
 
module JSpec
  class Servlet < WEBrick::HTTPServlet::AbstractServlet
    
    ##
    # Subclasses.
    
    def self.subclasses
      @subclasses ||= []
    end
    
    ##
    # Stack subclasses.
    
    def self.inherited subclass
      subclasses << subclass
    end
    
    ##
    # Server mount arguments, splatted when passed
    # to the server's #mount method.

    def self.mount
      [path, self]
    end
    
    ##
    # Mounting path.

    def self.path
      '/'
    end
    
    ##
    # Handle requests.
    
    def do_GET request, response
      p request.path
      raise WEBrick::HTTPStatus::OK
    end
    alias :do_POST :do_GET
    alias :do_PUT :do_GET
    alias :do_HEAD :do_GET
    alias :do_DELETE :do_GET
    
    ##
    # Prevent caching of _response_.
    
    def prevent_caching_for response
      response['ETag'] = nil
      response['Last-Modified'] = Time.now + 100**4
      response['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
      response['Pragma'] = 'no-cache'
      response['Expires'] = Time.now - 100**4
    end
    
    #--
    # Output results to terminal.
    #++
    
    class TerminalResults < self
      def self.path
        '/results'
      end
      
      def do_GET request, response
        require 'pp'
        pp request
        pp response
        super
      end
    end
    
    #--
    # Simulate slow response.
    #++
    
    class Slow < self
      def self.path
        '/slow'
      end

      def do_GET request, response
        sleep 2
        super
      end
    end
    
    #--
    # Simulate response failure.
    #++
    
    class DownServlet < self
      def self.path
        '/down'
      end

      def do_GET request, response
        response.fail_silently
      end
    end
    
  end
end
 

