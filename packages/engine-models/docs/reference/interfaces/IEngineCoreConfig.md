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

### silentLoggers? {#silentloggers}

> `optional` **silentLoggers?**: `string`[]

The loggers to disable output for.

***

### types {#types}

> **types**: `object`

The types to initialise in the engine.

#### Index Signature

\[`type`: `string`\]: [`IEngineCoreTypeConfig`](../type-aliases/IEngineCoreTypeConfig.md)[] \| `undefined`
