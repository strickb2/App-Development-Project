// Returns Query URL for backend
function getBackendQuery(type) {
    const baseBackendUrl = "http://127.0.0.1:8000/";
    
    const queries = {
        'products':'products/',
        'artists':'artists/',
        'genres':'genres/',
        'labels':'labels/',
        'basketitems':'basketitems/'
    };

    if (queries[type]) {
        return baseBackendUrl + queries[type]
    } else if (type === 'filters') {
        return baseBackendUrl + queries.products + "?"
    };
};

export function getProductsQuery() {
    return getBackendQuery('products');
};
export function getProductQuery(productId) {
    return getFiltersQuery() + "id=" + String(productId);
};

export function getArtistsQuery() {
    return getBackendQuery('artists');
};

export function getGenresQuery() {
    return getBackendQuery('genres');
};

export function getLabelsQuery() {
    return getBackendQuery('labels');
};

export function getFiltersQuery() {
    return getBackendQuery('filters');
};

export function getBasketItemsQuery() {
    return getBackendQuery('basketitems');
};

function getFrontendQuery(type) {
    const baseFrontendUrl = "http://127.0.0.1:3000/";
    const queries = {
        "product":"product/?id=",
        "login":"login/",
        "signup":"signup/",
    }
    if (queries[type]) {
        return baseFrontendUrl + queries[type]
    }
};

export function getProductRedirectQuery(productId) {
    return getFrontendQuery('product') + productId;
}