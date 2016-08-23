// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  // document.body, element.childNodes, and element.classList
  // var bodyChildren = document.body.childNodes;
  // var classArr = [];
  // var classStr = "";
  // var match = document.createDocumentFragment();

  // for (var i = 0; i < bodyChildren.length; i++) {
  // 	if (bodyChildren[i].nodeName === "DIV") {
  // 		for (var j = 0; j < Object.keys(bodyChildren[i].classList).length; j++) {
  // 			classArr.push(bodyChildren[i].classList[j]);
  // 		}
  // 		classStr = classArr.join(" ");
  // 		if (classStr === className) {
  // 			match.appendChild(bodyChildren[i]);
  // 		}
  // 	}
  // 	classStr = "";
  // }
  // return match;
  function helper(className, parent) {
  	var match = [];
  	var parentChildren;
  	if (_.contains(parent.classList, className)) {
  		match.push(parent);
  	}
  	if (parent.childNodes) {
  		for (var i = 0, len = parent.childNodes.length; i < len; i++) {
  			parentChildren = helper(className, parent.childNodes[i]);
  			match = match.concat(parentChildren);
  		}
  	}
  	return match;
  }
  return helper(className, document.body);
};
