// Declare file as a module
export {};

// Leak global test variables
declare global {
    interface Window {
        MyNamespace: any,
    }
}
window.MyNamespace = 1