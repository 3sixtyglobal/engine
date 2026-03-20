# Interface: IEngineModuleConfig

Configuration for an engine module.

## Properties

### id {#id}

> **id**: `string`

The unique identifier for the module.

***

### moduleName {#modulename}

> **moduleName**: `string`

The module that implements the additional component.

***

### className {#classname}

> **className**: `string`

The class name of the additional component.

***

### dependencies? {#dependencies}

> `optional` **dependencies?**: `object`[]

Additional dependencies required by the component.

#### propertyName

> **propertyName**: `string`

#### componentName

> **componentName**: `string`

#### features?

> `optional` **features?**: `string`[]

#### isOptional?

> `optional` **isOptional?**: `boolean`

***

### config? {#config}

> `optional` **config?**: `unknown`

Additional configuration for the component.
