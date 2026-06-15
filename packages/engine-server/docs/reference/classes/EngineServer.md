# Class: EngineServer\<T\>

Server for the engine.

## Type Parameters

### T

`T` *extends* `IEngineServerConfig` = `IEngineServerConfig`

## Implements

- `IEngineServer`

## Constructors

### Constructor

> **new EngineServer**\<`T`\>(`options`): `EngineServer`\<`T`\>

Create a new instance of EngineServer.

#### Parameters

##### options

The options for the engine.

###### engineCore

`IEngineCore`\<`T`\>

The engine core to serve from.

#### Returns

`EngineServer`\<`T`\>

## Properties

### CLASS\_NAME {#class_name}

> `readonly` `static` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### addRestRouteGenerator() {#addrestroutegenerator}

> **addRestRouteGenerator**(`type`, `module`, `method`): `void`

Add a REST route generator.

#### Parameters

##### type

`string`

The type to add the generator for.

##### module

`string`

The module containing the generator.

##### method

`string`

The method to call on the module.

#### Returns

`void`

#### Implementation of

`IEngineServer.addRestRouteGenerator`

***

### addSocketRouteGenerator() {#addsocketroutegenerator}

> **addSocketRouteGenerator**(`type`, `module`, `method`): `void`

Add a socket route generator.

#### Parameters

##### type

`string`

The type to add the generator for.

##### module

`string`

The module containing the generator.

##### method

`string`

The method to call on the module.

#### Returns

`void`

#### Implementation of

`IEngineServer.addSocketRouteGenerator`

***

### getRestRoutes() {#getrestroutes}

> **getRestRoutes**(): `IRestRoute`\<`any`, `any`\>[]

Get the built REST routes.

#### Returns

`IRestRoute`\<`any`, `any`\>[]

The REST routes.

***

### getSocketRoutes() {#getsocketroutes}

> **getSocketRoutes**(): `ISocketRoute`\<`any`, `any`\>[]

Get the built socket routes.

#### Returns

`ISocketRoute`\<`any`, `any`\>[]

The socket routes.

***

### start() {#start}

> **start**(): `Promise`\<`void`\>

Start the engine server.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the server has started and is ready to accept requests.

#### Implementation of

`IEngineServer.start`

***

### stop() {#stop}

> **stop**(): `Promise`\<`void`\>

Stop the engine server.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the server has stopped and all connections are closed.

#### Implementation of

`IEngineServer.stop`
