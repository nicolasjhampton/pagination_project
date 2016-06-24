webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _fquery = __webpack_require__(1);
	
	var util = _interopRequireWildcard(_fquery);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var extend = util.extend;
	var $ = util.$;
	var and = util.and;
	var on = util.on;
	var make = util.make;
	var getValue = util.getValue;
	var setValue = util.setValue;
	var appendTo = util.appendTo;
	var $$ = util.$$;
	var then = util.then;
	var hide = util.hide;
	var show = util.show;
	var set = util.set;
	var match = util.match;
	var find = util.find;
	
	var attachPagination = function attachPagination() {
	  $(make('div', { "className": "pagination" }))(and)(appendTo(".page"))();
	};
	
	var attachSearch = function attachSearch() {
	  var container = $(make('div', { "className": "student-search" }))(and)(appendTo('.page-header'))();
	
	  var searchBox = $(make('input', { "placeholder": "Search for students...", "id": "search" }))(and)(appendTo('.student-search'))();
	
	  searchBox.addEventListener('keyup', pageEvent);
	};
	
	var makePage = function makePage(query, page) {
	  var first = (page - 1) * 10;
	  var last = page * 10;
	
	  var array = $$('.student-item')(then)(show)(then)(hide)(then)(find({ '>0>1.innerHTML': query }))();
	
	  then(array)('slice')(first, last)(then)(show)();
	
	  createPageLinks(array, page);
	};
	
	var createPageLinks = function createPageLinks(array, active) {
	  $(make('ul', { "className": "list" }))(and)(appendTo(".pagination"))();
	  var totalPages = Math.ceil(array.length / 10);
	  for (var i = 0; i < totalPages; i++) {
	    var className = active == i + 1 ? 'active' : '';
	    var options = { "innerHTML": '<a class="' + className + '" href="#">' + (i + 1) + '</a>' };
	    var pageLink = $(make('li', options))(and)(appendTo('.list'))();
	    pageLink.addEventListener('click', pageEvent);
	  }
	};
	
	var pageEvent = function pageEvent(e) {
	  e.preventDefault();
	  $('.list')().remove();
	  var page = this.id == 'search' ? 1 : $(and)(this)(on('>0.innerHTML'))(getValue())();
	  makePage(getQuery(), page);
	};
	
	var getQuery = function getQuery() {
	  var query = !$('#search')() ? '' : $('#search')(and)(on('value'))(getValue())();
	  return query.toLowerCase().trim();
	};
	
	var init = function init() {
	  attachPagination();
	  attachSearch();
	  makePage('', 1);
	};
	
	init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 *  @file fQuery
	 *  @copyright Nicolas James Hampton 2016
	 *  @author Nicolas James Hampton <nicolasjhampton@gmail.com>
	 *  @version 1.0.0
	 *  @summary A DOM manipulation microlibrary based on functional programming
	 *
	 */
	
	/**
	 *  @license MIT
	 *  MIT License
	 *  Copyright (c) 2016 Nicolas James Hampton
	 *
	 *  Permission is hereby granted, free of charge, to any person obtaining a
	 *  copy of this software and associated documentation files (the "Software"),
	 *  to deal in the Software without restriction, including without limitation
	 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
	 *  and/or sell copies of the Software, and to permit persons to whom the
	 *  Software is furnished to do so, subject to the following conditions:
	 *
	 *  The above copyright notice and this permission notice shall be included
	 *  in all copies or substantial portions of the Software.
	 *
	 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	 *  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	 *  IN THE SOFTWARE.
	 */
	
	/**
	 * description goes here
	 * @summary Combines several objects into one new object
	 * @param {...Object} var_args - The first object to extend, followed by each object to extend it with
	 * @returns {Object} A brand new object made from all the extended object parameters
	 *
	 */
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function extend() /* arguments */{
	  var argsIn = [].concat(Array.prototype.slice.call(arguments));
	  var out = argsIn.reduce(function (obj1, obj2) {
	    for (var key in obj2) {
	      obj1[key] = _typeof(obj2[key]) === 'object' && !Array.isArray(obj2[key]) ? extend(obj2[key]) : obj2[key];
	    }
	    return obj1;
	  }, {});
	  return out;
	}
	
	/**
	 * description goes here
	 * @summary Returns the type of the object passed in
	 * @param {*} object - The object whose type is unknown
	 * @returns {string} A lowercase string representation of the type of the object
	 *
	 */
	function whatIsThis(object) {
	  var func = {}.toString;
	  var type = func.call(object);
	  return type.match(/\[object\s([\w]+)\]/i)[1].toLowerCase().trim();
	}
	
	/**
	 * Creates a function to validate a value based on a list of predicates
	 * passed into it.
	 * @class
	 * @summary Creates a custom validation function
	 * @param {...validator~predicate} var_arg - A list of predicate functions
	 * @returns {function} A lowercase string representation of the type of the object
	 *
	 */
	function validator() /* predicate functions */{
	  var bools = [].concat(Array.prototype.slice.call(arguments));
	  return function (value) {
	    return bools.reduce(function (first, next) {
	      return first && next(value);
	    }, true);
	  };
	}
	
	/**
	 * @callback validator~predicate
	 * @param {*} value to be tested
	 * @returns {boolean} whether the value passed the test
	 */
	
	/**
	 * Predicate function for the validator creator to test if a
	 * value is a string or not.
	 * @type {validator~predicate}
	 * @summary tests whether value is of string type
	 * @param {*} object - The object being tested
	 * @returns {boolean} whether the value is a string
	 *
	 */
	function isString(value) {
	  return typeof value === 'string';
	}
	
	/**
	 * Predicate function for the validator creator to test
	 * if the string says 'set'.
	 * @type {validator~predicate}
	 * @summary tests if the string says 'set'
	 * @param {*} object - The object being tested
	 * @returns {boolean} whether the value is a string that says 'set'
	 *
	 */
	function isSetter(value) {
	  return value == 'set';
	}
	
	/**
	 * @typedef PropertyArray
	 * @type {string[]}
	 * @description An two value array that represents a property key and it's value.
	 */
	
	/**
	 * Converts an object into an array of key/value pair arrays. For use in fquery
	 * to define sets of property values to be changed.
	 * @summary Converts an object into an array of key/value pair arrays.
	 * @param {Object} object - The object to be converted
	 * @returns {Array.PropertyArray} -  An array of key/value arrays.
	 *
	 */
	function objToArr(obj) {
	  var out = [];
	  for (var key in obj) {
	    out.push([key, obj[key]]);
	  }
	  return out;
	}
	
	/**
	 * A function to chain the end of fQuery functions. If the parameters are
	 * empty, the returned value is returned. If a parameter is given, that parameter
	 * is ran with the continued value given as a parameter.
	 * @summary A function to chain together the end of fQuery statements.
	 * @param {Object} returnedValue - What is returned if this is the end of the
	 *                                 statement chain.
	 * @param {Object} continuedValue - The parameter given to the next function
	 *                                  if a next function is given.
	 * @returns {Object|Function} -  Either the final value of the chain, or
	 *                               the returned function of the next function.
	 *
	 */
	function continueOrEnd(returnedValue, continuedValue) {
	  return function () /* empty or conjunction */{
	    return arguments.length == 0 ? returnedValue : arguments[0](continuedValue);
	  };
	}
	
	/**
	 * Creates a function to test for property aliases used in the fQuery selector
	 * function (@see on).
	 * @class
	 * @summary Creates a property aliasing test
	 * @param {...selectorValidator~aliasPredicate} var_arg - A list of predicate functions
	 * @returns {function} A lowercase string representation of the type of the object
	 *
	 */
	function selectorValidator() /* predicate functions */{
	  var bools = [].concat(Array.prototype.slice.call(arguments));
	  return function (value) {
	    return bools.reduce(function (first, next) {
	      var current = next(value);
	      return current.test ? current : first;
	    }, { "test": false, "alias": "" });
	  };
	}
	
	/**
	 * Predicate function for the selector validator to test if a
	 * property value should be aliased.
	 * @callback selectorValidator~aliasPredicate
	 * @param {string} value - the property key to be tested
	 * @returns {Object} aliasObject - An alias test result object
	 * @returns {boolean} aliasObject.test - Whether the alias should or should
	 *                                       not be used
	 * @returns {string} aliasObject.alias - String to replace value if alias is to
	 *                                       be used.
	 *
	 */
	
	/**
	 * @typedef {object} selectorValidator~aliasObject
	 * @description An object to be used to decide whether a property should be
	 *              aliased, and how.
	 * @property {boolean} aliasObject.test - whether the alias should be used
	 * @property {string} aliasObject.alias - the alias to be used
	 *
	 */
	
	/**
	 * Style property alias predicate function
	 * @type {selectorValidator~aliasPredicate}
	 * @summary aliases all style properties with "."
	 * @param {string} value - The property key being tested
	 * @returns {selectorValidator~aliasObject}
	 *
	 */
	function styleAlias(value) {
	  return { "test": /^\./.test(value), "alias": "style" + value };
	}
	
	/**
	 * Children property alias predicate function
	 * @type {selectorValidator~aliasPredicate}
	 * @summary aliases all style properties with ">"
	 * @param {string} value - The property key being tested
	 * @returns {selectorValidator~aliasObject}
	 *
	 */
	function childAlias(value) {
	  return { "test": />/.test(value), "alias": value.replace(/>/gi, '.children.') };
	}
	
	/**
	 * Single selections
	 *
	 * conjunctions take elements and return elements
	 * property verbs take an element and a property array and return a property value
	 * element verbs take an element and return an element
	 * property nouns take a property name and return a request for a property verb
	 *
	 * @example: $(make('input',{}))
	 *           (and)(on('.backgroundColor'))(setVal('red'))
	 *           (and)(on('.width'))(setVal('100%'))
	 *           (and)(appendTo('.page-header'))
	 *           (and)(on('.width'))(setVal('50%'))()
	 *
	 * $(make('input',{}))(and)(on('.backgroundColor'))(setValue('red'))(and)(on('.width'))(setValue('100%'))(and)(appendTo('.page-header'))(and)(on('.width'))(setValue('50%'))();
	 * $('.page-header')(grab)('.backgroundColor')(setVal('blue'))(and)('.height')(setVal('200px'))();
	 *
	 */
	
	// and(element)(property noun())(property verb())(and)(property noun())(property verb())();
	
	// make(tagName, baseProps)(and)(property noun())(property verb())(and)(property noun())(property verb())();
	
	// $(and)(element)(property noun())(property verb())(and)(property noun())(property verb())();
	// $(make(tagName, baseProps))(and)(property noun())(property verb())(and)(property noun())(property verb())();
	// $(selector)(and)(property noun())(property verb())(and)(property noun())(property verb())();
	
	//
	// $(and)(element)(on('.backgroundColor'))(setValue('red'))(and)(on('.width'))(setValue('50%'))();
	// $(make('input',{}))(and)(on('.backgroundColor'))(setValue('red'))(and)(on('.width'))(setValue('100%'))(and)(appendTo('.page-header'))(and)(on('.width'))(setValue('50%'))();
	
	/**
	 * Starting function for modifying a single DOM element
	 * @class
	 * @summary starts a fQuery chain for a singular element
	 * @param {string|startingFunction} selector - Either a selector string for a DOM
	 *                                             element, or a startingFunction for
	 *                                             the chain.
	 * @returns {function} A function that will request the next parameter. If a
	 *                     selector string or {starterFunction} was passed as a
	 *                     parameter, then a {conjunction} is requested. If a conjunction
	 *                     was passed, then an {Element} object is requested.
	 *
	 */
	function $(selector) {
	  if (typeof selector == 'string') {
	    var element = document.querySelector(selector);
	    return continueOrEnd(element, element);
	  }
	  return selector; //if make is put inside of the function
	}
	
	/**
	 * Function fed to the end of a series of operations on a single element to
	 * execute another series of functions on the same element.
	 * @callback $~conjunction
	 * @summary connects one series of operations on an element with the next.
	 * @param {Element} element - A pure DOM element, usually passed from the previous
	 *                            action in the chain.
	 * @returns {function} actionRequest - A function that requests the next series
	 *                                     of actions to be taken.
	 *
	 */
	function and(element) {
	  return function actionRequest(verbOrNoun) {
	    if (typeof verbOrNoun == 'function') {
	      /* accounts for element verbs: hide and show */
	      var verb = verbOrNoun;
	      return continueOrEnd(verb(element), verb(element));
	    } else {
	      /* accounts for property nouns: on */
	      var propNounArray = verbOrNoun;
	      return function (func) {
	        /* requests a property verb: setVal, getVal */
	        var target = func(element, propNounArray);
	        return continueOrEnd(target, element);
	      };
	    }
	  };
	}
	
	/**
	 * Creates an element to start a chain of operations on.
	 * @callback $~starterFunction
	 * @param {string} tag - the tag name for the new element
	 * @param {object} obj - An object of property names and valiues for the
	 *                       starting property values for the new element.
	 * @returns {function} a request for a conjunction to start a chain of operations, 
	 *                     or the element itself in a blank function wrapper.
	 *
	 */
	function make(tag, obj) {
	  var rawElement = document.createElement(tag);
	  var element = set(obj)(rawElement);
	  return continueOrEnd(element, element);
	}
	
	function propWrapper() /* engine, predicate functions */{
	  var engine = arguments[0];
	  var tests = [].concat(Array.prototype.slice.call(arguments)).slice(1);
	  var selectorTest = selectorValidator.apply(undefined, _toConsumableArray(tests));
	  return function (property) {
	    var alias = selectorTest(property);
	    return alias.test ? engine(alias.alias) : engine(property);
	  };
	}
	
	function prop(property) {
	  return property.split('.').filter(function (key) {
	    return key !== "";
	  });
	}
	
	var on = propWrapper(prop, styleAlias, childAlias);
	
	function getValue() {
	  return function (elementSelected, array) {
	    return array.reduce(function (first, second) {
	      return first[second];
	    }, elementSelected); // returns property value
	  };
	}
	
	function setValue(value) {
	  return function (elementSelected, array) {
	    var keyTest = validator(isString);
	    return array.reduce(function (first, second) {
	      return keyTest(first[second]) ? first[second] = value : first[second];
	    }, elementSelected); // returns property value
	  };
	}
	
	function appendTo(selector) {
	  var parent = document.querySelector(selector);
	  return function (element) {
	    parent.appendChild(element);
	    return element;
	  };
	}
	
	/**
	 * Group selections
	 * @example: $$('.student-item')
	 *             (then)(set({'.backgroundColor':'blue'}))
	 *             (then)(find({'>0>1.innerHTML': 's'}))
	 *             (then)(set({'className':'student-item cf match'}))
	 *             (then)(set({'.backgroundColor':'orange'}))
	 *             (then)('slice')(0,10)
	 *             (then)(set({'.backgroundColor':'red'}))();
	 *
	 * $$('.student-item')(then)(hide)(then)('slice')(0,10)(then)(show)(then)(find({">0>1.innerHTML": "s"}))(then)(set({".backgroundColor": "blue"}))()
	 * $$('.student-item')(then)(hide)(then)(find({'>0>1.innerHTML': 's'}))(then)('slice')(10,20)(then)(show)();
	 * $$('.student-item')(then)(set({'.display':'none'}))(then)(find({'children.0.children.1.innerHTML': 's'}))(then)('slice')(10,20)(then)(set({'.display':'list-item'}))();
	 * $$('.student-item')(then)(set({'.display':'none'}))(then)(find({'children.0.children.1.innerHTML': 's'}))(then)(set({'className':'student-item cf match'}))(then)('slice')(10,20)(then)(set({'.display':'list-item'}))();
	 * $$('.student-item')(then)(set({'.display':'none'}))(then)(find({'children.0.children.1.innerHTML': 's'}))(then)(set({'className':'student-item cf match'}))(then)('slice')(0,10)(then)(set({'.display':'list-item'}))();
	 * $$('.student-item')(then)(set({'.backgroundColor':'blue'}))(then)(find({'children.0.children.1.innerHTML': 's'}))(then)(set({'className':'student-item cf match'}))(then)(set({'.backgroundColor':'orange'}))(then)('slice')(0,10)(then)(set({'.backgroundColor':'red'}))();
	 */
	
	function $$(tag) {
	  var elements = document.querySelectorAll(tag);
	  var elementArray = Array.from(elements);
	  return continueOrEnd(elementArray, elementArray);
	}
	
	function then(array) {
	  return function (action) {
	    if (typeof action == 'string') {
	      /* native array methods given as strings */
	      return function nativeMethod() /* args for native array function */{
	        var args = Array.from(arguments);
	        var transform = array[action].apply(array, args);
	        return continueOrEnd(transform, transform);
	      };
	    } else if (action.name !== '') {
	      /* else action is one of the custom func's: get, set, find, hide, or show */
	      var method = 'map';
	      method = action.name == 'm' || action.name == 'f' ? 'filter' : method;
	      var transform = array[method].call(array, action);
	      return continueOrEnd(transform, transform);
	    } else {
	      /* one of the functions from the underscore.js library */
	      return function underscore() /* args for underscore function */{
	        var args = [array].concat(Array.from(arguments));
	        var transform = action.apply(null, args);
	        return continueOrEnd(transform, transform);
	      };
	    }
	  };
	}
	
	function actionMaker(action) {
	  return function (object) {
	    var propArray = objToArr(object);
	    return action.call(null, propArray);
	  };
	}
	
	function matchIt(propArray) {
	  return function m(element) {
	    return propArray.every(function (property) {
	      return $(and)(element)(on(property[0]))(getValue())() == property[1];
	    });
	  };
	}
	
	function setIt(propArray) {
	  return function s(element) {
	    propArray.map(function (property) {
	      $(and)(element)(on(property[0]))(setValue(property[1]))();
	    });
	    return element;
	  };
	}
	
	function findIt(propArray) {
	  return function f(element) {
	    return propArray.some(function (property) {
	      return $(and)(element)(on(property[0]))(getValue())().includes(property[1]);
	    });
	  };
	}
	
	function hide(element) {
	  element.style.opacity = '0';
	  element.$$$display = getComputedStyle(element).display;
	  element.style.display = "none";
	  return element;
	}
	
	function show(element) {
	  element.style.opacity = '1';
	  element.style.display = element.$$$display ? element.$$$display : "";
	  delete element.$$$display;
	  return element;
	}
	
	var match = actionMaker(matchIt);
	var find = actionMaker(findIt);
	var set = actionMaker(setIt);
	
	module.exports.$ = $;
	module.exports.and = and;
	module.exports.on = on;
	module.exports.make = make;
	module.exports.getValue = getValue;
	module.exports.setValue = setValue;
	module.exports.appendTo = appendTo;
	module.exports.$$ = $$;
	module.exports.then = then;
	module.exports.hide = hide;
	module.exports.show = show;
	module.exports.set = set;
	module.exports.match = match;
	module.exports.find = find;

/***/ }
]);
//# sourceMappingURL=app.map.js