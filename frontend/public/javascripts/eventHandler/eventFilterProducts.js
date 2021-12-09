import { getFiltersQuery } from "../data/queryUrl.js";
import { containerArtistFilter, containerGenreFilter, containerLabelFilter, displayProducts, clearContainer} from "../container/containerHelper.js"
import { containerProducts } from "../container/containerProducts.js"
import { getData, getProducts } from "../data/queryFetch.js";

export default function getProductsFilteredBy() {
    // Build Request for filtered products
    let sRequestProductsFiltered = getFiltersQuery();
  
    // Get values of selected filters
    let filterArtist = containerArtistFilter.options[containerArtistFilter.selectedIndex].value;
    let filterGenre = containerGenreFilter.options[containerGenreFilter.selectedIndex].value;
    let filterLabel = containerLabelFilter.options[containerLabelFilter.selectedIndex].value;
  
    // Check if there are any filters selected
    if (filterArtist || filterGenre || filterLabel) {
        let filters = []
        if (filterArtist) {
            filters.push("artist=" + filterArtist);
        };
        if (filterGenre) {
            filters.push("genre=" + filterGenre);
        };
        if (filterLabel) {
            filters.push("label=" + filterLabel);
        };
        sRequestProductsFiltered += filters.join("&");
        let promiseProducts = getData(sRequestProductsFiltered);
        
        clearContainer(containerProducts);
        displayProducts(promiseProducts);
    } else {
        // If no filters selected refresh the page
            clearContainer(containerProducts);
            displayProducts(getProducts());
    }
  };