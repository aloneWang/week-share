// 实现 add(4)(2,3)(10) ==> 20
function add () {
  var args = Array.prototype.slice.call(arguments);

  var fn = function () {
      var arg_fn = Array.prototype.slice.call(arguments);
      return add.apply(null, args.concat(arg_fn));
  }

  fn.valueOf = function () {
      return args.reduce(function(a, b) {
          return a + b;
      })
  }

  return fn;
}
add(4)(2, 3)(10) ;

