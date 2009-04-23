
load('lib/jspec.js')
load('spec/spec.grammar-less.js')

JSpec
.exec('spec/spec.grammar.js')
.exec('spec/spec.core.js')
.run({ formatter : JSpec.formatters.Terminal, failuresOnly : false })
.report()