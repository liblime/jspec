
load('JSPEC_ROOT/lib/jspec.js')
load('JSPEC_ROOT/lib/jspec.xhr.js')
load('public/javascripts/application.js')

JSpec
.exec('spec/spec.js')
.run({ formatter: JSpec.formatters.Terminal })
.report()