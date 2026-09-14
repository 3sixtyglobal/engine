# Interface: IEngineCoreConfig

Configuration for the engine core.

## Properties

### debug? {#debug}

> `optional` **debug?**: `boolean`

Start the engine in debug mode.

#### Default

```ts
false
```

***

### silent? {#silent}

> `optional` **silent?**: `boolean`

Disable output to the console.

#### Default

```ts
false
```

***

### logLevel? {#loglevel}

> `optional` **logLevel?**: [`EngineLogLevel`](../type-aliases/EngineLogLevel.md)

The log level for the engine logger, takes precedence over silent when set.

#### Default

```ts
all
```

***

### silentComponents? {#silentcomponents}

> `optional` **silentComponents?**: `object`

The components to disable output for.

#### logging?

> `optional` **logging?**: `string`[]

#### telemetry?

> `optional` **telemetry?**: `string`[]

#### tracing?

> `optional` **tracing?**: `string`[]

***

### facades? {#facades}

> `optional` **facades?**: `object`

The facades to activate, keyed by the type name of the factory they apply to.

#### Index Signature

\[`factoryTypeName`: `string`\]: [`IEngineFacadeConfig`](IEngineFacadeConfig.md)[]

***

### types {#types}

> **types**: `object`

The types to initialise in the engine.

#### Index Signature

\[`type`: `string`\]: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[] \| `undefined`
