import ProductsAll from './components/ProductsAll.vue';
import ProductSearch from './components/ProductSearch.vue';
import ProductCategory from './components/ProductCategory'

export default[
    {path: '/', component: ProductsAll},
    {path: '/search', component: ProductSearch},
    {path: '/category', component: ProductCategory}
]