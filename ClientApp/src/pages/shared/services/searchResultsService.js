import http from '../../../core/services/httpService';
import config from '../../../config.json';
import {
  faGuitar,
  faTicketAlt,
  faBook,
  faRecordVinyl,
  faRunning,
  faBookOpen,
  faVideo,
  faFilePdf,
  faPodcast,
  faMicrophone,
  faDesktop,
  faTv,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import auth from '../../../core/services/authService';

const endpoint = config.apiEndpoint + 'search';
const headers = {
  'Content-Type': 'application/json; charset=utf-8'
};

const getSearchResults = term => {
  const options = {
    method: 'post',
    body: term,
    headers
  };

  return http.post(endpoint, options);
};

const getSearchResult = id => {
  const options = {
    method: 'get',
    headers
  };

  return http.get(`${endpoint}/${id}`, options);
};

const getIconByKind = kind => {
  switch (kind) {
    case 'book':
      return faBook;
    case 'album':
      return faRecordVinyl;
    case 'coached-audio':
      return faRunning;
    case 'feature-movie':
      return faTicketAlt;
    case 'interactive- booklet':
      return faBookOpen;
    case 'music-video':
      return faVideo;
    case 'pdf':
      return faFilePdf;
    case 'podcast':
      return faPodcast;
    case 'podcast-episode':
      return faMicrophone;
    case 'software-package':
      return faDesktop;
    case 'song':
      return faGuitar;
    case 'tv-episode':
      return faTv;
    default:
      return faTimesCircle;
  }
};

const submitSearchForUser = term => {
  const options = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${auth.getJwt()}`
    }
  };

  http.post(`${endpoint}/submit-search`, { searchTerm: term }, options);
};

const getTopSearches = () => {
  const options = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${auth.getJwt()}`
    }
  };

  return http.get(`${endpoint}/top-searches`, options);
};

export default {
  getSearchResults,
  getSearchResult,
  getIconByKind,
  submitSearchForUser,
  getTopSearches
};
