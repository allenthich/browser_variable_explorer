import _ from 'lodash'

const $ = require('jquery')
const log = console.log

export class WindowUtility {
    windowSorted: object;

    /**
     * Create a list item for the accordion
     * @param value 
     * @param index 
     */
    createAccordionItem (value: string, index: number) {
        const identifier: string = 'collapseEx' + index
        const headingId: string = 'headingEx' + index
        $('#accordionExample').append(`
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${identifier}" aria-expanded="false" aria-controls="${identifier}">
                        ${value}
                    </button>
                    </h2>
                </div>
            
                <div id="${identifier}" class="collapse" aria-labelledby="${headingId}" data-parent="#accordionExample">
                    <div class="card-body">
                        ${(window as any)[value]}
                    </div>
                </div>
            </div>
        `)
    }
    
    getGlobals () {
        log('Getting window variables')
        _.forEach(_.keys(window), this.createAccordionItem)
    }
}