


/**
 * Install Plugins
 */

//install jqery
var jquery = require('jquery');
window.$ = window.Jquery = jquery;

// install bootstrap 

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css

/**
 * custom plugin 
 */

/** base filter */
import Filter from './plugin/filter/filter.min'

// init plugin by koutech
window._Filter = new Filter();
window.__RequestDomainTech = 'http://api-filter-v1.partialsta.com/api/books';


// install custom css 
import '../css/main'

// install prebuild js 
require('./build/FilterBook')