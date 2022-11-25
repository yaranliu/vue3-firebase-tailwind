// class HomeRouteClass {
//     publicHome: string = ''
//     userHome: string = ''
//     constructor(publicHome: string, userHome:string) {
//         this.publicHome = publicHome
//         this.userHome = userHome
//     }
// }
//
// class RouteNamesClass {
//     signIn: string
//     signUp: string
//     home: HomeRouteClass
//
//     constructor(signIn: string, signUp: string, publicHome: string, userHome: string) {
//         this.signIn = signIn;
//         this.signUp = signUp
//         this.home = new HomeRouteClass(publicHome, userHome)
//     }
// }
//
// const DefaultRouteNames = new RouteNamesClass('signIn', 'signUp', 'home', 'user')

const DefaultRouteNames = {
    signIn: 'signIn',
    signUp: 'signUp',
    home: {
        public: 'home',
        user: 'user'
    }
}


// Line Awesome
let DefaultIcons = {
    clear: 'las la-times',
    search: 'las la-search',
    arrow: {
        up: 'las la-angle-up',
        down: 'las la-angle-down',
        left: 'las la-angle-left',
        right: 'las la-angle-right',
    },
    caret: {
        up: 'las la-caret-up',
        down: 'las la-caret-down',
        left: 'las la-caret-left',
        right: 'las la-caret-right',
    },
    pagination: {
        first: 'las la-step-backward',
        previous: 'las la-caret-left',
        next: 'las la-caret-right',
        last: 'las la-step-forward'
    }
}

export { DefaultRouteNames, DefaultIcons }
