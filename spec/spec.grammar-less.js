
JSpec.describe('Grammar-less', function(){
  it('should work', function(){
    expect(true).to('be', true)
  })
  
  describe('with nested describes', function(){
    it('should work', function(){
      expect(true).not_to('be', false)
    })
  })
})