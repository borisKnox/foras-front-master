import env from './development';
import env_prod from './production';

export default (process.env.NODE_ENV === 'development') ? env : env_prod;