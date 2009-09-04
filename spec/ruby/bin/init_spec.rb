
include FileUtils

describe "jspec" do
  describe "init" do
    it "should initialize a default project at the given path" do
      dest = File.dirname(__FILE__) + '/test'
      jspec('init', dest)
      File.directory?(dest).should be_true
      rm_rf dest
    end
    
    it "should initialize a rails project when using -R or --rails" do
      dest = File.dirname(__FILE__) + '/test'
      mkdir dest
      mkdir dest + '/vendor'
      jspec('init', dest, '--rails')
      File.directory?(dest).should be_true
      rm_rf dest
    end
  end
end