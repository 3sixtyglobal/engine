# Class: EngineTypeHelper

Helper methods for engine config types.

## Constructors

### Constructor

> **new EngineTypeHelper**(): `EngineTypeHelper`

#### Returns

`EngineTypeHelper`

## Properties

### CLASS\_NAME {#class_name}

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### getConfigOfType() {#getconfigoftype}

> `static` **getConfigOfType**\<`T`\>(`engineConfig`, `component`, `type`): `IEngineCoreTypeConfig`\<`T`\> \| `undefined`

Get the config for the specified component and type.

#### Type Parameters

##### T

`T` *extends* `IEngineCoreTypeBaseConfig`\<`unknown`\>

#### Parameters

##### engineConfig

[`IEngineConfig`](../interfaces/IEngineConfig.md)

The engine configuration.

##### component

`string`

The component name.

##### type

`string`

The type name.

#### Returns

`IEngineCoreTypeConfig`\<`T`\> \| `undefined`

The config for the specified component and type or undefined if it does not exist.

***

### mergeConfig() {#mergeconfig}

> `static` **mergeConfig**\<`T`\>(`config1?`, `config2?`, `config3?`, `config4?`, `config5?`): `T`

Merge multiple config objects into one.
Each config parameter can be a different partial type, and they are merged together.

#### Type Parameters

##### T

`T` *extends* `unknown`

#### Parameters

##### config1?

`Partial`\<`T`\>

The first config object.

##### config2?

`Partial`\<`T`\>

Optional additional config object to merge.

##### config3?

`Partial`\<`T`\>

Optional additional config object to merge.

##### config4?

`Partial`\<`T`\>

Optional additional config object to merge.

##### config5?

`Partial`\<`T`\>

Optional additional config object to merge.

#### Returns

`T`

The merged config object combining all input types.
