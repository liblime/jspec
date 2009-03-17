  
// JSpec - Core - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

(function(){

  var JSpec = {
  
    version  : '0.8.0',
    main     : this,
    suites   : {},
    matchers : {},
    stats    : { specs : 0, assertions : 0, failures : 0, passes : 0 },
    options  : { profile : false },
  
    /**
     * Default context in which bodies are evaluated.
     * This allows specs and hooks to use the 'this' keyword in
     * order to store variables, as well as allowing the context
     * to provide helper methods or properties.
     *
     * Replace context simply by setting JSpec.context
     * to your own like below:
     *
     * JSpec.context = { foo : 'bar' }
     *
     * Contexts can be changed within any body, this can be useful
     * in order to provide specific helper methods to specific suites.
     *
     * To reset (usually in after hook) simply set to null like below:
     *
     * JSpec.context = null
     */
  
    defaultContext : {
      sandbox : function(name) {
        sandbox = document.createElement('div')
        sandbox.setAttribute('class', 'jspec-sandbox')
        document.body.appendChild(sandbox)
        return sandbox
      }
    },
  
    // --- Objects
  
    /**
     * Matcher.
     * 
     * There are many ways to define a matcher within JSpec. The first being
     * a string that is less than 4 characters long, which is considered a simple
     * binary operation between two expressions. For example the matcher '==' simply
     * evaluates to 'actual == expected'.
     *
     * The second way to create a matcher is with a larger string, which is evaluated,
     * and then returned such as 'actual.match(expected)'.
     *
     * You may alias simply by starting a string with 'alias', such as 'be' : 'alias eql'.
     *
     * Finally an object may be used, and must contain a 'match' method, which is passed
     * both the expected, and actual values. Optionally a 'message' method may be used to
     * specify a custom message. Example:
     *
     * match : function(actual, expected) {
     *   return typeof actual == expected
     * }
     *
     * @param  {string} name
     * @param  {hash, string} matcher
     * @param  {object} actual
     * @param  {array} expected
     * @param  {bool} negate
     * @return {Matcher}
     * @api private 
     */
  
    Matcher : function (name, matcher, actual, expected, negate) {
      self = this
      this.name = name
      this.message = ''
      this.passed = false
    
      // Define matchers from strings
    
      if (typeof matcher == 'string') {
        if (matcher.match(/^alias (\w+)/)) matcher = JSpec.matchers[matcher.match(/^alias (\w+)/)[1]]
        if (matcher.length < 4) body = 'actual ' + matcher + ' expected'
        else body = matcher
        matcher = { match : function(actual, expected) { return eval(body) } }
      }
    
      // Generate matcher message

      function generateMessage() {
        return 'expected ' + print(actual) + ' to ' + (negate ? ' not ' : '') + name.replace(/_/g, ' ') + ' ' + print(expected)
      }
    
      // Set message to matcher callback invocation or auto-generated message
    
      function setMessage() {
        if (typeof matcher.message == 'function')
          self.message = matcher.message(actual, expected, negate)
        else
          self.message = generateMessage()
      }
    
      // Pass the matcher

      function pass() {
        setMessage()
        JSpec.stats.passes += 1
        self.passed = true
      }
    
      // Fail the matcher

      function fail() {
        setMessage()
        JSpec.stats.failures += 1
      }
    
      // Return result of match

      this.match = function() {
        args = expected == null ? [] : expected
        args.unshift(actual == null ? null : actual.valueOf())
        return matcher.match.apply(JSpec, args)
      }
    
      // Boolean match result

      this.passes = function() {
        this.result = this.match()
        return negate? !this.result : this.result
      }
    
      // Performs match, and passes / fails the matcher

      this.exec = function() {
        this.passes() ? pass() : fail()
        return this
      }
    },
      

    formatters : {
      
      /**
       * Default formatter, outputting to the DOM.
       * 
       * Options:
       *   - reportToId  id of element to output reports to, defaults to 'jspec'
       *
       * @api public
       */

      DOM : function(results, options) {
        markup = ''
        id = options.reportToId || 'jspec'
        report = document.getElementById(id)
        
        if (!report) error('requires the element #' + id + ' to output its reports')

        markup += 
        '<div id="jspec-report"><div class="heading">                                   \
        <span class="passes">Passes: <em>' + results.stats.passes + '</em></span>       \
        <span class="failures">Failures: <em>' + results.stats.failures + '</em></span> \
        </div><table class="suites">'

        results.each(results.suites, function(description, suite){
          if (suite.ran) {
            markup += '<tr class="description"><td colspan="2">' + description + '</td></tr>'
            results.each(suite.specs, function(i, spec){
              markup += '<tr class="' + (i % 2 ? 'odd' : 'even') + '">'
              assertionCount = spec.assertions.length + ' assertion(s)'
              if (spec.requiresImplementation()) { 
                markup += '<td class="requires-implementation" colspan="2">' + spec.description + '</td>'
              }
              else if (spec.passed()) {
                markup += '<td class="pass">' + spec.description+ '</td><td>' + assertionCount + '</td>'
              }
              else {
                markup += '<td class="fail">' + spec.description + ' <em>' + spec.failure().message + '</em>' + '</td><td>' + assertionCount + '</td>' 
              }
              //markup += '<tr class="body hidden"><td>' + spec.body + '</td></tr>'
            })
            markup += '</tr>'
          }
        })

        markup += '</table></div>'

        report.innerHTML = markup
      },
      
      /**
       * Console formatter, tested with Firebug and Safari 4.
       * 
       * @api public
       */

      Console : function(results, options) {
        console.log('')
        console.log('Passes: ' + results.stats.passes + ' Failures: ' + results.stats.failures)
        results.each(results.suites, function(description, suite){
          if (suite.ran) {
            console.group(description)
            results.each(suite.specs, function(spec){
              assertionCount = spec.assertions.length + ':'
              if (spec.requiresImplementation()) { 
                console.warn(spec.description)
              }
              else if (spec.passed()) {
                console.log(assertionCount + ' ' + spec.description)
              }
              else {
                console.error(assertionCount + ' ' + spec.description + ', ' + spec.failure().message)
              }
            })
            console.groupEnd()
          }
        })
      }
    },
      
    /**
     * Specification Suite block object.
     *
     * @param {string} description
     * @api private
     */
       
    Suite : function(description) {
      this.specs = [], this.hooks = {}
      this.description = description, this.ran = false
    
      // Add a spec to the suite
    
      this.addSpec = function(spec) {
        this.specs.push(spec)
        spec.suite = this
      }
    
      // Invoke a hook in context to this suite
    
      this.hook = function(hook) {
        if (body = this.hooks[hook]) 
          JSpec.evalBody(body, "Error in hook '" + hook + "', suite '" + this.description + "': ")  
      }
    },
  
    /**
     * Specification block object.
     *
     * @param {string} description
     * @param {string} body
     * @api private
     */
  
    Spec : function(description, body) {
      this.body = body, this.description = description, this.assertions = []
    
      // Find first failing assertion
    
      this.failure = function() {
        var failure
        each(this.assertions, function(assertion){
          if (!assertion.passed && !failure) failure = assertion
        })
        return failure
      }
    
      // Weither or not the spec passed
        
      this.passed = function() {
        return !this.failure()
      }
    
      // Weither or not the spec requires implementation (no assertions)
    
      this.requiresImplementation = function() {
        return this.assertions.length == 0
      }
    },
  
    // --- Methods
  
    /**
     * Generates a hash of the object passed. 
     *
     * @param  {object} object
     * @return string
     * @api public
     */
  
    hash : function(object) {
      b = ''
      each(object, function(key ,value){
        if (value.constructor == Array || value.constructor == Object ) b += hash(value)
        else b += key.toString() + value.toString()
      })
      return b
    },
    
    /**
     * Return last element of an array.
     *
     * @param  {array} array
     * @return {object}
     * @api public
     */
    
    last : function(array) {
      return array[array.length - 1]
    },
    
    /**
     * Convert object to print-friend string.
     *
     * @param  {object} object
     * @return {string}
     * @api public
     */
  
    print : function(object) {
      if (object == undefined) return '' 
      else if (object == null) return 'null' 
      else if (object.jquery && object.selector.length > 0) return "selector '" + object.selector + "'"
      switch(object.constructor) {
        case Array:   return '[' + object + ']'; break
        case String:  return "'" + object + "'"; break
        default:      return object
      }
    },
  
    /**
     * Invoke a matcher. 
     *
     * this.match('test', 'should', 'be_a', [String)]
     * 
     * @param  {object} actual
     * @param  {bool, string} negate
     * @param  {string} name
     * @param  {array} expected
     * @return {bool}
     * @api public
     */
  
    match : function(actual, negate, name, expected) {
      if (typeof negate == 'string') negate = negate == 'should' ? false : true
      matcher = new this.Matcher(name, this.matchers[name], actual, [expected], negate)
      this.currentSpec.assertions.push(matcher.exec())
      return matcher.result
    },
  
    /**
     * Iterate an object, invoking the given callback.
     *
     * @param  {hash, array} object
     * @param  {function} callback
     * @return {JSpec}
     * @api private
     */
  
    each : function(object, callback) {
      for (key in object) {
        if (typeof object[key] == 'function') continue
        if (callback.length == 1)
          callback.call(JSpec, object[key])
        else
          callback.call(JSpec, key, object[key])
      }
      return JSpec
    },
  
    /**
     * Define matchers.
     *
     * @param  {hash} matchers
     * @return {JSpec}
     * @api public
     */
  
    addMatchers : function(matchers) {
      each(matchers, function(name, body){
        this.matchers[name] = body
      })
      return JSpec
    },
  
    /**
     * Evaluate a JSpec capture body.
     *
     * @param  {string} body
     * @param  {string} errorMessage (optional)
     * @return {Type}
     * @api private
     */
  
    evalBody : function(body, errorMessage) {
      try {
        runner = function() { eval(JSpec.preProcessBody(body)) }
        runner.call(this.context || this.defaultContext)
      } 
      catch(e) { error(errorMessage, e) }
    },
  
    /**
     * Pre-process capture body.
     *
     * - Allow optional parents like should_be_true
     * - Convert matchers to prevent pollution of core object prototypes
     *
     * @param  {string} body
     * @return {Type}
     * @api private
     */
  
    preProcessBody : function(body) {
      // Allow -{ closure literal
      body = body.replace('-{', 'function(){')
      // Allow inclusive range literal n..n
      body = body.replace(/(\d+)\.\.(\d+)/g, function(_, a, b){ return range(a, b) })
      // Allow . this. literal
      body = body.replace(/^ *\./gm, 'this.')
      // Allow optional parens for matchers
      body = body.replace(/\.should_(\w+)(?: |$)(.*)$/gm, '.should_$1($2)')
      // Convert to non-polluting match() invocation
      body = body.replace(/(.+?)\.(should(?:_not)?)_(\w+)\((.*)\)$/gm, 'JSpec.match($1, "$2", "$3", $4)')
      // Remove expected arg ', )' left when not set
      body = body.replace(/, \)$/gm, ')')
    
      return body
    },
    
    /**
     * Create a range.
     *
     * @param  {int} start
     * @param  {int} end
     * @return {array}
     * @api public
     */
    
    range : function(start, end) {
      s = parseInt(start), e = parseInt(end), b = '[' + s
      if (e > s) while (++s <= e) b += ',' + s
      else       while (--s >= e) b += ',' + s
      return b + ']'
    },
  
    /**
     * Parse a string.
     *
     * @param  {string} input
     * @return {JSpec}
     * @api private
     */
   
    parse : function(input) {
      var describing, specing, capturing, commenting
      var token, describe, spec, capture, body = []
      tokens = this.tokenize(input)
    
      while (tokens.length) {
        token = tokens.shift()
      
        if (commenting && token != "\n" && !specing && !capturing) continue
      
        switch (token) {
          case 'end':
            if (describing) this.suites[describe] = this.suites[describe] || new JSpec.Suite(describe)
            if (specing) {
              newSpec = new JSpec.Spec(spec, body.join(''))
              this.suites[describe].addSpec(newSpec)
              body = [], spec = specing = null
            }
            else if (capturing) {
              if (describing) this.suites[describe].hooks[capture] = body.join('')
              body = [], capturing = capture = null
            }
            else if (describing) {
              describing = describe = null
            }
            break
          
          case 'before': case 'after': case 'before_each': case 'after_each': capturing = true; break
          case "\n"       : commenting = false; break
          case '//'       : commenting = true;  break
          case 'describe' : describing = true;  break
          case 'it'       : specing = true;     break
          case '__END__'  : return this;        break
        }
      
        if (spec || capture) {
          body.push(token)
        }
        else {
          if (capturing) capture = token
          if (/'.*?'/.test(token)) {
            if (specing) spec = token.replace(/'/g, '')
            else if (describing) describe = token.replace(/'/g, '')
          }
        }
      }
    
      return this
    },
  
    /**
     * Tokenize a string.
     *
     * @param  {string} input
     * @return {array}
     * @api private
     */
  
    tokenize : function(input) {
      if (input.constructor == Array) return input
      regexp = /(?:__END__|end|before_each|after_each|before|after|it|describe|'.*?')(?= |\n|$)|\/\/|\n|./gm
      return input.match(regexp)
    },
  
    /**
     * Report on the results. Options are passed to formatter.
     *
     * @param  {hash} options
     * @return {JSpec}
     * @api public
     */
  
    report : function(options) {
      this.formatter ? new this.formatter(this, options || {}) 
                     : new this.formatters.DOM(this, options || {})
      return this
    },
  
    /**
     * Run the spec suites.
     *
     * @return {JSpec}
     * @api public
     */
  
    run : function() {
      suite = query('suite')
      if (this.options.profile) console.group('Profile')
      if (suite) this.runSuite(suite)
      else each(this.suites, function(suite) { this.runSuite(suite) })
      if (this.options.profile) console.groupEnd()
      return this
    },
  
    /**
     * Run a suite.
     *
     * @param  {Suite, string} suite
     * @return {JSpec}
     * @api public
     */
  
    runSuite : function(suite) {
      if (typeof suite == 'string') suite = this.suites[suite]
      suite.ran = true
      suite.hook('before')
      each(suite.specs, function(spec) {
        suite.hook('before_each')
        this.runSpec(spec)
        suite.hook('after_each')
      })
      suite.hook('after')
      return this
    },
  
    /**
     * Run a spec.
     *
     * @param  {Spec} spec
     * @api public
     */
  
    runSpec : function(spec) {
      this.currentSpec = spec
      this.stats.specs++
      if (this.options.profile) console.time(spec.description)
      this.evalBody(spec.body, "Error in spec '" + spec.description + "': ")
      if (this.options.profile) console.timeEnd(spec.description)
      this.stats.assertions += spec.assertions.length
    },
  
    /**
     * Require a dependency, with optional message.
     *
     * @param  {string} dependency
     * @param  {string} message (optional)
     * @api public
     */
  
    requires : function(dependency, message) {
      try { eval(dependency) }
      catch (e) { error('depends on ' + dependency + ' ' + (message || '')) }
    },
    
    /**
     * Query against the current query strings keys
     * or the query_string specified.
     *
     * @param  {string} key
     * @param  {string} query_string
     * @return {string, null}
     * @api public
     */
     
    query : function(key, query_string) {
      query_string = (query_string || window.location.search).substring(1)
      if (!query_string) return
      each(query_string.split('&'), function(pair){
        k = pair.split('=')[0], v = pair.split('=')[1]
        if (k == key) value = v.replace(/%20|\+/, ' ')
      })
      return value
    },
  
    /**
     * Throw a JSpec related error. Use when you wish to include
     * the current line number.
     *
     * @param  {string} message
     * @param  {Exception} error
     * @api public
     */
  
    error : function(message, error) {
      throw 'jspec: ' + message + (error ? error.message : '')
    },
  
    /**
     * Evaluate a string of JSpec.
     *
     * @param  {string} input
     * @return {JSpec}
     * @api public
     */
  
    eval : function(input) {
      return this.parse(input)
    },
  
    /**
     * Load a files contents.
     *
     * @param  {string} file
     * @return {string}
     * @api public
     */
  
    load : function(file) {
      if ('XMLHttpRequest' in this.main) {
        request = new XMLHttpRequest
        request.open('GET', file, false)
        request.send(null)
        if (request.readyState == 4)
          return request.responseText
      }
      else if ('load' in this.main) {
        // TODO: workaround for IO issue / preprocessing
        load(file)
      }
      else {
        error('cannot load ' + file)
      }
    },
  
    /**
     * Load and evaluate a file.
     *
     * @param {string} file
     * @param {JSpec}
     * @api public
     */
  
    exec : function(file) {
      return this.eval(this.load(file))
    }
  }
  
  // --- Utility functions
  
  last  = JSpec.last
  range = JSpec.range
  each  = JSpec.each
  error = JSpec.error
  print = JSpec.print
  hash  = JSpec.hash
  query = JSpec.query
  addMatchers = JSpec.addMatchers

  // --- Matchers

  addMatchers({
    be                 : "alias eql",
    equal              : "===",
    be_greater_than    : ">",
    be_less_than       : "<",
    be_at_least        : ">=",
    be_at_most         : "<=",
    be_a               : "actual.constructor == expected",
    be_an              : "alias be_a",
    be_null            : "actual == null",
    be_empty           : "actual.length == 0",
    be_true            : "actual == true",
    be_false           : "actual == false",
    be_type            : "typeof actual == expected",
    match              : "typeof actual == 'string' ? actual.match(expected) : false",
    respond_to         : "typeof actual[expected] == 'function'",
    have_length        : "actual.length == expected",
    be_within          : "actual >= expected[0] && actual <= last(expected)",
    have_length_within : "actual.length >= expected[0] && actual.length <= last(expected)",
  
    eql : { match : function(actual, expected) {
      if (actual.constructor == Array || actual.constructor == Object) return hash(actual) == hash(expected)
      else return actual == expected
    }},

    include : { match : function(actual, expected) {
      if (typeof actual == 'string') return actual.match(expected)
      else return expected in actual
    }},
  
    throw_error : { match : function(actual, expected) {
      try { actual() }
      catch (e) { return true }
    }}
  })
  
  // --- Expose

  this.JSpec = JSpec

})();
