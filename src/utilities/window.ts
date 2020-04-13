import _ from 'lodash'
const util = require('util')
const {parse, stringify} = require('flatted');
window.fparse = parse
window.stringify = stringify

const $ = require('jquery')
const log = console.log

export class WindowUtil {
    windowSorted: object;
    windowKeysSorted: Array<string>;
    constructor () {
        this.windowSorted = {}
        this.windowKeysSorted = []
    }

    /**
     * Create a list item for the accordion
     * @param key 
     * @param index 
     */
    createAccordionItem = (key: string, index: number) => {
        log(key, index)
        const identifier: string = 'collapseEx' + index
        const headingId: string = 'headingEx' + index

        if (_.get(this.windowSorted, key) === window) {
            return
        }

        let value = _.get(this.windowSorted, key)
        let childProperties = $(`<ul>`)

        if (_.isFunction(value)) {
            console.log(value)
            value = value.toString()
        } else if (_.isObject(value)) {
            // log('logging', util.inspect(value))
            // List out each property value as an expandable
            // TODO SORT
            _.forEach(_.keys(value), key => {
                childProperties.append($(`<li>${key}</li>`))
            })
        }
         
        $('#accordionExample').append(`
            <div class="card">
                <div class="card-header" id="${headingId}">
                    <h2 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${identifier}" aria-expanded="false" aria-controls="${identifier}">
                        ${key}
                    </button>
                    </h2>
                </div>
            
                <div id="${identifier}" class="collapse" aria-labelledby="${headingId}" data-parent="#accordionExample">
                    <div class="card-body">
                        ${value}
                        <ul>${childProperties.html()}</ul>
                    </div>
                </div>
            </div>
        `)
    }

    processGlobals = () => {

    }
    
    createAccordion = () => {
        log('Getting window variables',this.windowSorted)
        _.forEach(_.keys(this.windowSorted), this.createAccordionItem)
    }

    // TODO: Monitor change in window keys

    sortKeys = (keys: Array<string>) => _.sortBy(keys)
    sortObjKeys = (obj: object) => {
        let unsortedKeys = []
        for (const property in obj) {
            unsortedKeys.push(property)
        }
        return _.sortBy(unsortedKeys)
    }
    

    sortGlobalKeys = () => {
        const globalKeys: Array<string> = _.keys(window)
        this.windowKeysSorted = this.sortKeys(globalKeys)
    }

    shallowSortKeys = (sortable: {[key: string]: any}) => {
        let sortedObj: {[key: string]: any} = {}
        const sortedKeys = this.sortObjKeys(sortable)

        _.forEach(sortedKeys, key => {
            sortedObj[key] = _.get(_.cloneDeep([ sortable[key] ]), 0)
        })
        return sortedObj
    }

    update = () => {
        // this.sortGlobalKeys()
        let windowClone = _.cloneDeep([ this.shallowSortKeys(window) ])
        this.windowSorted = _.get(windowClone, 0)

        this.createAccordion()

    }
}