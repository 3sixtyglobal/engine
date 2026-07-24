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

### silentLoggers? {#silentloggers}

> `optional` **silentLoggers?**: `string`[]

The loggers to disable output for.

***

### types {#types}

> **types**: `object`

The types to initialise in the engine.

#### Index Signature

\[`type`: `string`\]: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[] \| `undefined`
