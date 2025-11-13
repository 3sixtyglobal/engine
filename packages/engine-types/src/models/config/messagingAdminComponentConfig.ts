// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IMessagingAdminServiceConstructorOptions } from "@twin.org/messaging-service";
import type { MessagingAdminComponentType } from "../types/messagingAdminComponentType.js";

/**
 * Messaging admin component config types.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessagingAdminComponentConfig = {
	type: typeof MessagingAdminComponentType.Service;
	options?: IMessagingAdminServiceConstructorOptions;
};
