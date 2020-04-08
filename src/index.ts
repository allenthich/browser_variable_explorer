import _ from 'lodash'
import './styles/style'
import './styles/global'
import './styles/app.module'
import 'bootstrap'
import './tests/test'
import { SideNavigation } from './utilities/sidenavigation'
import { WindowUtility } from './utilities/window'

const $ = require('jquery')
const log = console.log


$(document).ready(() => {
    log('window', window)
    let windowUtility = new WindowUtility()
    let sideNavigation = new SideNavigation()
    
    windowUtility.getGlobals()
})