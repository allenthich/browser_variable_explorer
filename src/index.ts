import _ from 'lodash'
import './style.scss'
import './global'
import './app.module.scss'
import * as css from './app.module.scss'
import 'bootstrap'

const $ = require('jquery')
const log = console.log

function component() {
    const element = document.createElement('div');
    element.classList.add(css.red);

    element.innerHTML = _.join(['DEBUG from index.ts'], ' ');

    return element;
}

document.body.appendChild(component());

log($('#div1'))