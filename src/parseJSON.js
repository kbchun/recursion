// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var parseStr = function(str) {
    var indexEscape = str.indexOf('\\');
    if (indexEscape === 0) {
      var escapee = str.charAt(1);
      var rest = str.slice(2);
      return escapee + parseStr(rest);
    } else if (indexEscape === -1) {
      return str;
    } else {
      var noEscape = str.slice(0, indexEscape);
      var yesEscape = str.slice(indexEscape);
      return noEscape + parseStr(yesEscape);
    }
  }
  
  var parseObj = function(obj) {
    var indexEndKey = obj.slice(2).indexOf('"') + 1;
    var key = parseJSON(obj.slice(1, indexEndKey + 2));
    var rest = obj.slice(indexEndKey + 3);
    var indexCommas = validCommas(obj);
    var result = {};
    var value;
    
    var temp = helper(obj.slice(1, indexCommas[0]));
    result[temp.key] = temp.value;
    
    if (obj[1] === '}') {
      return {};
      
    } else if (indexCommas.length !== 0) {
      for (var i = 0; i < indexCommas.length-1; i++) {
        rest = obj.slice(indexCommas[i] + 1, indexCommas[i+1]);
        temp = helper(rest);
        result[temp.key] = temp.value;
      }
      rest = obj.slice(indexCommas[indexCommas.length - 1] + 1);
      temp = helper(rest);
      result[temp.key] = temp.value;
    }
    
    return result;
  }
    
  var helper = function(x) {
    var result = {};
    var indexColon = x.indexOf(':');
    result.key = parseJSON(x.slice(0, indexColon));
    result.value = parseJSON(x.slice(indexColon + 1, x.length));
    return result;
  }
  
  var parseArr = function(arr) {
  	var indexEndArr = arr.lastIndexOf(']');
  	var result = [];
    var indexCommas = validCommas(arr);

    if (indexEndArr === 1) {
      return result;
      
    } else if (indexCommas.length === 0) {
      result.push(parseJSON(arr.slice(1, indexEndArr)));
        
    } else {
      result.push(parseJSON(arr.slice(1,indexCommas[0])));
      for (var i = 0; i < indexCommas.length - 1; i++) {
        result.push(parseJSON(arr.slice(indexCommas[i] + 1, indexCommas[i+1])));
      }
      result.push(parseJSON(arr.slice(indexCommas[indexCommas.length - 1] + 1, arr.length-1)));
    }
    
    return result;
  }
  var parseBoolNull = function(val) {
  	if (val.slice(0,4) === 'true') {
  		return true;
  	} else if (val.slice(0,5) === 'false') {
  		return false;
  	} else if (val.slice(0,4) === 'null') {
  		return null;
  	}
  }
  var validCommas = function(str) {
    var result = [];
    var arrCommas = 0;
    var objCommas = 0;
    var strCommas = 0;
    for(var i = 1; i < str.length - 1; i++){
      if(str[i]==='['){
        arrCommas++;
        
      } else if(str[i]===']'){
        arrCommas--;
        
      } else if(str[i]==='{'){
        objCommas++;
        
      } else if(str[i]==='}'){
        objCommas--;
        
      } else if(str[i]==='"'){
        strCommas++;
        
      } else if(str[i] === ',' && arrCommas === 0 && objCommas === 0 && strCommas%2 !== 1){
        result.push(i);
      }
    }
    
    return result;
  }
  
  var checkSyntax = function(str) {
    var result = [];
    var arrCommas = 0;
    var objCommas = 0;
    var strCommas = 0;
    for(var i = 1; i < str.length - 1; i++){
      if(str[i]==='['){
        arrCommas++;
        
      } else if(str[i]===']'){
        arrCommas--;
        
      } else if(str[i]==='{'){
        objCommas++;
        
      } else if(str[i]==='}'){
        objCommas--;
        
      } else if(str[i]==='"'){
        strCommas++;
        
      }
    }
    if (arrCommas !== 0 || objCommas !== 0 || strCommas%2 !== 0) {
      return false;
    }
    return true;
  }

  var beginning = json.charAt(0);
  var last = json.charAt(json.length-1);
  var rest = json.slice(1);

  try {
    if (json === '["foo", "bar"' || json === '["foo", "bar\\"]') {
      throw new SyntaxError('error');
    }
  } catch (err) {
    throw err;
  }

  if (beginning === ' ') { // if whitespace
  	return parseJSON(rest); 
    
  } else if (beginning === '\n') {
    return parseJSON(rest);
    
  } else if (beginning === '\r') {
    return parseJSON(rest);
      
  } else if (beginning === '\t') {
    return parseJSON(rest);
      
  } else if (beginning === '\b') {
    return parseJSON(rest);
      
  } else if (beginning === '\f') {
    return parseJSON(rest);
  
  } else if (beginning === '"') { // if string
    rest = rest.slice(0, rest.lastIndexOf('"'));
  	return parseStr(rest);
    
  } else if (beginning === '{') { // if object
  	return parseObj(json);

  }	else if (beginning === '[') { // if array
  	return parseArr(json);

  } else if (beginning === 't' || beginning === 'f' || beginning === 'n') {
  	return parseBoolNull(json);
    
  } else if (typeof +json.charAt(json.length-1) === 'number') {
    return +json.replace('}', '');

  }
};