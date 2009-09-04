

describe "jspec" do
  describe "init" do
    it "should initialize a default project at the given path" do
      jspec('init', File.dirname(__FILE__) + '/test')
    end
  end
end