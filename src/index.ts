import './scss/styles.scss';
import { Page } from './components/page';
import { EventEmitter } from './components/base/events';


const broker = new EventEmitter();



const page = new Page();