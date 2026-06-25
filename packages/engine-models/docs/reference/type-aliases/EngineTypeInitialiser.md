# Type Alias: EngineTypeInitialiser\<T, F\>

> **EngineTypeInitialiser**\<`T`, `F`\> = (`engineCore`, `context`, `instanceConfig`) => [`EngineTypeInitialiserReturn`](../interfaces/EngineTypeInitialiserReturn.md)\<`T`, `F`\>

Method definition for the engine type initialiser.

## Type Parameters

### T

`T` *extends* [`IEngineCoreTypeBaseConfig`](../interfaces/IEngineCoreTypeBaseConfig.md) = [`IEngineCoreTypeBaseConfig`](../interfaces/IEngineCoreTypeBaseConfig.md)

### F

`F` = `Factory`\<`unknown`\>

## Parameters

### engineCore

[`IEngineCore`](../interfaces/IEngineCore.md)

### context

[`IEngineCoreContext`](../interfaces/IEngineCoreContext.md)

### instanceConfig

`T`

## Returns

[`EngineTypeInitialiserReturn`](../interfaces/EngineTypeInitialiserReturn.md)\<`T`, `F`\>
