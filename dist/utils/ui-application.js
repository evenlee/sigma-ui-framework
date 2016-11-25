var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-logging", "./ui-constants", "./ui-utils", "./ui-event"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_logging_1, ui_constants_1, ui_utils_1, ui_event_1) {
    "use strict";
    var UIApplication = (function () {
        function UIApplication(router) {
            this.router = router;
            this.IsHttpInUse = false;
            this.IsAuthenticated = false;
            this.__sharedState = {};
            this.__logger = aurelia_logging_1.getLogger('UIApplication');
            this.__logger.info('Initialized');
        }
        UIApplication.prototype.navigate = function (hash, options) {
            this.__logger.info("navigate::" + hash);
            this.router.navigate(hash, options);
        };
        UIApplication.prototype.navigateTo = function (route, params, options) {
            if (params === void 0) { params = {}; }
            this.__logger.info("navigateTo::" + route);
            this.router.navigateToRoute(route, params, options);
        };
        UIApplication.prototype.routeActive = function (route) {
            return route.isActive || route.href == location.hash ||
                location.hash.indexOf(route.config.redirect || 'QWER') > -1;
        };
        Object.defineProperty(UIApplication.prototype, "AuthUser", {
            get: function () {
                return this.__authUser;
            },
            set: function (v) {
                this.__authUser = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIApplication.prototype, "AuthToken", {
            get: function () {
                return this.__authToken;
            },
            set: function (v) {
                this.__authToken = v;
            },
            enumerable: true,
            configurable: true
        });
        UIApplication.prototype.login = function (authUser, authPass, authToken, route) {
            this.AuthUser = authUser;
            this.AuthToken = authToken;
            this.IsAuthenticated = true;
            this.persist('AppUsername', authUser);
            this.persist('AppPassword', authPass);
            this.navigateTo(route || 'home');
            ui_event_1.UIEvent.broadcast('login');
        };
        UIApplication.prototype.logout = function () {
            this.AuthUser = null;
            this.AuthToken = null;
            this.persist('AppPassword', null);
            this.IsAuthenticated = false;
            this.navigateTo('login');
            ui_event_1.UIEvent.broadcast('logout');
        };
        UIApplication.prototype.shared = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (value === '§') {
                return this.__sharedState[key];
            }
            else if (value === null) {
                delete this.__sharedState[key];
            }
            else {
                this.__sharedState[key] = value;
            }
            return null;
        };
        UIApplication.prototype.session = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (window.sessionStorage) {
                if (value === '§') {
                    return JSON.parse(window.sessionStorage.getItem(ui_constants_1.UIConstants.App.Key + ':' + key));
                }
                else if (value === null) {
                    window.sessionStorage.removeItem(ui_constants_1.UIConstants.App.Key + ':' + key);
                }
                else {
                    window.sessionStorage.setItem(ui_constants_1.UIConstants.App.Key + ':' + key, JSON.stringify(value));
                }
            }
            return null;
        };
        UIApplication.prototype.clearSession = function () {
            if (window.sessionStorage)
                window.sessionStorage.clear();
        };
        UIApplication.prototype.persist = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (window.localStorage) {
                if (value === '§') {
                    return JSON.parse(window.localStorage.getItem(ui_constants_1.UIConstants.App.Key + ':' + key));
                }
                else if (value === null) {
                    window.localStorage.removeItem(ui_constants_1.UIConstants.App.Key + ':' + key);
                }
                else {
                    window.localStorage.setItem(ui_constants_1.UIConstants.App.Key + ':' + key, JSON.stringify(value));
                }
            }
            return null;
        };
        UIApplication.prototype.info = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.__logger.info(tag + "::" + msg, rest);
        };
        UIApplication.prototype.warn = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.__logger.warn(tag + "::" + msg, rest);
        };
        UIApplication.prototype.debug = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.__logger.debug(tag + "::" + msg, rest);
        };
        UIApplication.prototype.error = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.__logger.error(tag + "::" + msg, rest);
        };
        UIApplication.prototype.toast = function (config, container) {
            ui_utils_1.UIUtils.showToast(config, container);
        };
        UIApplication.prototype.toastSuccess = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            config.theme = 'success';
            ui_utils_1.UIUtils.showToast(config, container);
        };
        UIApplication.prototype.toastError = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            config.theme = 'danger';
            ui_utils_1.UIUtils.showToast(config, container);
        };
        UIApplication.prototype.alert = function (config) {
            if (typeof config === 'string')
                config = { message: config };
            config.type = config.type || "info";
            config.button = config.okLabel || "OK";
            return ui_utils_1.UIUtils.alert(config);
        };
        UIApplication.prototype.confirm = function (config) {
            if (typeof config === 'string')
                config = { message: config };
            config.yesLabel = config.yesLabel || "Yes";
            config.noLabel = config.noLabel || "No";
            return ui_utils_1.UIUtils.confirm(config);
        };
        UIApplication = __decorate([
            aurelia_framework_1.singleton(),
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [aurelia_router_1.Router])
        ], UIApplication);
        return UIApplication;
    }());
    exports.UIApplication = UIApplication;
    var AuthInterceptor = (function () {
        function AuthInterceptor(appState) {
            this.appState = appState;
            this.logger = aurelia_logging_1.getLogger('AuthInterceptor');
            this.logger.info('Initialized');
            ui_event_1.UIEvent.subscribe('Unauthorized', function () { return appState.navigateTo('login', { status: 401 }); });
        }
        AuthInterceptor.prototype.run = function (routingContext, next) {
            if (routingContext.getAllInstructions()
                .some(function (i) { return i.config.auth; })) {
                if (!this.appState.IsAuthenticated) {
                    this.logger.warn('Not authenticated');
                    var url = routingContext.router.generate('login', { status: 401 });
                    this.appState.IsAuthenticated = false;
                    this.appState.session('AppCurrentRoute', [routingContext.config.route, routingContext.params]);
                    this.appState.session('AppCurrentFragment', routingContext.fragment);
                    return next.reject(new aurelia_router_1.Redirect(url));
                }
            }
            return next();
        };
        AuthInterceptor = __decorate([
            aurelia_framework_1.singleton(),
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [UIApplication])
        ], AuthInterceptor);
        return AuthInterceptor;
    }());
    exports.AuthInterceptor = AuthInterceptor;
});