// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { mkdir, rm } from "node:fs/promises";
import { AuthenticationGeneratorFactory } from "@twin.org/api-models";
import { ContextIdHandlerFactory, ContextIdKeys, ContextIdStore } from "@twin.org/context";
import { ComponentFactory, Factory, I18n } from "@twin.org/core";
import { MemoryStateStorage } from "@twin.org/engine-core";
import coreLocales from "@twin.org/engine-core/locales/en.json" with { type: "json" };
import {
	AttestationComponentType,
	AttestationConnectorType,
	AuditableItemGraphComponentType,
	AuditableItemStreamComponentType,
	AuthenticationGeneratorComponentType,
	BackgroundTaskComponentType,
	BlobStorageComponentType,
	BlobStorageConnectorType,
	ContextIdHandlerComponentType,
	DataConverterConnectorType,
	DataExtractorConnectorType,
	DataProcessingComponentType,
	DataSpaceConnectorComponentType,
	DocumentManagementComponentType,
	EntityStorageComponentType,
	EntityStorageConnectorType,
	EventBusComponentType,
	EventBusConnectorType,
	FaucetConnectorType,
	FederatedCatalogueComponentType,
	FederatedCatalogueFilterComponentType,
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	IdentityResolverComponentType,
	IdentityResolverConnectorType,
	type IEngineConfig,
	ImmutableProofComponentType,
	LoggingComponentType,
	LoggingConnectorType,
	MessagingAdminComponentType,
	MessagingComponentType,
	MessagingEmailConnectorType,
	MessagingPushNotificationConnectorType,
	MessagingSmsConnectorType,
	NftComponentType,
	NftConnectorType,
	RightsManagementDapComponentType,
	RightsManagementDarpComponentType,
	RightsManagementPapComponentType,
	RightsManagementPdpComponentType,
	RightsManagementPepComponentType,
	RightsManagementPipComponentType,
	RightsManagementPmpComponentType,
	RightsManagementPnapComponentType,
	RightsManagementPnpComponentType,
	RightsManagementPxpComponentType,
	SynchronisedStorageComponentType,
	TaskSchedulerComponentType,
	TelemetryComponentType,
	TelemetryConnectorType,
	VaultConnectorType,
	VerifiableStorageComponentType,
	VerifiableStorageConnectorType,
	WalletConnectorType
} from "@twin.org/engine-types";
import typeLocales from "@twin.org/engine-types/locales/en.json" with { type: "json" };
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { FederatedCatalogueFilterFactory } from "@twin.org/federated-catalogue-models";
import { nameof } from "@twin.org/nameof";
import type {
	IDataAccessPointComponent,
	IPolicyExecutionPointComponent,
	IPolicyInformationPointComponent,
	IPolicyNegotiationPointComponent
} from "@twin.org/rights-management-models";
import { Engine } from "../src/engine.js";

/**
 * Class representing information for a test entity.
 */
