"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const constants_1 = require("../utils/miscellaneous/constants");
const customEror_1 = __importDefault(require("../utils/lib/customEror"));
const errorHandler_1 = __importDefault(require("../common/middleware/errorHandler/errorHandler"));
class App {
    constructor(port) {
        this.origin = constants_1.origin;
        this.app = (0, express_1.default)();
        this.port = port;
        this.initMiddleware();
        this.initRouters();
        this.notFoundRouter();
        this.errorHandle();
    }
    //start server
    startServer() {
        this.app.listen(this.port, () => {
            console.log(`WE server has started at port: ${this.port}🚀`);
        });
    }
    //init middeleware
    initMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({ origin: this.origin, credentials: true }));
    }
    // init routers
    initRouters() {
        this.app.get('/', (_req, res) => {
            res.send(`We server is running...🚀`);
        });
        this.app.use('/api/v1', new router_1.default().v1Router);
    }
    // not found router
    notFoundRouter() {
        this.app.use('*', (_req, _res, next) => {
            next(new customEror_1.default('Cannot found the route', 404, 'Invalid route'));
        });
    }
    // error handler
    errorHandle() {
        this.app.use(new errorHandler_1.default().handleErrors);
    }
}
exports.default = App;
