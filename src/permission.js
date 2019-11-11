import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Cookies from 'js-cookie'

router.beforeEach((to, from, next) => {
  NProgress.start()
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
      return next({path: '/'});
    }
    next();
  };
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
