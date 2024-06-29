// __d(
//   "bind",
//   [],
//   function (a, b, c, d, e, f) {
//     function a(a, b) {
//       var c = Array.prototype.slice.call(arguments, 2);
//       if (typeof b !== "string")
//         return Function.prototype.bind.apply(b, [a].concat(c));
//       function d() {
//         var d = c.concat(Array.prototype.slice.call(arguments));
//         if (a[b]) return a[b].apply(a, d);
//       }
//       d.toString = function () {
//         return "bound lazily: " + a[b];
//       };
//       return d;
//     }
//     e.exports = a;
//   },
//   null
// );

function bind(context, method) {
  const args = Array.prototype.slice.call(arguments, 2);

  if (typeof method !== "string") {
    // If method is not a string, assume it's a function and bind it to context with additional arguments
    return Function.prototype.bind.apply(method, [context].concat(args));
  }

  // If method is a string, return a lazily bound function
  function boundFunction() {
    const boundArgs = args.concat(Array.prototype.slice.call(arguments));
    if (context[method]) {
      return context[method].apply(context, boundArgs);
    }
  }

  // Custom toString method for the bound function
  boundFunction.toString = function () {
    return `bound lazily: ${context[method]}`;
  };

  return boundFunction;
}

export default bind;
