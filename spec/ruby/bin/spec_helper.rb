
require 'fileutils'

BIN = File.dirname(__FILE__) + '/../../../bin/jspec'

def jspec *args
  system BIN, *args
end