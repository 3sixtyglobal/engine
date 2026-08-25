# Variable: EngineCloneMode

> `const` **EngineCloneMode**: `object`

Controls whether a type config entry is included when creating a clone.

## Type Declaration

### Always {#always}

> `readonly` **Always**: `"always"` = `"always"`

Always include this entry in a clone, even when a types allowlist is provided.

### Optional {#optional}

> `readonly` **Optional**: `"optional"` = `"optional"`

Include this entry in a clone unless excluded by a types allowlist.

### Never {#never}

> `readonly` **Never**: `"never"` = `"never"`

Never include this entry in a clone.
