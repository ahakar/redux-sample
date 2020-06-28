
/// API URL Configurations

/// for production
let host = '/context-path/api';

/// for development
if ( __DEV__ ) {
  let DATA_HOST = '/api';
  // DATA_HOST = 'http://localhost:8080/context-path/api';
  // DATA_HOST = 'https://some-other-server.com/api';
  host = DATA_HOST;
}

/// end points
export default {
  ALL_ITEMS: `${host}/allItems`,

  CHECK_OUT: `${host}/check/out`,

  MORE_ITEMS: `${host}/moreItems`,
};
