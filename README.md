# TWIN Engine

This repository provides a modular engine stack for building, configuring, and running services through a consistent set of runtime, model, and type packages. Each package has a focused responsibility, from shared contracts and core lifecycle orchestration through to server routing and fully assembled runtime entry points.

Together, the packages are designed to reduce integration effort across environments by keeping configuration patterns, component registration, and execution flow aligned. This allows teams to compose capabilities with predictable behaviour while retaining flexibility for different deployment styles.

## Packages

- [engine-models](packages/engine-models/README.md) - Shared contracts and factory interfaces for composing engine core and server implementations.
- [engine-core](packages/engine-core/README.md) - Core runtime lifecycle and state orchestration for engine instances.
- [engine-types](packages/engine-types/README.md) - Component and connector type definitions with configuration helpers for engine composition.
- [engine-server-types](packages/engine-server-types/README.md) - Server-focused component types and configuration models for API routing and hosting.
- [engine](packages/engine/README.md) - Ready-to-use engine runtime that preloads built-in type initialisers.
- [engine-server](packages/engine-server/README.md) - Server runtime that exposes engine components through REST and socket routes.

## Contributing

To contribute to this package see the guidelines for building and publishing in [CONTRIBUTING](./CONTRIBUTING.md)

## Origin

This repository is derived from the original [iotaledger/twin-engine](https://github.com/iotaledger/twin-engine) repository.
