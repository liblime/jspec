
module JSpec
  class Browser
    
    ##
    # Open the given _uri_.
    
    def open uri
      `open -g -a #{name} #{uri}`
    end
    
    ##
    # Browser name symbol.
    
    def name
      self.class.to_s.split('::').last.to_sym
    end
    
    #--
    # Browsers
    #++
    
    class Chromium < self; end
    class Firefox < self; end
    class Safari < self; end
    class Opera < self; end
    
  end
end