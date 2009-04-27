
describe 'Shared Behaviors'
  describe 'findSuite'
    it 'should find a suite by full description'
      JSpec.findSuite('Shared Behaviors User', JSpec.suites).should.be_a JSpec.Suite
    end
    
    it 'should find a suite by nested full description'
      JSpec.findSuite('Shared Behaviors User Administrator Super Administrator', JSpec.suites).should.be_a JSpec.Suite
    end
    
    it 'should find a suite by name'
      JSpec.findSuite('User', JSpec.suites).should.be_a JSpec.Suite
    end
    
    it 'should traverse until a match is found'
      JSpec.findSuite('Super Administrator', JSpec.suites).should.be_a JSpec.Suite
    end
    
    it 'should return null when not found'
      JSpec.findSuite('Rawr', JSpec.suites).should.be_null
    end
  end

  describe 'User'
    before
      User = function(name) { this.name = name }
      user = new User('joe')
    end
    
    it 'should have a name'
      user.should.have_property 'name'
    end
  end
  
  describe 'Administrator'
    should_behave_like('User')
    
    before
      Admin = function(name) { this.name = name }
      Admin.prototype.may = function(perm){ return true }
      user = new Admin('tj')
    end
    
    it 'should have access to all permissions'
      user.may('edit pages').should.be_true
    end
    
    describe 'Super Administrator'
      should_behave_like('Administrator')
      
      before
        SuperAdmin = function(name) { this.name = name }
        SuperAdmin.prototype.may = function(perm){ return true }
        user = new SuperAdmin('tj')
      end
    end
  end
end