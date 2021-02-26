import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/**FIRESTORE */
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)



/**VUE-ROUTER */

import VueRouter from 'vue-router'
Vue.use(VueRouter)

/*BOOTSTRAP*/ 
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/**FOOTER */
import Footer from './components/Footer.vue'
Vue.component(Footer);

/*NOTAS */
import nota from './components/nota.vue'
Vue.component(nota);



const routes = [
  { path: '/Footer/:numero', component: Footer },
  { path: '/nota', component: nota }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
