
// yields: use the function form of "use strict"
'use strict';

function fn() {
  return false;
}

// yields: 'module' is not defined
module.exports = fn;
