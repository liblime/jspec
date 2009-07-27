
describe 'jQuery'
  describe '.getJSON()'
    it 'should work with mockRequest'
      mockRequest.and_return('{ foo : "bar" }')
      $.getJSON('foo', function(response, statusText){
        response.foo.should.eql 'bar'
        statusText.should.eql 'success'
      })
    end
  end
end