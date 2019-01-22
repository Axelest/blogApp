import HomeComponent from '../components/home';
import PostComponent from '../components/post';
import EditComponent from '../components/edit';
import CreateComponent from '../components/add';
import AllComponent from '../components/all';

export const routes = [
     {
          path: '/',
          component: HomeComponent
     }, {
          path: '/all',
          component: AllComponent
     }, {
          path: '/posts/:id',
          component: PostComponent
     }, {
          path: '/edit/:id',
          component: EditComponent
     }, {
          path: '/create',
          component: CreateComponent
     }
];