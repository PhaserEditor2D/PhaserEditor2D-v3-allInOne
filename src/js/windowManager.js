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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowManager = void 0;
var electron_1 = require("electron");
var fs_1 = require("fs");
var os_1 = require("os");
var path_1 = require("path");
var recursive_copy_1 = __importDefault(require("recursive-copy"));
var startServer_1 = require("./startServer");
var userData_1 = require("./userData");
var projectPath = userData_1.userData.getProjectPath();
var WindowManager = /** @class */ (function () {
    function WindowManager() {
        var _this = this;
        WindowManager.count++;
        this.win = new electron_1.BrowserWindow({
            width: 1200 + Math.floor(Math.random() * 200),
            height: 800 + Math.floor(Math.random() * 200),
            center: false,
            autoHideMenuBar: true,
            show: true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: false,
                preload: (0, path_1.join)(__dirname, "preload.js")
            }
        });
        this.createMenu();
        if (process.platform === "linux") {
            var icon = electron_1.nativeImage.createFromPath((0, path_1.join)(__dirname, "../../linux-assets/icon.png"));
            this.win.setIcon(icon);
        }
        var ipcMainListener = function (event, arg) { return __awaiter(_this, void 0, void 0, function () {
            var method, body, _a, choice, leave, dir, result, result, dir, src, e_1, projects;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (event.sender !== this.win.webContents) {
                            return [2 /*return*/];
                        }
                        console.log("ipcMain.on:");
                        console.log(arg);
                        method = arg.method;
                        body = arg.body || {};
                        _a = method;
                        switch (_a) {
                            case "ask-close-window": return [3 /*break*/, 1];
                            case "new-window": return [3 /*break*/, 3];
                            case "clear-list": return [3 /*break*/, 4];
                            case "show-new-project-page": return [3 /*break*/, 5];
                            case "open-project": return [3 /*break*/, 6];
                            case "close-project": return [3 /*break*/, 9];
                            case "create-project": return [3 /*break*/, 10];
                            case "recent-projects": return [3 /*break*/, 16];
                            case "open-dev-tools": return [3 /*break*/, 17];
                        }
                        return [3 /*break*/, 18];
                    case 1: return [4 /*yield*/, electron_1.dialog.showMessageBox(this.win, {
                            type: 'question',
                            buttons: ['Leave', 'Stay'],
                            title: 'Do you want to leave?',
                            message: 'Changes you made may not be saved.',
                            defaultId: 0,
                            cancelId: 1
                        })];
                    case 2:
                        choice = _b.sent();
                        console.log(choice);
                        leave = (choice.response === 0);
                        if (leave) {
                            console.log("close window");
                            this.win.destroy();
                        }
                        return [3 /*break*/, 18];
                    case 3:
                        {
                            new WindowManager();
                            return [3 /*break*/, 18];
                        }
                        _b.label = 4;
                    case 4:
                        {
                            this.clearList();
                            return [3 /*break*/, 18];
                        }
                        _b.label = 5;
                    case 5:
                        {
                            this.loadNewProjectPage();
                            return [3 /*break*/, 18];
                        }
                        _b.label = 6;
                    case 6:
                        dir = body.project;
                        if (!(dir === undefined)) return [3 /*break*/, 8];
                        return [4 /*yield*/, electron_1.dialog.showOpenDialog(this.win, {
                                message: "Select Folder",
                                properties: ["openDirectory", "createDirectory", "promptToCreate"],
                                defaultPath: projectPath
                            })];
                    case 7:
                        result = _b.sent();
                        dir = result ? result.filePaths[0] : undefined;
                        _b.label = 8;
                    case 8:
                        this.openProject(dir);
                        return [3 /*break*/, 18];
                    case 9:
                        {
                            userData_1.userData.deleteProjectPath();
                            this.loadHomePage();
                            (0, startServer_1.stopServer)();
                            return [3 /*break*/, 18];
                        }
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 14, , 15]);
                        return [4 /*yield*/, electron_1.dialog.showOpenDialog(this.win, {
                                message: "Select Project Path",
                                properties: ["openDirectory", "createDirectory", "promptToCreate"],
                                defaultPath: projectPath || (0, os_1.homedir)()
                            })];
                    case 11:
                        result = _b.sent();
                        if (!!result.canceled) return [3 /*break*/, 13];
                        this.win.loadFile("src/html/loading.html");
                        dir = result.filePaths[0];
                        (0, fs_1.mkdirSync)(dir, { recursive: true });
                        src = (0, path_1.join)(electron_1.app.getAppPath(), "starter-templates", body.repo);
                        return [4 /*yield*/, (0, recursive_copy_1.default)(src, dir, {
                                dot: true,
                                overwrite: false,
                                results: false,
                            })];
                    case 12:
                        _b.sent();
                        this.openProject(dir);
                        _b.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        e_1 = _b.sent();
                        console.log(e_1);
                        electron_1.dialog.showErrorBox("Error", e_1.message);
                        this.loadHomePage();
                        return [3 /*break*/, 15];
                    case 15: return [3 /*break*/, 18];
                    case 16:
                        {
                            projects = userData_1.userData.getRecentProjects();
                            event.returnValue = projects;
                            return [3 /*break*/, 18];
                        }
                        _b.label = 17;
                    case 17:
                        {
                            this.win.webContents.openDevTools({
                                mode: "bottom"
                            });
                            return [3 /*break*/, 18];
                        }
                        _b.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        }); };
        electron_1.ipcMain.on("electron-phasereditor2d", ipcMainListener);
        this.win.once("closed", function () {
            electron_1.ipcMain.removeListener("electron-phasereditor2d", ipcMainListener);
            WindowManager.count--;
        });
        if (WindowManager.count === 1 && projectPath && (0, fs_1.existsSync)(projectPath) && (0, fs_1.statSync)(projectPath).isDirectory()) {
            this.openProject(projectPath);
        }
        else {
            this.loadHomePage();
        }
    }
    WindowManager.prototype.clearList = function () {
        userData_1.userData.clearRecentProjects();
    };
    WindowManager.prototype.loadHomePage = function () {
        this.win.loadFile("src/html/start.html");
    };
    WindowManager.prototype.loadNewProjectPage = function () {
        this.win.loadFile("src/html/newProject.html");
    };
    WindowManager.prototype.openProject = function (project) {
        return __awaiter(this, void 0, void 0, function () {
            var port, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!project) {
                            return [2 /*return*/];
                        }
                        if (!(0, fs_1.existsSync)(project) || !(0, fs_1.statSync)(project).isDirectory()) {
                            electron_1.dialog.showMessageBox(this.win, {
                                type: "question",
                                buttons: ["Close"],
                                title: "File not found",
                                message: "File \"" + project + "\" does not exist or is not a directory.",
                                defaultId: 0,
                                cancelId: 1
                            });
                            userData_1.userData.deleteRecentProject(project);
                            userData_1.userData.deleteProjectPath();
                            this.loadHomePage();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, startServer_1.startServer)(project)];
                    case 1:
                        port = _a.sent();
                        url = "http://127.0.0.1:" + port + "/editor/";
                        setTimeout(function () { return _this.win.loadURL(url); }, 500);
                        projectPath = project;
                        userData_1.userData.setProjectPath(projectPath);
                        userData_1.userData.incrementRecentProject(project);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    WindowManager.prototype.createMenu = function () {
        var isMac = process.platform === 'darwin';
        var template = __spreadArray(__spreadArray([], (isMac ? [{
                label: "Phaser Editor 2D",
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideothers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            }] : []), true), [
            // { role: 'fileMenu' }
            {
                label: 'File',
                submenu: [
                    isMac ? { role: 'close' } : { role: 'quit' }
                ]
            },
            // { role: 'editMenu'}
            {
                label: 'Edit',
                submenu: __spreadArray([
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' }
                ], (isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startSpeaking' },
                            { role: 'stopSpeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ]), true)
            },
            // { role: 'viewMenu' }
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forceReload' },
                    { role: 'toggleDevTools' },
                    { type: 'separator' },
                    { role: 'resetZoom' },
                    { role: 'zoomIn' },
                    { role: 'zoomOut' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            },
            // { role: 'windowMenu' }
            {
                label: 'Window',
                submenu: __spreadArray([
                    { role: 'minimize' },
                    { role: 'zoom' }
                ], (isMac ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ]), true)
            }
        ], false);
        var menu = electron_1.Menu.buildFromTemplate(template);
        electron_1.Menu.setApplicationMenu(menu);
    };
    WindowManager.prototype.exitApp = function () {
        process.exit();
    };
    WindowManager.count = 0;
    return WindowManager;
}());
exports.WindowManager = WindowManager;
