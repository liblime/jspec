
module JSpec
  class Browser
    def open url
      `open -g -a #{name} #{url}`
    end
    
    class Firefox < self
      def name
        :Firefox
      end  
    end

    class Safari < self
      def name
        :Safari
      end
    end

    class Opera < self
      def name
        :Opera
      end
    end

    class MSIE < self

    end
  end
end