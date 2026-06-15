# Class: EngineCore\<C, S\>

Core for the engine.

## Type Parameters

### C

`C` *extends* `IEngineCoreConfig` = `IEngineCoreConfig`

### S

`S` *extends* `IEngineState` = `IEngineState`

## Implements

- `IEngineCore`\<`C`, `S`\>

## Constructors

### Constructor

> **new EngineCore**\<`C`, `S`\>(`options?`): `EngineCore`\<`C`, `S`\>

Create a new instance of EngineCore.

#### Parameters

##### options?

[`IEngineCoreOptions`](../interfaces/IEngineCoreOptions.md)\<`C`, `S`\>

The options for the engine.

#### Returns

`EngineCore`\<`C`, `S`\>

## Properties

### LOGGING\_COMPONENT\_TYPE\_NAME {#logging_component_type_name}

> `readonly` `static` **LOGGING\_COMPONENT\_TYPE\_NAME**: `string` = `"engine-logging-service"`

Name for the engine logger component, used for direct console logging.

***

### LOGGING\_CONNECTOR\_TYPE\_NAME {#logging_connector_type_name}

> `readonly` `static` **LOGGING\_CONNECTOR\_TYPE\_NAME**: `string` = `"engine-logging-connector"`

Name for the engine logger connector, used for direct console logging.

***

### CLASS\_NAME {#class_name}

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

***

### \_context {#_context}

> `protected` **\_context**: `IEngineCoreContext`\<`C`, `S`\>

The core context.

***

### \_contextIdKeys {#_contextidkeys}

> `protected` `readonly` **\_contextIdKeys**: `object`[]

The context ID keys.

#### key

> **key**: `string`

#### componentFeatures

> **componentFeatures**: `string`[]

***

### \_contextIds? {#_contextids}

> `protected` `optional` **\_contextIds?**: `IContextIds`

The context IDs.

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

#### Implementation of

`IEngineCore.addTypeInitialiser`

***

### getTypeConfig() {#gettypeconfig}

> **getTypeConfig**(`type`): `IEngineCoreTypeConfig`[] \| `undefined`

Get the type config for a specific type.

#### Parameters

##### type

`string`

The type to get the config for.

#### Returns

`IEngineCoreTypeConfig`[] \| `undefined`

The type config or undefined if not found.

#### Implementation of

`IEngineCore.getTypeConfig`

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

#### Implementation of

`IEngineCore.addContextIdKey`

***

### getContextIdKeys() {#getcontextidkeys}

> **getContextIdKeys**(): `string`[]

Get the context ID keys for the engine.

#### Returns

`string`[]

The context IDs keys.

#### Implementation of

`IEngineCore.getContextIdKeys`

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

#### Implementation of

`IEngineCore.addContextId`

***

### getContextIds() {#getcontextids}

> **getContextIds**(): `IContextIds` \| `undefined`

Get the context IDs for the engine.

#### Returns

`IContextIds` \| `undefined`

The context IDs or undefined if none are set.

#### Implementation of

`IEngineCore.getContextIds`

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

A promise that resolves when the engine and all components have started.

#### Implementation of

`IEngineCore.start`

***

### stop() {#stop}

> **stop**(): `Promise`\<`void`\>

Stop the engine core.

#### Returns

`Promise`\<`void`\>

A promise that resolves when all components have stopped and state has been saved.

#### Implementation of

`IEngineCore.stop`

***

### isStarted() {#isstarted}

> **isStarted**(): `boolean`

Is the engine started.

#### Returns

`boolean`

True if the engine is started.

#### Implementation of

`IEngineCore.isStarted`

***

### isPrimary() {#isprimary}

> **isPrimary**(): `boolean`

Is this the primary engine instance.

#### Returns

`boolean`

True if the engine is the primary instance.

#### Implementation of

`IEngineCore.isPrimary`

***

### isClone() {#isclone}

> **isClone**(): `boolean`

Is this engine instance a clone.

#### Returns

`boolean`

True if the engine instance is a clone.

#### Implementation of

`IEngineCore.isClone`

***

### logInfo() {#loginfo}

> **logInfo**(`message`): `Promise`\<`void`\>

Log info.

#### Parameters

##### message

`string`

The message to log.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the message has been logged.

#### Implementation of

`IEngineCore.logInfo`

***

### logError() {#logerror}

> **logError**(`error`): `Promise`\<`void`\>

Log error.

#### Parameters

##### error

`IError`

The error to log.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the error has been logged.

#### Implementation of

`IEngineCore.logError`

***

### getConfig() {#getconfig}

> **getConfig**(): `C`

Get the config for the engine.

#### Returns

`C`

The config for the engine.

#### Implementation of

`IEngineCore.getConfig`

***

### getState() {#getstate}

> **getState**(): `S`

Get the state of the engine.

#### Returns

`S`

The state of the engine.

#### Implementation of

`IEngineCore.getState`

***

### setStateDirty() {#setstatedirty}

> **setStateDirty**(): `void`

Set the state to dirty so it gets saved.

#### Returns

`void`

#### Implementation of

`IEngineCore.setStateDirty`

***

### getRegisteredInstances() {#getregisteredinstances}

> **getRegisteredInstances**(): `object`

Get all the registered instances.

#### Returns

`object`

The registered instances.

#### Implementation of

`IEngineCore.getRegisteredInstances`

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

#### Implementation of

`IEngineCore.getRegisteredInstanceType`

***

### getRegisteredInstanceTypeOptional() {#getregisteredinstancetypeoptional}

> **getRegisteredInstanceTypeOptional**(`componentConnectorType`, `features?`): `string` \| `undefined`

Get the registered instance type for the component/connector if it exists.

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

#### Implementation of

`IEngineCore.getRegisteredInstanceTypeOptional`

***

### getRegisteredLoggerType() {#getregisteredloggertype}

> **getRegisteredLoggerType**(`componentName`): `string` \| `undefined`

Get the registered logger for the component/connector.

#### Parameters

##### componentName

`string`

The name of the component to get the logger for.

#### Returns

`string` \| `undefined`

The logger type name if one is registered and not silenced.

#### Implementation of

`IEngineCore.getRegisteredLoggerType`

***

### getRegisteredComponents() {#getregisteredcomponents}

> **getRegisteredComponents**(): `Promise`\<`object`[]\>

Get the registered components.

#### Returns

`Promise`\<`object`[]\>

The registered components.

#### Implementation of

`IEngineCore.getRegisteredComponents`

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

A promise that resolves when the component has been registered.

#### Implementation of

`IEngineCore.addRegisteredComponent`

***

### getCloneData() {#getclonedata}

> **getCloneData**(): `IEngineCoreClone`\<`C`, `S`\>

Get the data required to create a clone of the engine.

#### Returns

`IEngineCoreClone`\<`C`, `S`\>

The clone data.

#### Implementation of

`IEngineCore.getCloneData`

***

### populateClone() {#populateclone}

> **populateClone**(`cloneData`, `contextIds?`, `silent?`): `void`

Populate the engine from the clone data.

#### Parameters

##### cloneData

`IEngineCoreClone`\<`C`, `S`\>

The clone data to populate from.

##### contextIds?

`IContextIds`

The context IDs to use for the clone.

##### silent?

`boolean`

Should the clone be silent.

#### Returns

`void`

#### Implementation of

`IEngineCore.populateClone`
