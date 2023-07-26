// import ProductsAll from './components/ProductsAll.vue';
import ProductsList from './components/ProductsList'

import ProductSearch from './components/ProductSearch.vue';
import ProductCategory from './components/ProductCategory';
import ProductItem from './components/ProductItem.vue'

export default[
    {path: '/', component: ProductsList},
    {path: '/search', component: ProductSearch},
    {path: '/category', component: ProductCategory},
    {name:'product', path: '/product/:id', component: ProductItem, props: true}
]