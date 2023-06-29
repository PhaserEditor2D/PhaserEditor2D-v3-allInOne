## v1.0.4 - Jun 25, 2023

* Migrates the **Event Name** properties of the **EmitEventActionScript** and **OnEventScript** script nodes to the new **Event** property type.

## v1.0.3 - Apr 27, 2023

* Fixes `update()` and `awake()` events management.
* Improves `OnEventScript`, it now can registers into different emitters: `scene.events`, `scene.input`, `scene.keyboard`, `gameObject`, etc...
* Adds `EmitEventActionScript`, an action node for emitting an event to different emitters.
* Removes `OnKeyboardEventScript` and `OnSceneAwakeScript`.
* Allows passing multiple arguments to the `execute()` method.

## v1.0.2 - Mar 28, 2023

* Fixes **RootScriptNode** typo.

## v1.0.1 - Mar 22, 2023

* Adds the **RootScriptNode**.

## v1.0.0 - Mar 21, 2023

First release.
