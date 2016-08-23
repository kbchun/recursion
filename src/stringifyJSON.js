// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (typeof obj === "string") {
  	return '"' + obj + '"';
  }
  else if (Array.isArray(obj)) {
    var result = "";
    for (var i = 0; i < obj.length; i++) {
      result += stringifyJSON(obj[i]);
      if (i !== obj.length - 1) {
        result += ",";
      }
    }
    return "[" + result + "]";
  }
  else if (typeof obj === "object" && obj) {
  	var result = "";
    var count = 0;
    var val;
    for (var key in obj) {
  	  if (obj[key] === undefined || typeof obj[key] === "function") {
	  	return "{}";
	  }
      val = stringifyJSON(obj[key]);
  	  result += stringifyJSON(key) + ":" + val;
  	  count++;
  	  if (count !== Object.keys(obj).length) {
  		result += ",";
  	  }
    }
    return "{" + result + "}";
  }
  else {
    return "" + obj;
  }
};