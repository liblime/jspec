
require 'open-uri'

module JSpec
  class Installable
    
    ##
    # Options array
    
    attr_reader :options
    
    ##
    # Initialize with _options_
    
    def initialize options = {}
      @options = options
    end
    
    ##
    # Called before installing.
    
    def before; end
    
    ##
    # Called after installing.
    
    def after; end
    
    ##
    # Message to display after installation.
    
    def installed_message; end
    
    #--
    # jQuery
    #++
    
    class Jquery < self
      
      ##
      # Current release.
      
      CURRENT = '1.3.2'
      
      ##
      # Release specified or the current release.
      
      def release
        options[:release] || self.class::CURRENT
      end
      
      ##
      # Installation path.
      
      def path
        options[:to] + '/jquery.js'
      end
      
      ##
      # Installation uri.
      
      def uri
        "http://ajax.googleapis.com/ajax/libs/jquery/#{release}/jquery.js"
      end
      
      ##
      # Install.
      
      def install
        File.open(path, 'w+') do |file|
          file.write open(uri).read
        end
      end
      
      ##
      # Installation message.
      
      def installed_message
        "jQuery #{release} installed to #{path}"
      end
      
    end
    
    #--
    # jQuery UI.
    #++
    
    class Jqueryui < Jquery
      
      ##
      # Current release.
      
      CURRENT = '1.7.2'
      
      ##
      # Installation path.
      
      def path
        options[:to] + '/jquery.ui.js'
      end
      
      ##
      # Installation uri.
      
      def uri
        "http://ajax.googleapis.com/ajax/libs/jqueryui/#{release}/jquery-ui.js"
      end
      
      ##
      # Installation message.
      
      def installed_message
        "jQuery UI #{release} installed to #{path}"
      end
      
    end
      
  end
end