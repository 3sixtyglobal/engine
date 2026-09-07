// Copyright 2026 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig } from "@twin.org/api-models";
import type { IMailStorageServiceConstructorOptions } from "@twin.org/mailbox-service";
import type { MailStorageComponentType } from "../types/mailStorageComponentType.js";

/**
 * Mail storage component config types.
 */
export type MailStorageComponentConfig =
	| {
			type: typeof MailStorageComponentType.Service;
			options?: IMailStorageServiceConstructorOptions;
	  }
	| {
			type: typeof MailStorageComponentType.RestClient;
			options: IBaseRestClientConfig;
	  };
