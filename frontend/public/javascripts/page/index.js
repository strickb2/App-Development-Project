// ------ Import Functions to load the index page ------
import { displayProducts } from '../container/containerHelper.js';
import { displayAllFilters } from '../container/containerHelper.js';
import { getProducts } from '../data/queryFetch.js';

function init() {
  displayAllFilters();
  displayProducts(getProducts());
};

init();