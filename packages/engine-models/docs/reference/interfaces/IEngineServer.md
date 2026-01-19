# Interface: IEngineServer

Interface describing the engine server methods.

## Methods

### addRestRouteGenerator()

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

### addSocketRouteGenerator()

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

### start()

> **start**(): `Promise`\<`void`\>

Start the engine server.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the engine server.

#### Returns

`Promise`\<`void`\>

Nothing.
