# Basic Phaser Editor 2D script nodes

This project contains a couple of Script Nodes for Phaser Editor 2D.

These script nodes are very basic and may fit on any Phaser Editor 2D project.

The scripts are coded in TypeScript with ES modules.

## Installing

Copy this project folder (or clone the repo) and paste it into your project's `src/` folder.

## Summary

There are three groups of scripts: **Base**, **Triggers**, and **Actions**.

### Base scripts

Contain basic/abstract functionallity. Often, you will create prefab variants of them (extend them).

* **ScriptNode** - the base class for all the scripts.
* **SpriteScriptNode** - base prefab for script nodes accessing sprite objects.
* **RootScriptNode** - a script node that registers itself into the game object and can be used as container of other scripts.

### Trigger scripts

These scripts listen certain event. When the event is triggered, then execute the children, which are actions.

* **OnEventScript** - registers to the given `eventEmitter` and listens the given `eventName` event.
* **OnPointerDownScript** - listens the `pointerdown` event of the game object.

### Action scripts

Actions are script that are executed manually or by other nodes, like triggers or other actions.

* **CallbackActionScript** - executes the given `callback` expression.
* **StartSceneActionScript** - starts the given `sceneKey` scene.
* **ExecActionScript** - executes the given `targetAction`.
* **EmitEventActionScript** - the given `eventEmitter` emits the given `eventName`.

## ScriptNode

The base of all the scripts. Probably it is already avaliable in your project (if you generated it with Phaser Editor 2D).

This class provides methods for managing the node's children, and implementing the scene events: `awake`, `start`, and `update`.

## SpriteScriptNode

A base script for all the scripts accesing sprite objects. It just overrides the `gameObject` property and set its type to `Phaser.GameObjects.Sprite`. This helps IDE auto-completion and type-checking.

## RootScriptNode

A base script that you can use to register the script node into the game object. In this way you can access the scripts associated to a game object.

When you create a **RootScriptNode**, it registers itself to the game object in this way:

```
gameObject["RootScript__scripts"] = this;
```

You can use the `key` parameter to register the root script node using other attribute. If the `key` parameter is `"anotherScripts"`, then it register the root node like this:

```
gameObject["RootScript__anotherScripts"] = this;
```

The **RootScriptNode** class contains utility methods for accessing the root script of a game object.

The static `getRoot()` method can be used for getting the root script:

```
const script = RootScriptNode.getRoot(someGameObject);
const otherScript = RootScriptNode.getRoot(someGameObject, "anotherScripts");
```

The static `hasRoot()` method tells if the game object as a root script:

```
if (RootScriptNode.hasRoot(gameObject, "myScripts")) {
    ....
}
```

The static `getChildren()` method returns the chidlren of the root script:

```
const children = RootScriptNode.getChildren(gameObject, "myScripts");
```

You can create variants of the **RootScriptNode** and use different keys.

## OnEventScript

A trigger-like script node. It registers to the given `eventEmitter` and listens the given `eventName`. When the event is fired, it executes the children action nodes. 

You can create handy prefab variants for different events, like the `OnPointerDownScript` prefab.

You can select an `eventEmitter` from the following list:

* `game.events`
* `scene.events`
* `scene.loader`
* `scene.input`
* `scene.input.keyboard`
* `scene.anims`
* `gameObject` (by default)

## OnPointerDownScript

A trigger-like script. It is a prefab variant of the `OnEventScript` node. It listens to the `pointerdown` event of the game object, and executes the children action nodes.

If the game object's input is not set whe the scene "awakes", then this script calls the `gameObject.setInteractive()` method.

## CallbackActionScript

An action-like script. It executes the given `callback` expression. You can use this script for executing custom methods from your prefabs or scenes.

## StartSceneActionScript

An action-like script. It starts the given `sceneKey` scene.

## ExecActionScript

An action-like script. It executes the given `targetAction`. You can use this script for executing an action node from script-tree.

For example, let's say you have a **JumpAction** for jumping a character. But you want to call this action when different events are fired:

- When you click a jump button.
- When you press the `SPACE` key.
- When you press the `UP` button of an external gamepad.

So, you can use different **ExecActionScript** nodes in different contexts, but referencing the same **JumpAction** node.

## EmitEventActionScript

An action like script. It calls the emit method of the given `eventEmitter` with the given `eventName`. As argument of the event it uses the argument received in the `execute()` method.

Like in the **OnEventScript**, you can select an `eventEmitter` from a list:

* `game.events`
* `scene.events`
* `scene.loader`
* `scene.input`
* `scene.input.keyboard`
* `scene.anims`
* `gameObject` (by default)
