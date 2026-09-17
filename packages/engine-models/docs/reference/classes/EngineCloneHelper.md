# Class: EngineCloneHelper

Helper methods for narrowing engine clone data before a clone is built from it.

## Constructors

### Constructor

> **new EngineCloneHelper**(): `EngineCloneHelper`

#### Returns

`EngineCloneHelper`

## Properties

### CLASS\_NAME {#class_name}

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### verifyExcludeCloneComponents() {#verifyexcludeclonecomponents}

> `static` **verifyExcludeCloneComponents**(`excludeCloneComponents?`): `string`[] \| `undefined`

Verify the exclude clone component patterns, compiling each one so an invalid pattern fails early.

#### Parameters

##### excludeCloneComponents?

`string`[]

The patterns to verify.

#### Returns

`string`[] \| `undefined`

The verified patterns, or undefined when none were supplied.

#### Throws

GeneralError if a pattern is not a valid regular expression.

***

### filterCloneComponents() {#filterclonecomponents}

> `static` **filterCloneComponents**\<`T`\>(`cloneData`, `excludeTypes?`, `keepAlways?`): `T`

Remove the component types matched by the exclude patterns from the clone data.

#### Type Parameters

##### T

`T` *extends* [`IEngineCoreClone`](../interfaces/IEngineCoreClone.md)\<[`IEngineCoreConfig`](../interfaces/IEngineCoreConfig.md), [`IEngineState`](../interfaces/IEngineState.md)\>

#### Parameters

##### cloneData

`T`

The clone data to filter, it is not mutated.

##### excludeTypes?

`string`[]

The regular expression patterns for the type keys to remove.

##### keepAlways?

`boolean`

When true, entries with cloneMode Always under a matched key are retained.

#### Returns

`T`

The filtered clone data, or the original when there is nothing to filter.

#### Throws

GeneralError if a pattern is not a valid regular expression.
