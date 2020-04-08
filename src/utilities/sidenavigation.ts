const $ = require('jquery')

export class SideNavigation {
    constructor () {
        this.attachListeners()
    }
    /* Set the width of the side navigation to 80% and the right margin of the page content to 80% */
    open() {
        $('#main-content').addClass('condensed')
        $('.sidenav').addClass('opened')
        $('.sidenav-bg-overlay').addClass('unhide')
    }
    
    /* Set the width of the side navigation to 0 and the right margin of the page content to 0 */
    close() {
        $('#main-content').removeClass('condensed')
        $('.sidenav').removeClass('opened')
        $('.sidenav-bg-overlay').removeClass('unhide')
    }
    
    attachListeners () {
        $(document).on('click', '.open-btn', this.open)
        $(document).on('click', '.close-btn, .sidenav-bg-overlay', this.close)
    }
}
