# Interface: IEngineCoreOptions\<C, S\>

The options for creating engine core.

## Type Parameters

### C

`C` *extends* `IEngineCoreConfig` = `IEngineCoreConfig`

### S

`S` *extends* `IEngineState` = `IEngineState`

## Properties

### config? {#config}

> `optional` **config?**: `C`

The engine core config.

***

### stateStorage? {#statestorage}

> `optional` **stateStorage?**: `IEngineStateStorage`\<`S`\>

The state storage component.

***

### skipBootstrap? {#skipbootstrap}

> `optional` **skipBootstrap?**: `boolean`

Skip the bootstrap process, useful for additional engine instances.

***

### populateTypeInitialisers? {#populatetypeinitialisers}

> `optional` **populateTypeInitialisers?**: (`engineCore`, `context`) => `void`

Populate the type initialisers for the engine.

#### Parameters

##### engineCore

`IEngineCore`\<`C`, `S`\>

##### context

`IEngineCoreContext`\<`C`, `S`\>

#### Returns

`void`

***

### customBootstrap? {#custombootstrap}

> `optional` **customBootstrap?**: (`engineCore`, `context`) => `Promise`\<`void`\>

Custom bootstrap method for the engine.

#### Parameters

##### engineCore

`IEngineCore`\<`C`, `S`\>

##### context

`IEngineCoreContext`\<`C`, `S`\>

#### Returns

`Promise`\<`void`\>
