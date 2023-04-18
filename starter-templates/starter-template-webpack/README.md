# Webpack + TypeScript project template for Phaser Editor 2D

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/PhaserEditor2D/starter-template-webpack)

A project template for Phaser 3, Webpack 5, TypeScript, and Phaser Editor 2D v3.
It also includes a workflow for deploying the game to GitHub Pages.

## First steps

This project requires [Node.js](https://nodejs.org) and [NPM.js](https://www.npmjs.com). It is recommended that you learn the basics of [Webpack.js](https://webpack.js.org).

* Install dependencies:

    ```
    npm install
    npm update
    ```

* Run the development server:

    ```
    npm start
    ```

    Open the browser at `http://127.0.0.1:8080`.

* Make a production build:

    ```
    npm run build
    ```

    It is generated in the `/dist` folder.

## Gitpod

This repository is ready for start coding in Gitpod, a Cloud Development Environment. You only need to [click on this link](https://gitpod.io/#https://github.com/PhaserEditor2D/starter-template-webpack) for starting a new workspace.

This is what Gitpod does:

- Creates a workspace for this project.
- Opens VS Code to edit this repo.
- Installs & updates the dependencies of this repo.
- Runs the Webpack development server in port `8080`.
- Runs Phaser Editor 2D Core server in port `1959`.

In the **Ports** panel in VS Code, it shows the links for opening the game (port `8080`) & the editor (port `1959`). It gives you the options of copy the URL, open the URL in a preview panel, or open the URL in a new tab.

## Hosting your game on GitHub Pages

If you are looking for a hosting for you game, GitHub Pages is a very nice and free option.
This repository includes a workflow for publishing the game into GitHub Pages automatically.

Just follow these steps:

* Create a GitHub repository with the project (something that probably you already did).
* In GitHub, open the repository and go to **Settings** > **GitHub Pages**.
* In the **Build and deployment** section, set the **GitHub Actions** option in the **Source** parameter.
* Run the **Build game with webpack** workflow in the **Actions** section on the repository.
* When the workflow completes, return to the **Settings** > **GitHub Pages** section and check the address for the deployed game. It should show a message like **Your site is live at https://\<USERNAME>.github.io/<REPOSITORY_NAME>/**.
* Next time you push changes to the `main` branch it will run the workflow and deploy the game automatically.

If you don't want to deploy your game to GitHub Pages, then you can remove the `.github/workflows/main.yml` file.

In this video I explain many of these concepts: [Start making a game in the cloud. GitHub + VS Code + Phaser Editor 2D [Tutorial]](https://www.youtube.com/watch?v=lndU7UAjzgo&t=183s)

## Run the editor

* You can run the editor using the `editor` NPM script, defined in the `package.json` file:

    ```bash
    $ npm run editor
    ```

* If you are in a remote environment (like the Gitpod.io IDE), then run the editor like this:

    ```bash
    $ npm run editor-remote
    ```

* If you want to see all the editor options, run:

    ```bash
    $ npx phasereditor2d-launcher -help
    ```

* If Phaser Editor 2D Core is globally installed, you can run:

    ```bash
    $ PhaserEditor2D -project .
    ```

## Phaser Editor 2D considerations

### Excluding files from the project

There are a lot of files present in the project that are not relevant to Phaser Editor 2D. For example, the whole `node_modules` folder should be excluded from the editor's project.

The `/.skip` file lists the folders and files to exclude from the editor's project. 

[Learn more about resource filtering in Phaser Editor 2D](https://help.phasereditor2d.com/v3/misc/resources-filtering.html)

### Setting the root folder for the game's assets

The `/static` folder contains the assets (images, audio, atlases) used by the game. Webpack copies it to the distribution folder and makes it available as a root path. For example, `http://127.0.0.1:8080/assets` points to the `/static/assets` folder.

By default, Phaser Editor 2D uses the project's root as the start path for the assets. You can change it by creating an empty `publicroot` file. That is the case of the `/static/publicroot` file, which allows adding files to the Asset Pack file (`/static/assets/asset-pack.json`) using correct URLs.

### Asset Pack content hash

Webpack is configured to include the content hash of a file defined in an asset pack editor:

* For loading a pack file in code, import it as a resource:
    ```javascript
    import assetPackUrl from "../static/assets/asset-pack.json";
    ...
    this.load.pack("pack1", assetPackUrl);
    ```
    Webpack will add the `asset-pack.json` file into the distribution files, in the folder `dist/asset-packs/`.

* Because Webpack automatically imports the pack files, those are excluded in the **CopyPlugin** configuration. By convention, name the pack files like this `[any name]-pack.json`.

* The NPM `build` script calls the `phaser-asset-pack-hashing` tool. It parses all pack files in the `dist/` folder and transform the internal URL, adding the content-hash to the query string. It also parses files referenced by the pack. For example, a multi-atlas file is parsed and the name of the image's file will be changed to use a content-hash.

Learn more about the [phaser-asset-pack-hashing](https://www.npmjs.com/package/phaser-asset-pack-hashing) tool.

### Coding

The `/src` folder contains all the TypeScript code, including the scene and user component files, in addition to the Phaser Editor 2D compilers output.

We recommend using Visual Studio Code for editing the code files.

In many tutorials about Phaser Editor 2D, the JavaScript files are loaded using the Asset Pack editor. When using Webpack this is not needed. Just use the Asset Pack editor for loading the art assets.

### Scene, User Components, and ScriptNode configuration

The Scenes, User Components, and ScriptNodes are configured to compile to TypeScript ES modules. Also, the compilers auto-import the classes used in the generated code.

### ScriptNodes

The `src/script-nodes-basic` folder contains the script nodes from the [script-nodes-basic](http://github.com/PhaserEditor2D/script-nodes-basic/) project.

You can add your own script nodes to the `src/script-nodes` folder.

## About

This project template was created by the Phaser Editor 2D team.
