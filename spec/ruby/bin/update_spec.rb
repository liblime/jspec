
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
        jspec(:update, @dest)
        File.read(path).should_not include('visionmedia-jspec-1.1.0')
      end
    end

    it "should update absolute paths in specific paths passed" do
      jspec(:init, @dest)
      mock_version_in "#{@dest}/spec/environments/dom.html" do |path|
        jspec(:update, path)
        File.read(path).should_not include('visionmedia-jspec-1.1.0')
      end
    end
        
    it "should update absolute paths when using cwd is a rails app" do
      mkdir @dest + '/vendor'
      jspec(:init, @dest, '--rails')
      mock_version_in "#{@dest}/jspec/environments/dom.html" do |path|
        jspec(:update, @dest)
        File.read(path).should_not include("visionmedia-jspec-1.1.0")
      end
    end
    
    it "should update vendor libs created with --freeze" do
      mkdir @dest + '/foo'
      jspec(:init, @dest, '--freeze')
      rm "#{@dest}/lib/jspec.js"
      jspec(:update, @dest)
      File.exists?("#{@dest}/lib/jspec.js").should be_true
      File.directory?("#{@dest}/foo").should be_true
    end
    
    it "should update vendor libs created with --symlink" do
      mkdir @dest + '/foo'
      jspec(:init, @dest, '--symlink')
      rm "#{@dest}/lib/jspec.js"
      jspec(:update, @dest)
      File.exists?("#{@dest}/lib/jspec.js").should be_true
      File.directory?("#{@dest}/foo").should be_true
    end
    
  end
end
