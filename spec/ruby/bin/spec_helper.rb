
require 'fileutils'

BIN = File.dirname(__FILE__) + '/../../../bin/jspec'

def jspec *args
  system BIN, *args
end

def capture &block
  IO.popen('-') do |io|
    io ? io.read : yield
  end
end