@entity()
export class TestEntity {
	/**
	 * The id for the entity.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;
}

describe("engine", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", { ...coreLocales, ...typeLocales });

		ContextIdStore.getContextIds = vi.fn().mockImplementation(() => ({ node: "did:iota:0x123" }));
	});

	beforeEach(async () => {
		Factory.clearFactories();
		await mkdir("tests/.tmp", { recursive: true });
	});

	afterEach(async () => {
		await rm("tests/.tmp", { recursive: true });
	});

	test("Can start engine with no config", async () => {
		const engine = new Engine();
		const canContinue = await engine.start();
		await engine.stop();

		expect(canContinue).toEqual(true);
		expect(engine).toBeDefined();
	});

	test("Can start engine with empty config", async () => {
		const engine = new Engine({ config: { types: {} } });
		const canContinue = await engine.start();
		await engine.stop();

		expect(engine).toBeDefined();
		expect(canContinue).toEqual(true);
	});

	test("Can start engine with config", async () => {
		let calledCustomBootstrap = false;

		const engine = new Engine({
			config: {
				debug: true,
				types: {
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [{ type: LoggingComponentType.Service }],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [{ type: TelemetryComponentType.Service }],
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
					immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [{ type: IdentityComponentType.Service }],
					identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
					identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [{ type: NftComponentType.Service }],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [{ type: AttestationComponentType.Service }],
					auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
					auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
					documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
					authenticationGeneratorComponent: [
						{
							type: AuthenticationGeneratorComponentType.VerifiableCredential,
							options: { config: { verificationMethodId: "my-key" } },
							features: ["verifiable-credential"]
						}
					],
					rightsManagementPapComponent: [
						{
							type: RightsManagementPapComponentType.Service
						}
					],
					rightsManagementPepComponent: [
						{
							type: RightsManagementPepComponentType.Service
						}
					],
					rightsManagementPdpComponent: [
						{
							type: RightsManagementPdpComponentType.Service
						}
					],
					rightsManagementPipComponent: [
						{
							type: RightsManagementPipComponentType.Service,
							options: {
								informationModulesConfig: [
									{
										id: "static",
										moduleName: "@twin.org/rights-management-pip-service",
										className: "StaticPolicyInformationSource",
										dependencies: [
											{
												propertyName: "loggingComponentType",
												componentName: "loggingComponent"
											}
										]
									},
									{
										id: "identity",
										moduleName: "@twin.org/rights-management-pip-service",
										className: "IdentityPolicyInformationSource",
										dependencies: [
											{
												propertyName: "loggingComponentType",
												componentName: "loggingComponent"
											},
											{
												propertyName: "identityResolverComponentType",
												componentName: "identityResolverComponent"
											}
										]
									}
								]
							}
						}
					],
					rightsManagementPxpComponent: [
						{
							type: RightsManagementPxpComponentType.Service,
							options: {
								actionModulesConfig: [
									{
										id: "logging",
										moduleName: "@twin.org/rights-management-pxp-service",
										className: "LoggingPolicyExecutionAction",
										dependencies: [
											{
												propertyName: "loggingComponentType",
												componentName: "loggingComponent"
											}
										]
									}
								]
							}
						}
					],
					rightsManagementPmpComponent: [
						{
							type: RightsManagementPmpComponentType.Service
						}
					],
					rightsManagementPnpComponent: [
						{
							type: RightsManagementPnpComponentType.Service,
							options: {
								config: {
									baseCallbackUrl: "http://localhost:3000",
									negotiationComponentCreator: async () =>
										({}) as unknown as IPolicyNegotiationPointComponent
								}
							}
						}
					],
					rightsManagementPnapComponent: [
						{
							type: RightsManagementPnapComponentType.Service
						}
					],
					rightsManagementDapComponent: [
						{
							type: RightsManagementDapComponentType.Service
						}
					],
					rightsManagementDarpComponent: [
						{
							type: RightsManagementDarpComponentType.Service,
							options: {
								config: {
									dataAccessComponentCreator: async () =>
										({}) as unknown as IDataAccessPointComponent
								}
							}
						}
					],
					taskSchedulerComponent: [
						{
							type: TaskSchedulerComponentType.Service
						}
					],
					synchronisedStorageComponent: [
						{
							type: SynchronisedStorageComponentType.Service,
							options: { config: { verifiableStorageKeyId: "testnet" } }
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: {}
						}
					],
					federatedCatalogueFilterComponent: [
						{
							type: FederatedCatalogueFilterComponentType.FilterByExample,
							options: {}
						}
					],
					dataSpaceConnectorComponent: [
						{
							type: DataSpaceConnectorComponentType.Service
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});

		const canContinue = await engine.start();
		expect(canContinue).toEqual(true);

		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"engine-logging-service",
			"logging-service",
			"background-task-service",
			"task-scheduler-service",
			"event-bus-service",
			"telemetry-service",
			"messaging-admin-service",
			"messaging-service",
			"blob-storage-service",
			"verifiable-storage-service",
			"identity-service",
			"identity-resolver-service",
			"identity-profile-service",
			"nft-service",
			"immutable-proof-service",
			"attestation-service",
			"auditable-item-graph-service",
			"auditable-item-stream-service",
			"data-processing-service",
			"document-management-service",
			"policy-administration-point-service",
			"policy-management-point-service",
			"policy-execution-point-service",
			"policy-information-point-service",
			"policy-decision-point-service",
			"policy-enforcement-point-service",
			"policy-negotiation-admin-point-service",
			"policy-negotiation-point-service",
			"data-access-point-service",
			"data-access-request-point-service",
			"synchronised-storage-service",
			"federated-catalogue-service",
			"data-space-connector-service"
		]);

		expect(EntitySchemaFactory.names()).toEqual([
			"BackgroundTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"EmailEntry",
			"SmsEntry",
			"PushNotificationDeviceEntry",
			"PushNotificationMessageEntry",
			"TemplateEntry",
			"VaultKey",
			"VaultSecret",
			"BlobStorageEntry",
			"VerifiableItem",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft",
			"ImmutableProof",
			"AuditableItemGraphVertex",
			"AuditableItemGraphAlias",
			"AuditableItemGraphResource",
			"AuditableItemGraphEdge",
			"AuditableItemGraphChangeset",
			"AuditableItemGraphPatch",
			"AuditableItemStream",
			"AuditableItemStreamEntry",
			"ExtractionRuleGroup",
			"ExtractionRule",
			"OdrlPolicy",
			"PolicyNegotiation",
			"SyncSnapshotEntry",
			"Dataset",
			"ActivityLogDetails",
			"ActivityTask"
		]);

		expect(engine).toBeDefined();
		expect(calledCustomBootstrap).toBeDefined();

		const pip = ComponentFactory.get<IPolicyInformationPointComponent>(
			"policy-information-point-service"
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((pip as any)._sources.length).toEqual(2);

		const pxp = ComponentFactory.get<IPolicyExecutionPointComponent>(
			"policy-execution-point-service"
		);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((pxp as any)._executionActions.before.length).toEqual(1);

		expect(AuthenticationGeneratorFactory.names()).toEqual([
			"verifiable-credential-authentication-generator"
		]);

		expect(FederatedCatalogueFilterFactory.names()).toEqual(["FilterByExample"]);
	});

	test("Can start engine with custom entity storage", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				types: {
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					entityStorageComponent: [
						{
							type: EntityStorageComponentType.Service,
							options: {
								entityStorageType: nameof<TestEntity>(),
								partitionContextIds: [ContextIdKeys.Node]
							}
						}
					]
				}
			}
		});

		const canContinue = await engine.start();
		await engine.stop();

		expect(canContinue).toEqual(true);
		expect(ComponentFactory.names()).toEqual(["engine-logging-service", "test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual(["TestEntity"]);
	});

	test("Can start engine with custom entity storage and custom store", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				silent: true,
				types: {
					entityStorageConnector: [
						{ type: EntityStorageConnectorType.Memory },
						{
							type: EntityStorageConnectorType.File,
							options: {
								config: {
									directory: "tests/.tmp"
								}
							},
							overrideInstanceType: "test-entity"
						}
					],
					entityStorageComponent: [
						{
							type: EntityStorageComponentType.Service,
							options: {
								entityStorageType: nameof<TestEntity>(),
								partitionContextIds: [ContextIdKeys.Node]
							}
						}
					]
				}
			}
		});
		const canContinue = await engine.start();
		await engine.stop();

		expect(canContinue).toEqual(true);
		expect(ComponentFactory.names()).toEqual(["engine-logging-service", "test-entity"]);
		expect(EntitySchemaFactory.names()).toEqual(["TestEntity"]);

		const service = ComponentFactory.get<IEntityStorageComponent<TestEntity>>("test-entity");
		await service.set({ id: "test" });

		const item = await service.get("test");
		expect(item?.id).toEqual("test");
	});

	test("Can clone the engine", async () => {
		const engine = new Engine({
			config: {
				debug: true,
				types: {
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [{ type: LoggingComponentType.Service }],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [{ type: EventBusComponentType.Service }],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [{ type: TelemetryComponentType.Service }],
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
					immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [{ type: IdentityComponentType.Service }],
					identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
					identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [{ type: NftComponentType.Service }],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [{ type: AttestationComponentType.Service }],
					auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
					auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
					documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
					authenticationGeneratorComponent: [
						{
							type: AuthenticationGeneratorComponentType.VerifiableCredential,
							options: { config: { verificationMethodId: "my-key" } },
							features: ["verifiable-credential"]
						}
					],
					rightsManagementPapComponent: [
						{
							type: RightsManagementPapComponentType.Service
						}
					],
					rightsManagementPepComponent: [
						{
							type: RightsManagementPepComponentType.Service
						}
					],
					rightsManagementPdpComponent: [
						{
							type: RightsManagementPdpComponentType.Service
						}
					],
					rightsManagementPipComponent: [
						{
							type: RightsManagementPipComponentType.Service
						}
					],
					rightsManagementPxpComponent: [
						{
							type: RightsManagementPxpComponentType.Service
						}
					],
					rightsManagementPmpComponent: [
						{
							type: RightsManagementPmpComponentType.Service
						}
					],
					rightsManagementPnpComponent: [
						{
							type: RightsManagementPnpComponentType.Service,
							options: {
								config: {
									baseCallbackUrl: "http://localhost:3000",
									negotiationComponentCreator: async () =>
										({}) as unknown as IPolicyNegotiationPointComponent
								}
							}
						}
					],
					rightsManagementPnapComponent: [
						{
							type: RightsManagementPnapComponentType.Service
						}
					],
					rightsManagementDapComponent: [
						{
							type: RightsManagementDapComponentType.Service
						}
					],
					rightsManagementDarpComponent: [
						{
							type: RightsManagementDarpComponentType.Service,
							options: {
								config: {
									dataAccessComponentCreator: async () =>
										({}) as unknown as IDataAccessPointComponent
								}
							}
						}
					],
					taskSchedulerComponent: [
						{
							type: TaskSchedulerComponentType.Service
						}
					],
					synchronisedStorageComponent: [
						{
							type: SynchronisedStorageComponentType.Service,
							options: { config: { verifiableStorageKeyId: "testnet" } }
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.Service,
							options: {}
						}
					],
					federatedCatalogueFilterComponent: [
						{
							type: FederatedCatalogueFilterComponentType.FilterByExample,
							options: {}
						}
					],

					dataSpaceConnectorComponent: [
						{
							type: DataSpaceConnectorComponentType.Service
						}
					],
					contextIdHandlerComponent: [
						{
							type: ContextIdHandlerComponentType.Did,
							features: ["did"]
						},
						{
							type: ContextIdHandlerComponentType.Tenant,
							features: ["tenant"]
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage()
		});

		engine.addContextIdKey(ContextIdKeys.Node, ["did"]);
		engine.addContextIdKey(ContextIdKeys.Tenant, ["tenant"]);

		const canContinue = await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData);

		const canContinue2 = await clone.start();

		expect(canContinue).toEqual(true);
		expect(canContinue2).toEqual(true);
		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getRegisteredInstances()).toEqual(engine.getRegisteredInstances());

		expect(ContextIdHandlerFactory.names()).toEqual(["node", "tenant"]);
		expect(ContextIdHandlerFactory.get("node").className()).toEqual("DidContextIdHandler");
		expect(ContextIdHandlerFactory.get("tenant").className()).toEqual("TenantIdContextIdHandler");
	});

	test("Can clone the engine and silence it", async () => {
		const config: IEngineConfig = {
			debug: true,
			silent: false,
			types: {
				loggingConnector: [{ type: LoggingConnectorType.Console }],
				loggingComponent: [{ type: LoggingComponentType.Service }],
				entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
				blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
				blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
				backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
				eventBusConnector: [{ type: EventBusConnectorType.Local }],
				eventBusComponent: [{ type: EventBusComponentType.Service }],
				telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
				telemetryComponent: [{ type: TelemetryComponentType.Service }],
				messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
				messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
				messagingPushNotificationConnector: [
					{ type: MessagingPushNotificationConnectorType.EntityStorage }
				],
				messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
				messagingComponent: [{ type: MessagingComponentType.Service }],
				vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
				verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
				verifiableStorageComponent: [{ type: VerifiableStorageComponentType.Service }],
				immutableProofComponent: [{ type: ImmutableProofComponentType.Service }],
				walletConnector: [{ type: WalletConnectorType.EntityStorage }],
				faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
				identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
				identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
				identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
				identityComponent: [{ type: IdentityComponentType.Service }],
				identityResolverComponent: [{ type: IdentityResolverComponentType.Service }],
				identityProfileComponent: [{ type: IdentityProfileComponentType.Service }],
				nftConnector: [{ type: NftConnectorType.EntityStorage }],
				nftComponent: [{ type: NftComponentType.Service }],
				attestationConnector: [{ type: AttestationConnectorType.Nft }],
				attestationComponent: [{ type: AttestationComponentType.Service }],
				auditableItemGraphComponent: [{ type: AuditableItemGraphComponentType.Service }],
				auditableItemStreamComponent: [{ type: AuditableItemStreamComponentType.Service }],
				dataConverterConnector: [
					{ type: DataConverterConnectorType.Json },
					{ type: DataConverterConnectorType.Xml }
				],
				dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
				dataProcessingComponent: [{ type: DataProcessingComponentType.Service }],
				documentManagementComponent: [{ type: DocumentManagementComponentType.Service }],
				authenticationGeneratorComponent: [
					{
						type: AuthenticationGeneratorComponentType.VerifiableCredential,
						options: { config: { verificationMethodId: "my-key" } },
						features: ["verifiable-credential"]
					}
				],
				rightsManagementPapComponent: [
					{
						type: RightsManagementPapComponentType.Service
					}
				],
				rightsManagementPepComponent: [
					{
						type: RightsManagementPepComponentType.Service
					}
				],
				rightsManagementPdpComponent: [
					{
						type: RightsManagementPdpComponentType.Service
					}
				],
				rightsManagementPipComponent: [
					{
						type: RightsManagementPipComponentType.Service
					}
				],
				rightsManagementPxpComponent: [
					{
						type: RightsManagementPxpComponentType.Service
					}
				],
				rightsManagementPmpComponent: [
					{
						type: RightsManagementPmpComponentType.Service
					}
				],
				rightsManagementPnpComponent: [
					{
						type: RightsManagementPnpComponentType.Service,
						options: {
							config: {
								baseCallbackUrl: "http://localhost:3000",
								negotiationComponentCreator: async () =>
									({}) as unknown as IPolicyNegotiationPointComponent
							}
						}
					}
				],
				rightsManagementPnapComponent: [
					{
						type: RightsManagementPnapComponentType.Service
					}
				],
				rightsManagementDapComponent: [
					{
						type: RightsManagementDapComponentType.Service
					}
				],
				rightsManagementDarpComponent: [
					{
						type: RightsManagementDarpComponentType.Service,
						options: {
							config: {
								dataAccessComponentCreator: async () => ({}) as unknown as IDataAccessPointComponent
							}
						}
					}
				],
				taskSchedulerComponent: [
					{
						type: TaskSchedulerComponentType.Service
					}
				],
				synchronisedStorageComponent: [
					{
						type: SynchronisedStorageComponentType.Service,
						options: { config: { verifiableStorageKeyId: "testnet" } }
					}
				],
				federatedCatalogueComponent: [
					{
						type: FederatedCatalogueComponentType.Service,
						options: {}
					}
				],
				federatedCatalogueFilterComponent: [
					{
						type: FederatedCatalogueFilterComponentType.FilterByExample,
						options: {}
					}
				],

				dataSpaceConnectorComponent: [
					{
						type: DataSpaceConnectorComponentType.Service
					}
				]
			}
		};
		const engine = new Engine({
			config,
			stateStorage: new MemoryStateStorage()
		});

		const canContinue = await engine.start();
		await engine.stop();

		Factory.clearFactories();

		const cloneData = engine.getCloneData();
		const clone = new Engine();
		clone.populateClone(cloneData, true);
		const canContinue2 = await clone.start();

		expect(canContinue).toEqual(true);
		expect(canContinue2).toEqual(true);
		expect(clone.getConfig()).toEqual(engine.getConfig());
		expect(clone.getState()).toEqual(engine.getState());
		expect(clone.getRegisteredInstances()).toEqual(engine.getRegisteredInstances());
	});

	test("Can start engine with REST client config", async () => {
		let calledCustomBootstrap = false;

		const engine = new Engine({
			config: {
				debug: true,
				types: {
					loggingConnector: [{ type: LoggingConnectorType.Console }],
					loggingComponent: [
						{
							type: LoggingComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					entityStorageConnector: [{ type: EntityStorageConnectorType.Memory }],
					blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
					blobStorageComponent: [
						{
							type: BlobStorageComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
					eventBusConnector: [{ type: EventBusConnectorType.Local }],
					eventBusComponent: [
						{
							type: EventBusComponentType.SocketClient,
							options: { config: { endpoint: "http://localhost:3000" } }
						}
					],
					telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
					telemetryComponent: [
						{
							type: TelemetryComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
					messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
					messagingPushNotificationConnector: [
						{ type: MessagingPushNotificationConnectorType.EntityStorage }
					],
					messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
					messagingComponent: [{ type: MessagingComponentType.Service }],
					vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
					verifiableStorageConnector: [{ type: VerifiableStorageConnectorType.EntityStorage }],
					verifiableStorageComponent: [
						{
							type: VerifiableStorageComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					immutableProofComponent: [
						{
							type: ImmutableProofComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					walletConnector: [{ type: WalletConnectorType.EntityStorage }],
					faucetConnector: [{ type: FaucetConnectorType.EntityStorage }],
					identityConnector: [{ type: IdentityConnectorType.EntityStorage }],
					identityResolverConnector: [{ type: IdentityResolverConnectorType.EntityStorage }],
					identityProfileConnector: [{ type: IdentityProfileConnectorType.EntityStorage }],
					identityComponent: [
						{
							type: IdentityComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					identityResolverComponent: [
						{
							type: IdentityResolverComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					identityProfileComponent: [
						{
							type: IdentityProfileComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					nftConnector: [{ type: NftConnectorType.EntityStorage }],
					nftComponent: [
						{ type: NftComponentType.RestClient, options: { endpoint: "http://localhost:3000" } }
					],
					attestationConnector: [{ type: AttestationConnectorType.Nft }],
					attestationComponent: [
						{
							type: AttestationComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					auditableItemGraphComponent: [
						{
							type: AuditableItemGraphComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					auditableItemStreamComponent: [
						{
							type: AuditableItemStreamComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					dataConverterConnector: [
						{ type: DataConverterConnectorType.Json },
						{ type: DataConverterConnectorType.Xml }
					],
					dataExtractorConnector: [{ type: DataExtractorConnectorType.JsonPath }],
					dataProcessingComponent: [
						{
							type: DataProcessingComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					documentManagementComponent: [
						{
							type: DocumentManagementComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					authenticationGeneratorComponent: [
						{
							type: AuthenticationGeneratorComponentType.VerifiableCredential,
							options: { config: { verificationMethodId: "my-key" } },
							features: ["verifiable-credential"]
						}
					],
					rightsManagementPapComponent: [
						{
							type: RightsManagementPapComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					rightsManagementPepComponent: [
						{
							type: RightsManagementPepComponentType.Service
						}
					],
					rightsManagementPdpComponent: [
						{
							type: RightsManagementPdpComponentType.Service
						}
					],
					rightsManagementPipComponent: [
						{
							type: RightsManagementPipComponentType.Service
						}
					],
					rightsManagementPxpComponent: [
						{
							type: RightsManagementPxpComponentType.Service
						}
					],
					rightsManagementPmpComponent: [
						{
							type: RightsManagementPmpComponentType.Service
						}
					],
					rightsManagementPnpComponent: [
						{
							type: RightsManagementPnpComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					rightsManagementPnapComponent: [
						{
							type: RightsManagementPnapComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					rightsManagementDapComponent: [
						{
							type: RightsManagementDapComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					rightsManagementDarpComponent: [
						{
							type: RightsManagementDarpComponentType.Service,
							options: {
								config: {
									dataAccessComponentCreator: async () =>
										({}) as unknown as IDataAccessPointComponent
								}
							}
						}
					],
					taskSchedulerComponent: [
						{
							type: TaskSchedulerComponentType.Service
						}
					],
					synchronisedStorageComponent: [
						{
							type: SynchronisedStorageComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					federatedCatalogueComponent: [
						{
							type: FederatedCatalogueComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						}
					],
					dataSpaceConnectorComponent: [
						{
							type: DataSpaceConnectorComponentType.RestClient,
							options: { endpoint: "http://localhost:3000" }
						},
						{
							type: DataSpaceConnectorComponentType.SocketClient,
							options: { config: { endpoint: "http://localhost:3000" } }
						}
					]
				}
			},
			stateStorage: new MemoryStateStorage(),
			customBootstrap: async () => {
				calledCustomBootstrap = true;
			}
		});

		const canContinue = await engine.start();
		await engine.stop();

		expect(ComponentFactory.names()).toEqual([
			"engine-logging-service",
			"logging-rest-client",
			"background-task-service",
			"task-scheduler-service",
			"event-bus-socket-client",
			"telemetry-rest-client",
			"messaging-admin-service",
			"messaging-service",
			"blob-storage-rest-client",
			"verifiable-storage-rest-client",
			"identity-rest-client",
			"identity-resolver-rest-client",
			"identity-profile-rest-client",
			"nft-rest-client",
			"immutable-proof-rest-client",
			"attestation-rest-client",
			"auditable-item-graph-rest-client",
			"auditable-item-stream-rest-client",
			"data-processing-rest-client",
			"document-management-rest-client",
			"policy-administration-point-rest-client",
			"policy-management-point-service",
			"policy-execution-point-service",
			"policy-information-point-service",
			"policy-decision-point-service",
			"policy-enforcement-point-service",
			"policy-negotiation-admin-point-rest-client",
			"policy-negotiation-point-rest-client",
			"data-access-point-rest-client",
			"data-access-request-point-service",
			"synchronised-storage-rest-client",
			"federated-catalogue-rest-client",
			"data-space-connector-rest-client",
			"data-space-connector-socket-client"
		]);

		expect(EntitySchemaFactory.names()).toEqual([
			"BackgroundTask",
			"TelemetryMetric",
			"TelemetryMetricValue",
			"EmailEntry",
			"SmsEntry",
			"PushNotificationDeviceEntry",
			"PushNotificationMessageEntry",
			"TemplateEntry",
			"VaultKey",
			"VaultSecret",
			"VerifiableItem",
			"WalletAddress",
			"IdentityDocument",
			"IdentityProfile",
			"Nft"
		]);

		expect(engine).toBeDefined();
		expect(canContinue).toEqual(true);
		expect(calledCustomBootstrap).toBeDefined();
	});
});
