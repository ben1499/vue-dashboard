// import ProductsAll from './components/ProductsAll.vue';
import ProductsList from './components/ProductsList'

import ProductSearch from './components/ProductSearch.vue';
import ProductCategory from './components/ProductCategory';
import ProductItem from './components/ProductItem.vue'
import EditModal from './components/EditModal.vue';
import AddProduct from './components/AddProduct.vue'
import LoginComp from './components/LoginComp.vue';

export default[
    {path: '/', component: ProductsList},
    {path: '/search', component: ProductSearch},
    {path: '/category', component: ProductCategory},
    {path: '/add', component: AddProduct},
    {path: '/login', component: LoginComp},
    {name:'product', path: '/product/:id', component: ProductItem, props: true},
    {name: 'edit', path: '/product/:id/edit', component: EditModal, props: true},
    
]