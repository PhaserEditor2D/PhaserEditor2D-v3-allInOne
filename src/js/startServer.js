"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServer = exports.startServer = void 0;
var child_process_1 = require("child_process");
var http_1 = require("http");
var path_1 = require("path");
var userData_1 = require("./userData");
var serverProc;
function startServer(project) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var savedPort, port, fileName, filePath, args;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    stopServer();
                    console.log("Starting Phaser Editor 2D Core server");
                    savedPort = userData_1.userData.getProjectPort(project);
                    console.log("savedPort " + savedPort);
                    return [4 /*yield*/, findFreePort(savedPort !== null && savedPort !== void 0 ? savedPort : 1986 + Math.floor(Math.random() * 1024))];
                case 1:
                    port = _c.sent();
                    if (savedPort === undefined) {
                        console.log("Assign port " + port + " to " + project);
                        userData_1.userData.setProjectPort(project, port);
                    }
                    fileName = process.platform === "win32" ? "PhaserEditor2D.exe" : "PhaserEditor2D";
                    filePath = (0, path_1.join)(__dirname, "../../server/" + fileName);
                    args = ["-disable-open-browser", "-port", port.toString(), "-project", project];
                    console.log(args);
                    serverProc = (0, child_process_1.execFile)(filePath, args, {
                        windowsHide: true,
                    });
                    serverProc.on("close", function () {
                        console.log("Closed Phaser Editor 2D Core server");
                    });
                    (_a = serverProc.stdout) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout);
                    (_b = serverProc.stderr) === null || _b === void 0 ? void 0 : _b.pipe(process.stderr);
                    process.once("exit", function () { return serverProc.kill("SIGKILL"); });
                    return [2 /*return*/, port];
            }
        });
    });
}
exports.startServer = startServer;
function stopServer() {
    if (serverProc) {
        console.log("Kill server process " + serverProc.pid);
        serverProc.kill("SIGKILL");
    }
}
exports.stopServer = stopServer;
function isFreePort(port) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var server = (0, http_1.createServer)();
                    server.listen(port, function () {
                        server.close();
                        resolve(true);
                    });
                    server.on("error", function () {
                        resolve(false);
                    });
                })];
        });
    });
}
function findFreePort(portStart) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    return [4 /*yield*/, isFreePort(portStart)];
                case 1:
                    if (_a.sent()) {
                        return [2 /*return*/, portStart];
                    }
                    portStart++;
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
