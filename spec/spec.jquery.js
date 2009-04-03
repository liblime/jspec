
describe 'jQuery helpers'

  before
    .dom = this.sandbox()
  end
    
  it 'should add elements to a sandbox'
    .dom.prepend('<em>test</em>').should_have_text 'test'
  end
  
  it 'should retain visibility within a sandbox'
    .dom.children('em').hide().should_be_hidden
    .dom.children('em').show().should_be_visible
  end
  
end

describe 'Async'

  it 'should load mah cookies (textfile)'
    $.post('async', function(text){
      text.should_eql 'cookies!'
    })
  end
  
  it 'should load mah cookies twice (ensure multiple async requests work)'
    $.post('async', function(text){
      text.should_eql 'cookies!'
    })
    $.post('async', function(text){
      text.should_not_eql 'rawr'
    })
  end
  
end

describe 'jQuery matchers'

  before_each
    html = '<p><label><em>Save?</em></label>        \
    <select class="save" style="display: none;">    \
    <option value="0">No</option>                   \
    <option value="1">Yes</option>                  \
    </select>                                       \
    <strong>test</strong>                           \
    <strong>test</strong>                           \
    </p>'
    .elem = $(html)
  end
  
  it 'should fail with pretty print of element'
    .elem.should_not_have_tag 'label'
  end
  
  it 'have_tag / have_one'
    .elem.should_have_tag('label')
    .elem.should_have_tag('em')
    .elem.should_have_one('label')
    .elem.should_not_have_tag('input')
  end
  
  it 'have_tags / have_many'
    .elem.should_have_tags('option')
    .elem.should_not_have_tags('label')
    .elem.should_have_many('option')
  end
  
  it 'have_child'
    .elem.should_have_child('label')
    .elem.should_not_have_child('em')
  end
  
  it 'have_children'
    .elem.should_have_children('strong')
    .elem.should_not_have_children('select')
  end
  
  it 'have_text'
    .elem.children('label').should_have_text('Save?')
  end
  
  it 'have_value'
    .elem.find('option').get(1).should_have_value('1')
  end
  
  it 'have_class'
    .elem.children('select').should_have_class('save')
  end
  
  it 'be_visible'
    .element('#jspec-report').should_be_visible
    '#jspec-report'.should_be_visible
    '<input style="visibility: hidden;"/>'.should_not_be_visible
    '<input style="display: none;"/>'.should_not_be_visible
    '<input />'.should_be_visible
  end
  
  it 'be_enabled'
    '<input type="button"/>'.should_be_enabled
    '<input type="button" disabled="disabled" />'.should_not_be_enabled
  end
  
  it 'be_disabled'
    '<input type="button"/>'.should_not_be_disabled
    '<input type="button" disabled="disabled" />'.should_be_disabled
  end
  
  it 'be_a_TYPE_input'
    '<input type="checkbox"/>'.should.be_a_checkbox_input
    '<input type="text"/>'.should.be_a_text_input
    '<input type="radio"/>'.should.be_a_radio_input
    '<input type="file"/>'.should.be_a_file_input
    '<input type="password"/>'.should.be_a_password_input
    '<input type="submit"/>'.should.be_a_submit_input
    '<input type="image"/>'.should.be_a_image_input
    '<input type="reset"/>'.should.be_a_reset_input
    '<input type="button"/>'.should.be_a_button_input
  end
  
  it 'be_hidden'
    .elem.children('select').should_be_hidden
  end
  
  it 'have_attr'
    elem = '<input type="button" title="some foo" value="Foo" />'
    elem.should_have_attr 'title'
    elem.should_have_attr 'title', 'some foo'
    elem.should_not_have_attr 'rawr'
    elem.should_not_have_attr 'some', 'rawr'
    elem.should_not_have_attr 'title', 'bar'
  end
  
end