// Returns Query URL for backend
function getBackendQuery(type) {
    const baseBackendUrl = "http://127.0.0.1:8000/";
    
    const queries = {
        'products':'products/',
        'artists':'artists/',
        'genres':'genres/',
        'labels':'labels/',
        'basketitems':'basketitems/',
        'songs':'songs/',
        "user":"users/current/"
    };

    if (queries[type]) {
        if (type === 'songs') {
            return baseBackendUrl + queries[type] + "?";
        } else {
            return baseBackendUrl + queries[type];
        }
    } else if (type === 'filters') {
        return baseBackendUrl + queries.products + "?";
    };
};

export function getProductsQuery() {
    return getBackendQuery('products');
};
export function getProductQuery(productId) {
    return getFiltersQuery() + "id=" + String(productId);
};

export function getFiltersQuery() {
    return getBackendQuery('filters');
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

export function getBasketItemsQuery() {
    return getBackendQuery('basketitems');
};

export function getSongsQuery(product_id) {
    return getBackendQuery('songs') + "product_id=" + String(product_id);
};

export function getCurrentUserQuery() {
    return getBackendQuery("user");
};

export function getProductRedirectQuery(productId) {
    return "http://127.0.0.1:3000/product/?id=" + productId;
};