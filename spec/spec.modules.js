
describe 'JSpec'
  describe 'modules'
    it 'should run in context with beforeSpec'
      addedBeforeSpec.should.be_true
      addedAfterSpec.should.not.be_true
    end
    
    it 'should run in context with afterSpec'
      addedAfterSpec.should.be_true
    end
    
    it 'should run in context with beforeSuite'
      addedBeforeSuite.should.be_true
      addedAfterSuite.should.not.be_true
    end
    
    describe 'another suite'
      it 'should run in context with afterSuite'
        addedAfterSuite.should.be_true
      end
    end
  end
end