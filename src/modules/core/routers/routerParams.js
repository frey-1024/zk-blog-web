import Loadable from 'react-loadable';
import Loading from '../components/Loading';
import securityRouter from '../../security/router/securityRouter';
// import recommendRouter from '../../recommend/router/recommendRouter';
// import editorRouter from '../../editor/router/editorRouter';

const params = [
  ...securityRouter,
  // ...recommendRouter,
  // ...editorRouter,
];

function loadComponent(routers) {
  routers.forEach((router) => {
    router.component = Loadable({
      loader: () => import(`../../${router.url}.js`),
      loading: Loading,
      delay: 300
    });
    if (router.children && router.children.length) {
      loadComponent(router.children);
    }
  });
}

loadComponent(params);

export default params;