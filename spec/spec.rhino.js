
load('lib/jspec.js')

JSpec
.exec('spec/spec.grammar.js')
.exec('spec/spec.grammar-less.js')
.exec('spec/spec.core.js')
.run({ formatter : JSpec.formatters.Terminal, failuresOnly : true })
.report()