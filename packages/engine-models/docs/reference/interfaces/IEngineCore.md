# Interface: IEngineCore\<C, S\>

Interface describing the engine core methods.

## Type Parameters

### C

`C` *extends* [`IEngineCoreConfig`](IEngineCoreConfig.md) = [`IEngineCoreConfig`](IEngineCoreConfig.md)

### S

`S` *extends* [`IEngineState`](IEngineState.md) = [`IEngineState`](IEngineState.md)

## Methods

### addTypeInitialiser() {#addtypeinitialiser}

> **addTypeInitialiser**(`type`, `module`, `method`): `void`

Add a type initialiser.

#### Parameters

##### type

`string`

The type to add the initialiser for.

##### module

`string`

The name of the module which contains the initialiser method.

##### method

`string`

The name of the method to call.

#### Returns

`void`

***

### getTypeConfig() {#gettypeconfig}

> **getTypeConfig**(`type`): [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[] \| `undefined`

Get the type config for a specific type.

#### Parameters

##### type

`string`

The type to get the config for.

#### Returns

[`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[] \| `undefined`

The type config or undefined if not found.

***

### addContextIdKey() {#addcontextidkey}

> **addContextIdKey**(`key`, `componentFeatures`): `void`

Add a context ID key to the engine.

#### Parameters

##### key

`string`

The context ID key.

##### componentFeatures

`string`[]

The component features for the context ID handler.

#### Returns

`void`

***

### getContextIdKeys() {#getcontextidkeys}

> **getContextIdKeys**(): `string`[]

Get the context ID keys for the engine.

#### Returns

`string`[]

The context IDs keys.

***

### addContextId() {#addcontextid}

> **addContextId**(`key`, `value`): `void`

Add a context ID to the engine.

#### Parameters

##### key

`string`

The context ID key.

##### value

`string`

The context ID value.

#### Returns

`void`

***

### getContextIds() {#getcontextids}

> **getContextIds**(): `IContextIds` \| `undefined`

Get the context IDs for the engine.

#### Returns

`IContextIds` \| `undefined`

The context IDs or undefined if none are set.

***

### start() {#start}

> **start**(`skipComponentStart?`): `Promise`\<`void`\>

Start the engine core.

#### Parameters

##### skipComponentStart?

`boolean`

Should the component start be skipped.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### stop() {#stop}

> **stop**(): `Promise`\<`void`\>

Stop the engine core.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### isStarted() {#isstarted}

> **isStarted**(): `boolean`

Is the engine started.

#### Returns

`boolean`

True if the engine is started.

***

### isPrimary() {#isprimary}

> **isPrimary**(): `boolean`

Is this the primary engine instance.

#### Returns

`boolean`

True if the engine is the primary instance.

***

### isClone() {#isclone}

> **isClone**(): `boolean`

Is this engine instance a clone.

#### Returns

`boolean`

True if the engine instance is a clone.

***

### logInfo() {#loginfo}

> **logInfo**(`message`): `void`

Log info.

#### Parameters

##### message

`string`

The message to log.

#### Returns

`void`

***

### logError() {#logerror}

> **logError**(`error`): `void`

Log error.

#### Parameters

##### error

`IError`

The error to log.

#### Returns

`void`

***

### getConfig() {#getconfig}

> **getConfig**(): `C`

Get the config for the engine.

#### Returns

`C`

The config for the engine.

***

### getState() {#getstate}

> **getState**(): `S`

Get the state of the engine.

#### Returns

`S`

The state of the engine.

***

### setStateDirty() {#setstatedirty}

> **setStateDirty**(): `void`

Set the state to dirty so it gets saved.

#### Returns

`void`

***

### getRegisteredInstances() {#getregisteredinstances}

> **getRegisteredInstances**(): `object`

Get all the registered instances.

#### Returns

`object`

The registered instances.

***

### getRegisteredInstanceType() {#getregisteredinstancetype}

> **getRegisteredInstanceType**(`componentConnectorType`, `features?`): `string`

Get the registered instance type for the component/connector.

#### Parameters

##### componentConnectorType

`string`

The type of the component/connector.

##### features?

`string`[]

The requested features of the component, if not specified the default entry will be retrieved.

#### Returns

`string`

The instance type matching the criteria if one is registered.

#### Throws

If a matching instance was not found.

***

### getRegisteredInstanceTypeOptional() {#getregisteredinstancetypeoptional}

> **getRegisteredInstanceTypeOptional**(`componentConnectorType`, `features?`): `string` \| `undefined`

Get the registered instance type for the component/connector.

#### Parameters

##### componentConnectorType

`string`

The type of the component/connector.

##### features?

`string`[]

The requested features of the component, if not specified the default entry will be retrieved.

#### Returns

`string` \| `undefined`

The instance type matching the criteria if one is registered.

***

### getRegisteredComponents() {#getregisteredcomponents}

> **getRegisteredComponents**(): `Promise`\<`object`[]\>

Get the registered components.

#### Returns

`Promise`\<`object`[]\>

The registered components.

***

### addRegisteredComponent() {#addregisteredcomponent}

> **addRegisteredComponent**(`instanceType`, `component`): `Promise`\<`void`\>

Add a registered component to the engine.

#### Parameters

##### instanceType

`string`

The instance type to register the component under.

##### component

`IComponent`

The component to register.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### getCloneData() {#getclonedata}

> **getCloneData**(): [`IEngineCoreClone`](IEngineCoreClone.md)\<`C`, `S`\>

Get the data required to create a clone of the engine.

#### Returns

[`IEngineCoreClone`](IEngineCoreClone.md)\<`C`, `S`\>

The clone data.

***

### populateClone() {#populateclone}

> **populateClone**(`cloneData`, `contextIds?`, `silent?`): `void`

Populate the engine from the clone data.

#### Parameters

##### cloneData

[`IEngineCoreClone`](IEngineCoreClone.md)\<`C`, `S`\>

The clone data to populate from.

##### contextIds?

`IContextIds`

The context IDs to use for the clone.

##### silent?

`boolean`

Should the clone be silent.

#### Returns

`void`
