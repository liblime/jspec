
describe JSpec::Project do
  describe "#initialize" do
    it "should accept a dest path" do
      JSpec::Project.new('foo').dest.should == 'foo'
    end
    
    it "should default dest to ." do
      JSpec::Project.new('.').dest.should == '.'
    end
  end
end