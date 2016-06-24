'use strict';

import * as util from './fquery';

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


var attachPagination = function() {
  $(make('div', {"className": "pagination"}))(and)(appendTo(".page"))();
}

var attachSearch = function() {
  var container = $(make('div', {"className": "student-search"}))
                  (and)(appendTo('.page-header'))();

  var searchBox = $(make('input', {"placeholder": "Search for students...", "id": "search"}))
                  (and)(appendTo('.student-search'))();

  searchBox.addEventListener('keyup', pageEvent);
}

var makePage = function(query, page) {
  var first = (page - 1) * 10;
  var last = page * 10;

  var array = $$('.student-item')(then)(show)
              (then)(hide)
              (then)(find({'>0>1.innerHTML': query }))();

  then(array)('slice')(first, last)(then)(show)();

  createPageLinks(array, page);
}

var createPageLinks = function(array, active) {

  $(make('ul', {"className": "list"}))(and)(appendTo(".pagination"))();

  var totalPages = Math.ceil(array.length / 10);

  for(var i = 0; i < totalPages; i++) {

    var className = (active == i + 1) ? 'active' : '';
    var options = { "innerHTML": '<a class="' + className + '" href="#">' + (i + 1) + '</a>' };
    var pageLink = $(make('li', options))(and)(appendTo('.list'))();

    pageLink.addEventListener('click', pageEvent);
  }
}

var pageEvent = function(e) {
  e.preventDefault();

  $('.list')().remove();

  var page = (this.id == 'search') ? 1 : $(and)(this)(on('>0.innerHTML'))(getValue())();

  makePage(getQuery(), page);
}

var getQuery = function() {

  var query = (!$('#search')()) ? '' : $('#search')(and)(on('value'))(getValue())();

  return query.toLowerCase().trim();
}

var init = function() {

  attachPagination();
  attachSearch();
  makePage('', 1);
  
}

init();
