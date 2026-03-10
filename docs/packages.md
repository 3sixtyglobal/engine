# Engine Packages

## engine-models

This package defines shared contracts and factory interfaces used to assemble runtime implementations. It establishes consistent model boundaries for core and server layers, helping package integrations remain predictable and maintainable as capabilities expand.

- [README](../packages/engine-models/README.md)
- [Examples](../packages/engine-models/docs/examples.md)
- [Changelog](../packages/engine-models/docs/changelog.md)

## engine-core

This package provides runtime lifecycle orchestration, component initialisation, context propagation, and state management primitives. It forms the operational centre of an engine instance and enables higher-level packages to compose behaviour around a stable execution flow.

- [README](../packages/engine-core/README.md)
- [Examples](../packages/engine-core/docs/examples.md)
- [Changelog](../packages/engine-core/docs/changelog.md)

## engine-types

This package supplies component and connector type definitions alongside helpers for composing and merging configuration. It supports consistent wiring of capabilities across multiple domains while keeping configuration intent explicit.

- [README](../packages/engine-types/README.md)
- [Examples](../packages/engine-types/docs/examples.md)
- [Changelog](../packages/engine-types/docs/changelog.md)

## engine-server-types

This package defines server-oriented component and processor types for hosting, authentication, and route processing concerns. It provides the configuration model used to build web-facing runtime behaviour with clear routing semantics.

- [README](../packages/engine-server-types/README.md)
- [Examples](../packages/engine-server-types/docs/examples.md)
- [Changelog](../packages/engine-server-types/docs/changelog.md)

## engine

This package delivers a ready-to-use runtime that extends the core layer with built-in type initialisers. It is intended for projects that want a pre-wired engine foundation with minimal setup.

- [README](../packages/engine/README.md)
- [Examples](../packages/engine/docs/examples.md)
- [Changelog](../packages/engine/docs/changelog.md)

## engine-server

This package exposes runtime functionality through REST and socket routes and integrates web hosting concerns with the engine core. It enables deployment of API-driven services while preserving shared runtime conventions.

- [README](../packages/engine-server/README.md)
- [Examples](../packages/engine-server/docs/examples.md)
- [Changelog](../packages/engine-server/docs/changelog.md)
