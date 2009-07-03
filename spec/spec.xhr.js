
describe 'JSpec'
  describe 'Ajax Mocks'
    it 'should description'
      window.XMLHttpRequest = JSpec.XHR;
      JSpec.XHR.returns('({foo : "bar"})', 'application/json', 200)
      $.getJSON('test', function(response){
        console.log(response);
      })
    end
  end
end