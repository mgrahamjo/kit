const oat = require('oat');

function init(vm) {

  vm.text = 'Hello, world.';

}

function render(vm) {

  return oat`<h1>${vm.text}</h1>`;

}

module.exports = oat.component('app', init, render);
