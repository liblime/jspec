
describe 'JSpec'
  it 'should allow "it" spec literal'
    true.should.be_true
  end
  
  describe 'nested describe'
    it 'should work'
      true.should.be_true
    end
    
    describe 'nested again'
      it 'should still work'
        true.should.be_true
      end
    end
  end
   
  describe 'multiple nested describes'
    it 'should should work'
      true.should.be_true
    end
  end
end