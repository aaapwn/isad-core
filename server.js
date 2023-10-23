"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const app_1 = __importDefault(require("./src/app"));
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const port = 3000;
app_1.default.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
exports.api = (_a = firebase_functions_1.default === null || firebase_functions_1.default === void 0 ? void 0 : firebase_functions_1.default.https) === null || _a === void 0 ? void 0 : _a.onRequest(app_1.default);
