# Variable: TracingConnectorType

> `const` **TracingConnectorType**: `object`

Tracing connector types.

## Type Declaration

### EntityStorage {#entitystorage}

> `readonly` **EntityStorage**: `"entity-storage"` = `"entity-storage"`

Entity storage.

### OpenTelemetry {#opentelemetry}

> `readonly` **OpenTelemetry**: `"open-telemetry"` = `"open-telemetry"`

OpenTelemetry.

### Console {#console}

> `readonly` **Console**: `"console"` = `"console"`

Console for logging traces to the console.

### Multi {#multi}

> `readonly` **Multi**: `"multi"` = `"multi"`

Multi combines other telemetry connectors.

### Silent {#silent}

> `readonly` **Silent**: `"silent"` = `"silent"`

Silent for a noop connector.
