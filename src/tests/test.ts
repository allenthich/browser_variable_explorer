// Declare file as a module
export {};

// Leak global test variables
declare global {
    interface Window {
        MyNamespace: any,
        nestedObject: any,
        fparse: any,
        stringify: any,
    }
}
window.MyNamespace = 1
window.nestedObject = {
    'hello': {
        'world': true,
        'hej': false
    },
    'abc': 123,
    'testFn': (x: number) => {
        return x * 2
    }
}