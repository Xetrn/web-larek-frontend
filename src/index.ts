import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL } from './utils/constants';

const api = new Api(API_URL);
const events = new EventEmitter();
