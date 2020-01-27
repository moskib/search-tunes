import http from '../../../core/services/httpService';
import config from '../../../config.json';

const endpoint = config.apiEndpoint + 'search';

const getSearchResults = term => {
  const options = {
    method: 'post',
    body: term,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  return http.post(endpoint, options);
};

export default {
  getSearchResults
};
