
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
        options[:release] || CURRENT
      end
      
      ##
      # Installation path.
      
      def path
        options[:to] + '/jquery.js'
      end
      
      ##
      # Install.
      
      def install
        response = open("http://ajax.googleapis.com/ajax/libs/jquery/#{release}/jquery.min.js")
        File.open(path, 'w+') do |file|
          file.write response.read
        end
      end
      
      ##
      # Installation message.
      
      def installed_message
        "jQuery #{release} installed to #{path}"
      end
      
    end
      
  end
end