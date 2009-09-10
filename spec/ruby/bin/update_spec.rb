
include FileUtils

describe "jspec" do
  describe "update" do
    before :each do
      @dest = File.dirname(__FILE__) + '/test'
      mkdir @dest  
    end
    
    after :each do
      rm_rf @dest
    end
    
    def mock_version_in path, &block
      File.open(path, 'w+') do |file|
        file.write 'src="/Some/path/visionmedia-jspec-1.1.0"'
      end
      yield path if block
    end
    
    it "should update absolute paths matching visionmedia-jspec-n.n.n" do
      jspec(:init, @dest)
      mock_version_in "#{@dest}/spec/environments/dom.html" do |path|
        Dir.chdir(@dest) { jspec(:update) }
        File.read(path).should include("visionmedia-jspec-#{program(:version)}")
      end
    end
    
    it "should update absolute paths matching visionmedia-jspec-n.n.n for a rails project" do
      mkdir @dest + '/vendor'
      jspec(:init, @dest)
      mock_version_in "#{@dest}/jspec/environments/dom.html" do |path|
        Dir.chdir(@dest) { jspec(:update) }
        File.read(path).should include("visionmedia-jspec-#{program(:version)}")
      end
    end
    
    it "should update absolute paths matching visionmedia-jspec-n.n.n when a destination is passed" do
      jspec(:init, @dest)
      mock_version_in "#{@dest}/spec/environments/dom.html" do |path|
        jspec(:update, @dest)
        File.read(path).should include("visionmedia-jspec-#{program(:version)}")
      end
    end
    
    it "should update absolute paths matching visionmedia-jspec-n.n.n for a rails project when a destination in passed" do
      mkdir @dest + '/vendor'
      jspec(:init, @dest)
      mock_version_in "#{@dest}/jspec/environments/dom.html" do |path|
        jspec(:update, @dest)
        File.read(path).should include("visionmedia-jspec-#{program(:version)}")
      end
    end
        
  end
end
