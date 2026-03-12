# Interface: IEngineCoreClone\<C, S\>

Interface describing the data required to clone an engine.

## Type Parameters

### C

`C` *extends* [`IEngineCoreConfig`](IEngineCoreConfig.md) = [`IEngineCoreConfig`](IEngineCoreConfig.md)

### S

`S` *extends* [`IEngineState`](IEngineState.md) = [`IEngineState`](IEngineState.md)

## Properties

### config {#config}

> **config**: `C`

The config for the engine.

***

### state {#state}

> **state**: `S`

The state of the engine.

***

### typeInitialisers {#typeinitialisers}

> **typeInitialisers**: `object`[]

The type initialisers for the engine.

#### type

> **type**: `string`

#### module

> **module**: `string`

#### method

> **method**: `string`

***

### entitySchemas {#entityschemas}

> **entitySchemas**: `object`

The entity schemas for the engine.

#### Index Signature

\[`schema`: `string`\]: `IEntitySchema`\<`unknown`\>

***

### contextIdKeys {#contextidkeys}

> **contextIdKeys**: `object`[]

The context ID keys.

#### key

> **key**: `string`

#### componentFeatures

> **componentFeatures**: `string`[]
