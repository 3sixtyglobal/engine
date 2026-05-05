# Class: Engine\<C, S\>

The engine with built in types.

## Extends

- `EngineCore`\<`C`, `S`\>

## Type Parameters

### C

`C` *extends* `IEngineConfig` = `IEngineConfig`

### S

`S` *extends* `IEngineState` = `IEngineState`

## Constructors

### Constructor

> **new Engine**\<`C`, `S`\>(`options?`): `Engine`\<`C`, `S`\>

Create a new instance of Engine.

#### Parameters

##### options?

`IEngineCoreOptions`\<`C`, `S`\>

The options for the engine.

#### Returns

`Engine`\<`C`, `S`\>

#### Overrides

`EngineCore<C, S>.constructor`

## Properties

### CLASS\_NAME {#class_name}

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Overrides

`EngineCore.CLASS_NAME`

***

### LOGGING\_COMPONENT\_TYPE\_NAME {#logging_component_type_name}

> `readonly` `static` **LOGGING\_COMPONENT\_TYPE\_NAME**: `string`

Name for the engine logger component, used for direct console logging.

#### Inherited from

`EngineCore.LOGGING_COMPONENT_TYPE_NAME`

***

### LOGGING\_CONNECTOR\_TYPE\_NAME {#logging_connector_type_name}

> `readonly` `static` **LOGGING\_CONNECTOR\_TYPE\_NAME**: `string`

Name for the engine logger connector, used for direct console logging.

#### Inherited from

`EngineCore.LOGGING_CONNECTOR_TYPE_NAME`

***

### \_context {#_context}

> `protected` **\_context**: `IEngineCoreContext`\<`C`, `S`\>

The core context.

#### Inherited from

`EngineCore._context`

***

### \_contextIdKeys {#_contextidkeys}

> `protected` `readonly` **\_contextIdKeys**: `object`[]

The context ID keys.

#### key

> **key**: `string`

#### componentFeatures

> **componentFeatures**: `string`[]

#### Inherited from

`EngineCore._contextIdKeys`

***

### \_contextIds? {#_contextids}

> `protected` `optional` **\_contextIds?**: `IContextIds`

The context IDs.

#### Inherited from

`EngineCore._contextIds`

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

#### Inherited from

`EngineCore.addTypeInitialiser`

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

#### Inherited from

`EngineCore.getTypeConfig`

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

#### Inherited from

`EngineCore.addContextIdKey`

***

### getContextIdKeys() {#getcontextidkeys}

> **getContextIdKeys**(): `string`[]

Get the context ID keys for the engine.

#### Returns

`string`[]

The context IDs keys.

#### Inherited from

`EngineCore.getContextIdKeys`

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

#### Inherited from

`EngineCore.addContextId`

***

### getContextIds() {#getcontextids}

> **getContextIds**(): `IContextIds` \| `undefined`

Get the context IDs for the engine.

#### Returns

`IContextIds` \| `undefined`

The context IDs or undefined if none are set.

#### Inherited from

`EngineCore.getContextIds`

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

#### Inherited from

`EngineCore.start`

***

### stop() {#stop}

> **stop**(): `Promise`\<`void`\>

Stop the engine core.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`EngineCore.stop`

***

### isStarted() {#isstarted}

> **isStarted**(): `boolean`

Is the engine started.

#### Returns

`boolean`

True if the engine is started.

#### Inherited from

`EngineCore.isStarted`

***

### isPrimary() {#isprimary}

> **isPrimary**(): `boolean`

Is this the primary engine instance.

#### Returns

`boolean`

True if the engine is the primary instance.

#### Inherited from

`EngineCore.isPrimary`

***

### isClone() {#isclone}

> **isClone**(): `boolean`

Is this engine instance a clone.

#### Returns

`boolean`

True if the engine instance is a clone.

#### Inherited from

`EngineCore.isClone`

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

#### Inherited from

`EngineCore.logInfo`

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

#### Inherited from

`EngineCore.logError`

***

### getConfig() {#getconfig}

> **getConfig**(): `C`

Get the config for the engine.

#### Returns

`C`

The config for the engine.

#### Inherited from

`EngineCore.getConfig`

***

### getState() {#getstate}

> **getState**(): `S`

Get the state of the engine.

#### Returns

`S`

The state of the engine.

#### Inherited from

`EngineCore.getState`

***

### setStateDirty() {#setstatedirty}

> **setStateDirty**(): `void`

Set the state to dirty so it gets saved.

#### Returns

`void`

#### Inherited from

`EngineCore.setStateDirty`

***

### getRegisteredInstances() {#getregisteredinstances}

> **getRegisteredInstances**(): `object`

Get all the registered instances.

#### Returns

`object`

The registered instances.

#### Inherited from

`EngineCore.getRegisteredInstances`

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

#### Inherited from

`EngineCore.getRegisteredInstanceType`

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

#### Inherited from

`EngineCore.getRegisteredInstanceTypeOptional`

***

### getRegisteredComponents() {#getregisteredcomponents}

> **getRegisteredComponents**(): `Promise`\<`object`[]\>

Get the registered components.

#### Returns

`Promise`\<`object`[]\>

The registered components.

#### Inherited from

`EngineCore.getRegisteredComponents`

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

#### Inherited from

`EngineCore.addRegisteredComponent`

***

### getCloneData() {#getclonedata}

> **getCloneData**(): `IEngineCoreClone`\<`C`, `S`\>

Get the data required to create a clone of the engine.

#### Returns

`IEngineCoreClone`\<`C`, `S`\>

The clone data.

#### Inherited from

`EngineCore.getCloneData`

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

#### Inherited from

`EngineCore.populateClone`
