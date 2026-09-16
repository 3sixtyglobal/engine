# Class: EngineCoreBuilder

Builder class for creating engine core instances.

## Constructors

### Constructor

> **new EngineCoreBuilder**(): `EngineCoreBuilder`

#### Returns

`EngineCoreBuilder`

## Methods

### fromClone() {#fromclone}

> `static` **fromClone**(`instanceName`, `cloneData`, `contextIds?`, `options?`): `IEngineCore`

Creates a new engine core instance populated from clone data.
Registers the instance in EngineCoreFactory under the given instanceName.
Safe to call from any V8 isolate (main thread or worker thread).

#### Parameters

##### instanceName

`string`

The name to register the engine under in EngineCoreFactory.

##### cloneData

`IEngineCoreClone`

The serialized clone data from the source engine.

##### contextIds?

`IContextIds`

Optional context IDs to apply during population.

##### options?

Optional population options such as logLevel, types, and entityTypes.

###### logLevel?

`EngineLogLevel`

The log level to use for the engine core instance.

###### types?

`string`[]

The types allowlist for the engine core instance.

###### entityTypes?

`string`[]

The entity types allowlist for the engine core instance.

###### facades?

\{\[`factoryTypeName`: `string`\]: `IEngineFacadeConfig`[]; \}

The facades for the engine core instance to activate, overriding those of the engine it was cloned from.

#### Returns

`IEngineCore`

The populated engine core instance.
