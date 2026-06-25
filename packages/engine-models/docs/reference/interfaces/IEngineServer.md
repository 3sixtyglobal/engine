# Interface: IEngineServer

Interface describing the engine server methods.

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

***

### start() {#start}

> **start**(): `Promise`\<`void`\>

Start the engine server.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the server has started and is ready to accept requests.

***

### stop() {#stop}

> **stop**(): `Promise`\<`void`\>

Stop the engine server.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the server has stopped and all connections are closed.
