import _ from 'lodash'
import './styles/style'
import './styles/global'
import './styles/app.module'
import 'bootstrap'
import './tests/test'
import { SideNavigation } from './utilities/sidenavigation'
import { WindowUtil } from './utilities/window'

const $ = require('jquery')
const log = console.log


$(document).ready(() => {
    log('window', window)
    let windowUtil = new WindowUtil()
    let sideNavigation = new SideNavigation()
    
    windowUtil.update()
})