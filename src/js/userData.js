"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = exports.store = void 0;
var fs_1 = require("fs");
var os_1 = require("os");
var path_1 = require("path");
var JSONStore = /** @class */ (function () {
    function JSONStore() {
        var settingsDir = (0, path_1.join)((0, os_1.homedir)(), ".phasereditor2d/all-in-one");
        (0, fs_1.mkdirSync)(settingsDir, { recursive: true });
        this.settingsFile = (0, path_1.join)(settingsDir, "user-data.json");
        this.data = {};
        if ((0, fs_1.existsSync)(this.settingsFile)) {
            var s = (0, fs_1.readFileSync)(this.settingsFile);
            this.data = JSON.parse(s.toString());
        }
    }
    JSONStore.prototype.getValue = function (key) {
        return this.data[key];
    };
    JSONStore.prototype.getString = function (key) {
        return this.data[key];
    };
    JSONStore.prototype.getInt = function (key) {
        var value = this.data[key];
        if (Number.isInteger(value)) {
            return value;
        }
        return undefined;
    };
    JSONStore.prototype.getStringArray = function (key) {
        var val = this.data[key];
        if (!val) {
            this.data[key] = val = [];
        }
        return val;
    };
    JSONStore.prototype.setValue = function (key, value) {
        this.data[key] = value;
        this.save();
    };
    JSONStore.prototype.deleteValue = function (key) {
        delete this.data[key];
        this.save();
    };
    JSONStore.prototype.save = function () {
        (0, fs_1.writeFileSync)(this.settingsFile, JSON.stringify(this.data, null, 4));
    };
    return JSONStore;
}());
exports.store = new JSONStore();
var UserData = /** @class */ (function () {
    function UserData() {
    }
    UserData.prototype.getProjectPath = function () {
        return exports.store.getString("projectPath");
    };
    UserData.prototype.setProjectPath = function (project) {
        exports.store.setValue("projectPath", project);
    };
    UserData.prototype.deleteProjectPath = function () {
        exports.store.deleteValue("projectPath");
    };
    UserData.prototype.getProjectPort = function (project) {
        var ports = exports.store.getValue("ports") || {};
        return ports[project];
    };
    UserData.prototype.setProjectPort = function (project, port) {
        var ports = exports.store.getValue("ports") || {};
        ports[project] = port;
        exports.store.setValue("ports", ports);
    };
    UserData.prototype.getRecentProjects = function () {
        var recentProjects = exports.store.getValue("recentProjects") || {};
        var projects = Object.keys(recentProjects);
        projects.sort(function (a, b) { return recentProjects[b] - recentProjects[a]; });
        return projects;
    };
    UserData.prototype.clearRecentProjects = function () {
        exports.store.setValue("recentProjects", {});
    };
    UserData.prototype.incrementRecentProject = function (project) {
        var recentProjects = exports.store.getValue("recentProjects") || {};
        recentProjects[project] = Date.now();
        exports.store.setValue("recentProjects", recentProjects);
    };
    UserData.prototype.deleteRecentProject = function (project) {
        var data = (exports.store.getValue("recentProjects") || {});
        delete data[project];
        exports.store.setValue("recentProjects", data);
    };
    return UserData;
}());
exports.userData = new UserData();
