
describe "jspec" do
  describe "shell" do
    it "should load jspec.js" do
      shell('print(JSpec.version)', 'quit()').should include('JSpec')
    end
  end
end