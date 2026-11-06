# Type Alias: EngineTypeInitialiser\<T, F\>

> **EngineTypeInitialiser**\<`T`, `F`\> = (`engineCore`, `context`, `instanceConfig`) => [`IEngineTypeInitialiserReturn`](../interfaces/IEngineTypeInitialiserReturn.md)\<`T`, `F`\>

Method definition for the engine type initialiser.

## Type Parameters

### T {#t}

`T` *extends* [`IEngineCoreTypeBaseConfig`](../interfaces/IEngineCoreTypeBaseConfig.md) = [`IEngineCoreTypeBaseConfig`](../interfaces/IEngineCoreTypeBaseConfig.md)

### F {#f}

`F` = `Factory`\<`unknown`\>

## Parameters

### engineCore

[`IEngineCore`](../interfaces/IEngineCore.md)

### context

[`IEngineCoreContext`](../interfaces/IEngineCoreContext.md)

### instanceConfig

`T`

## Returns

[`IEngineTypeInitialiserReturn`](../interfaces/IEngineTypeInitialiserReturn.md)\<`T`, `F`\>
