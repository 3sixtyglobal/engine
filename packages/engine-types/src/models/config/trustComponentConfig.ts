// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITrustServiceConstructorOptions } from "@twin.org/trust-service";
import type { TrustComponentType } from "../types/trustComponentType.js";

/**
 * Trust component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TrustComponentConfig = {
	type: typeof TrustComponentType.Service;
	options?: ITrustServiceConstructorOptions;
};
