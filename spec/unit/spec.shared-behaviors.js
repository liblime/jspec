// TODO: shared behavior hooks...???
// TODO: fix duplication of behavior find 

shared_behaviors_for 'ninjas'
	before
		ninja = {makesNoSound : function(){return true;}}
	end

	it 'should be silent'
		ninja.makesNoSound().should.be_true
	end
end

shared_behaviors_for 'person'
  it 'should have a name'
    person.should.have_property 'name'
  end
end

shared_behaviors_for 'administrator'
	should_behave_like('person')
	
	it 'should have access to all permissions'
		person.may('edit pages').should.be_true
		person.may('delete users').should.be_true
  end
end

describe 'Shared Behaviors'
  describe 'User'
    before
      User = function(name) { this.name = name }
      person = new User('joe')
    end
    
		should_behave_like('person')  		
  end

  describe 'Administrator' 
    before
      Admin = function(name) { this.name = name }
      Admin.prototype.may = function(perm){ return true }
      person = new Admin('tj')
    end

		should_behave_like('administrator')
  end

  describe 'Super Administrator'
    before
      SuperAdmin = function(name) { this.name = name }
      SuperAdmin.prototype.may = function(perm){ return true }
	  	SuperAdmin.prototype.canCreateUsers = function(){ return true}
      person = new SuperAdmin('tj')
    end

    should_behave_like('administrator')

		it "should be allowed to create users"
		  person.canCreateUsers().should.be_true
		end
  end
  
  shared_behaviors_for 'User with toString()'
    before
      person = { toString : function() { return '<User tj>' }}
    end
    
    it 'should return &lt;User NAME&gt;'
      person.toString().should.match(/\<User/)
    end
  end
  
  describe 'Manager'
    should_behave_like('person')
    should_behave_like('User with toString()')
    
    before
      Manager = function(name) { this.name = name }
      Manager.prototype.may = function(perm){ return perm == 'hire' || perm == 'fire' }
      Manager.prototype.toString = function(){ return '<User ' + this.name + '>' }
      person = new Manager('tj')
    end
    
    it 'should have access to hire or fire employees'
      person.may('hire').should.be_true
      person.may('fire').should.be_true
      person.may('do anything else').should.be_false
    end
  end
  
  describe 'findSuite'
    it 'should find a suite by full description'
      JSpec.findSuite('Shared Behaviors Administrator').should.be_a JSpec.Suite
    end
    
    it 'should find a suite by name'
      JSpec.findSuite('User').should.be_a JSpec.Suite
    end
    
    it 'should return null when not found'
      JSpec.findSuite('Rawr').should.be_null
    end
  end

	describe 'findLocalSharedBehavior'
		it 'should find shared behavior by name'
			JSpec.findLocalSharedBehavior('User with toString()').should.be_a JSpec.Suite
		end
		
    it 'should return null when not found'
      JSpec.findGlobalSharedBehavior('Rawr').should.be_null
    end		

		describe 'nested'
			it 'should find shared behavior by name when nested'
				JSpec.findLocalSharedBehavior('User with toString()').should.be_a JSpec.Suite			
			end
		end
	end

	describe 'findGlobalSharedBehavior'
		it 'should find shared behavior by name'
			JSpec.findGlobalSharedBehavior('person').should.be_a JSpec.Suite
		end
		
    it 'should return null when not found'
      JSpec.findGlobalSharedBehavior('Rawr').should.be_null
    end		
	end
	
	describe 'findSharedBehavior'
		
		shared_behaviors_for 'person'
			it 'should not have name'
				person.should.not.have_property 'name'
			end
		end
		
		describe 'override behavior'
			it 'should find local shared behavior before global'
				JSpec.findSharedBehavior('person').specs[0].description.should.eql('should not have name')
			end
		end
		
		it 'should find shared global behavior by name'
			JSpec.findGlobalSharedBehavior('ninjas').should.be_a JSpec.Suite
		end
	
    it 'should return null when not found at either level'
      JSpec.findGlobalSharedBehavior('Rawr').should.be_null
    end
		
	end

end
