
// JSpec - node - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

JSpec
.include({
  name: 'node',
  
  // --- Matchers
  
  matchers : {
    have_enumerable_property: 'actual.propertyIsEnumerable(expected)'
  }
})

