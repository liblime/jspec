
require 'webrick'
require 'rbconfig'
require 'fileutils'
include FileUtils

#--
# Browser
#++
 
class Browser
  
  ##
  # Weither or not the browser is supported.
  
  def supported?; true end
  
  ##
  # Server setup.
  
  def setup; end
  
  ##
  # Server teardown.
  
  def teardown; end
  
  ##
  # Host environment.
 
  def host
    Config::CONFIG['host']
  end
  
  ##
  # Check if we are using macos.
  
  def macos?
    host.include?('darwin')
  end
  
  ##
  # Check if we are using windows.
  
  def windows?
    host.include?('mswin')
  end
  
  ##
  # Check if we are using linux.
  
  def linux?
    host.include?('linux')
  end
  
  ##
  # Run applescript _code_.
  
  def applescript code
    raise "Can't run AppleScript on #{host}" unless macos?
    system "osascript -e '#{code}' 2>&1 >/dev/null"
  end
  
  #--
  # Firefox
  #++
  
  class Firefox < self
    def visit uri
      system "open -a Firefox '#{uri}'" if macos?
      system "firefox #{uri}" if linux?
      system "#{File.join(ENV['ProgramFiles'] || 'c:\Program Files', '\Mozilla Firefox\firefox.exe')} #{uri}" if windows? 
    end

    def to_s
      'Firefox'
    end
  end
  
  #--
  # Safari
  #++
  
  class Safari < self
    def supported?
      macos?
    end

    def setup
      applescript 'tell application "Safari" to make new document'
    end           
                  
    def visit uri 
      applescript 'tell application "Safari" to set URL of front document to "' + uri + '"'
    end

    def to_s
      'Safari'
    end
  end
  
  #--
  # Internet Explorer
  #++
  
  class IE < self
    def supported?
      windows?
    end
    
    def setup
      require 'win32ole'
    end

    def visit uri
      ie = WIN32OLE.new 'InternetExplorer.Application'
      ie.visible = true
      ie.Navigate uri
      while ie.ReadyState != 4 do
        sleep 1
      end
    end

    def to_s
      'Internet Explorer'
    end
  end
  
  #--
  # Opera
  #++
  
  class Opera < self
    def visit uri
      applescript 'tell application "Opera" to GetURL "' + uri + '"' if macos? 
      system "c:\Program Files\Opera\Opera.exe #{uri}" if windows? 
      system "opera #{uri}" if linux?
    end
    
    def to_s
      'Opera'
    end
  end
  
end
