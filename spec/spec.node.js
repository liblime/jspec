
__loading__ = []

readFile = function(path, callback) {
  __loading__.push(path)
  var promise = node.fs.cat(path, "utf8")
  promise.addErrback(function(){ throw "failed to read file `" + path + "'" })
  promise.addCallback(function(contents){
    setTimeout(function(){
      if (__loading__[0] == path) {
        puts("... loaded `" + __loading__.shift() + "'")
        callback(contents)
      }
      else
        setTimeout(arguments.callee, 100)
    }, 100)
  })  
}

load = function(path) {
  readFile(path, function(contents){
    eval(contents)
  })
}

load('lib/jspec.js')
load('spec/modules.js')
load('spec/spec.grammar-less.js')

setTimeout(function(){
  puts("... Parsing suites")
  JSpec
  .exec('spec/spec.grammar.js')
  .exec('spec/spec.js')
  .exec('spec/spec.matchers.js')
  .exec('spec/spec.utils.js')
  .exec('spec/spec.shared-behaviors.js')
  .exec('spec/spec.modules.js')
  setTimeout(function(){ 
    puts("... Evaluating specifications")
    JSpec.run({ formatter : JSpec.formatters.Terminal, failuresOnly : true })
    setTimeout(function() {
      puts("... Reporting")
      JSpec.report()
    }, 1500)
  }, 1500)
  
}, 1500)

