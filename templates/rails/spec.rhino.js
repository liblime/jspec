
load('JSPEC_ROOT/lib/jspec.js')

JSpec
.exec('spec/spec.application.js')
.run({ formatter : JSpec.formatters.Terminal })
.report()