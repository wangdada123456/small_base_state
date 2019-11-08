import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Cookies from 'js-cookie'

router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.query.no_login && to.query.no_login == 1){
    // debugger
    Cookies.set('token', new Date().getTime(), {expires: 7})
    next();
    NProgress.done();
  } else {
    let token = Cookies.get('token');
    let userName = Cookies.get('userName');
    if (!token || token == '' || !userName || userName == '') {
      if (to.name !== 'login') {
        NProgress.done()
        return next({path: '/login'});
        
      }else {
        next();
        NProgress.done()
      }
    }else {
      if (to.name === 'login') {
        NProgress.done()
        return next({path: '/dashboard/home'});
      }
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
