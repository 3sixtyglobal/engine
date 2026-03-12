# Interface: EngineTypeInitialiserReturn\<T, F\>

Engine type initialiser return type.

## Type Parameters

### T

`T` *extends* [`IEngineCoreTypeBaseConfig`](IEngineCoreTypeBaseConfig.md) = [`IEngineCoreTypeBaseConfig`](IEngineCoreTypeBaseConfig.md)

### F

`F` = `Factory`\<`unknown`\>

## Properties

### instanceTypeName? {#instancetypename}

> `optional` **instanceTypeName**: `string`

The instance type created.

***

### factory? {#factory}

> `optional` **factory**: `F`

The factory to store the instance in.

***

### createComponent()? {#createcomponent}

> `optional` **createComponent**: (`additionalConfig`) => `IComponent`

Create a new component.

#### Parameters

##### additionalConfig

`T`

#### Returns

`IComponent`
