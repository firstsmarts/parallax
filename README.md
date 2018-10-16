# How to eat

> photos album (based parallax.js & its ui)

## Config your photo first

Edit the photo.js to add your photos and some words you want to show.

/src/photo.js
```json
{
    "path": "/lxstatic/1.jpg",
    "words": "生活不止眼前的枸杞，还有诗和远方",
    "date": "dura"
}
```

You should edit the path above in this json with your real path after you add your photo to the `lxstatic` folder.

# Do remember this

/src/router/index.js
```js
import Vue from 'vue'
import Router from 'vue-router'
import lx from '@/components/lx'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/parallax',
  routes: [
    {
      path: '',
      name: 'parallax',
      component: lx
    }
  ]
})
```
*If your path is based `/`, you should remove the `base` kv, you can config the base url by config the `base` *


## Then you can build your own website by the follow 

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

*happy to eat it*
