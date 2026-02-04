// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { ContextIdKeys, ContextIdStore } from "@twin.org/context";
import { ComponentFactory, Factory, I18n } from "@twin.org/core";
import { Engine } from "@twin.org/engine";
import coreLocales from "@twin.org/engine-core/locales/en.json" with { type: "json" };
import {
	HostingComponentType,
	InformationComponentType,
	RestRouteProcessorType,
	SocketRouteProcessorType,
	type IEngineServerConfig
} from "@twin.org/engine-server-types";
import {
	AttestationComponentType,
	AttestationConnectorType,
	AuditableItemGraphComponentType,
	AuditableItemStreamComponentType,
	BackgroundTaskComponentType,
	BlobStorageComponentType,
	BlobStorageConnectorType,
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
	IdentityComponentType,
	IdentityConnectorType,
	IdentityProfileComponentType,
	IdentityProfileConnectorType,
	IdentityResolverComponentType,
	IdentityResolverConnectorType,
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
	RightsManagementPapComponentType,
	RightsManagementPdpComponentType,
	RightsManagementPepComponentType,
	RightsManagementPipComponentType,
	RightsManagementPmpComponentType,
	RightsManagementPnapComponentType,
	RightsManagementPnpComponentType,
	RightsManagementPolicyArbiterComponentType,
	RightsManagementPolicyEnforcementProcessorComponentType,
	RightsManagementPolicyExecutionActionComponentType,
	RightsManagementPolicyInformationSourceComponentType,
	RightsManagementPolicyNegotiatorComponentType,
	RightsManagementPolicyRequesterComponentType,
	RightsManagementPxpComponentType,
	SynchronisedStorageComponentType,
	TaskSchedulerComponentType,
	TelemetryComponentType,
	TelemetryConnectorType,
	TenantAdminComponentType,
	TrustComponentType,
	TrustGeneratorComponentType,
	TrustVerifierComponentType,
	VaultConnectorType,
	VerifiableStorageComponentType,
	VerifiableStorageConnectorType,
	WalletConnectorType
} from "@twin.org/engine-types";
import engineTypesLocales from "@twin.org/engine-types/locales/en.json" with { type: "json" };
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import type { IPolicyNegotiationPointComponent } from "@twin.org/rights-management-models";
import packageLocales from "../locales/en.json" with { type: "json" };
import { EngineServer } from "../src/engineServer.js";
import {
	addDefaultRestPaths,
	addDefaultSocketPaths
} from "../src/utils/engineServerConfigHelper.js";

const basePort = Math.floor(Math.random() * 1000);
let port = 3000 + basePort;

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

describe("engine-server", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", { ...coreLocales, ...engineTypesLocales, ...packageLocales });

		ContextIdStore.getContextIds = vi.fn().mockImplementation(() => ({ node: "node" }));
	});

	beforeEach(async () => {
		port++;

		Factory.clearFactories();
	});

	test("Can start engine server with no config", async () => {
		const engine = new Engine({ config: { types: {}, web: { port } } });
		const engineServer = new EngineServer({ engineCore: engine });
		await engineServer.start();
		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start engine server with custom rest path", async () => {
		const engine = new Engine({
			config: {
				silent: true,
				types: {
					informationComponent: [
						{
							type: InformationComponentType.Service,
							options: {
								config: {
									serverInfo: {
										name: "foo",
										version: "1"
									}
								}
							},
							restPath: "/foo"
						}
					]
				},
				web: { port }
			}
		});
		const engineServer = new EngineServer({
			engineCore: engine
		});
		await engineServer.start();

		// Give the server a moment to start
		await new Promise(resolve => setTimeout(resolve, 1000));

		const res = await fetch(`http://localhost:${port}/foo/info`);
		expect(await res.json()).toEqual({
			name: "foo",
			version: "1"
		});

		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start engine server with config", async () => {
		const config: IEngineServerConfig = {
			debug: true,
			types: {
				loggingConnector: [{ type: LoggingConnectorType.Console }],
				loggingComponent: [{ type: LoggingComponentType.Service }],
				tenantAdminComponent: [{ type: TenantAdminComponentType.Service }],
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
				trustComponent: [
					{
						type: TrustComponentType.Service
					}
				],
				trustGeneratorComponent: [
					{
						type: TrustGeneratorComponentType.JwtVerifiableCredential,
						options: { config: { verificationMethodId: "foo" } }
					}
				],
				trustVerifierComponent: [
					{
						type: TrustVerifierComponentType.JwtVerifiableCredential
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
								callbackPath: "",
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
				rightsManagementPolicyArbiterComponent: [
					{
						type: RightsManagementPolicyArbiterComponentType.PassThrough
					}
				],
				rightsManagementPolicyEnforcementProcessorComponent: [
					{
						type: RightsManagementPolicyEnforcementProcessorComponentType.PassThrough
					}
				],
				rightsManagementPolicyExecutionActionComponent: [
					{
						type: RightsManagementPolicyExecutionActionComponentType.Logging
					}
				],
				rightsManagementPolicyInformationSourceComponent: [
					{
						type: RightsManagementPolicyInformationSourceComponentType.Identity
					},
					{
						type: RightsManagementPolicyInformationSourceComponentType.Static
					}
				],
				rightsManagementPolicyNegotiatorComponent: [
					{
						type: RightsManagementPolicyNegotiatorComponentType.PassThrough
					}
				],
				rightsManagementPolicyRequesterComponent: [
					{
						type: RightsManagementPolicyRequesterComponentType.PassThrough
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
				dataSpaceConnectorComponent: [
					{
						type: DataSpaceConnectorComponentType.Service
					}
				],
				informationComponent: [
					{
						type: InformationComponentType.Service,
						options: {
							config: {
								serverInfo: {
									name: "foo",
									version: "1"
								}
							}
						}
					}
				],
				hostingComponent: [
					{
						type: HostingComponentType.Service,
						options: {
							config: {
								localOrigin: `http://localhost:${port}`
							}
						}
					}
				],
				restRouteProcessor: [
					{
						type: RestRouteProcessorType.RestRoute
					}
				],
				socketRouteProcessor: [
					{
						type: SocketRouteProcessorType.SocketRoute
					}
				]
			},
			web: { port }
		};
		const engine = new Engine({
			config
		});
		const engineServer = new EngineServer({
			engineCore: engine
		});

		addDefaultRestPaths(config);
		addDefaultSocketPaths(config);
		await engineServer.start();

		const buildRestRoutes = engineServer.getRestRoutes();
		expect(buildRestRoutes.map(r => r.path)).toEqual([
			"/",
			"/favicon.ico",
			"/info",
			"/livez",
			"/health",
			"/spec",
			"/logging",
			"/logging",
			"/tenants",
			"/tenants",
			"/tenants/:id",
			"/tenants/api-key/:apiKey",
			"/tenants/public-origin/:publicOrigin",
			"/tenants/:id",
			"/tenants/:id",
			"/telemetry/metric",
			"/telemetry/metric/:id",
			"/telemetry/metric/:id",
			"/telemetry/metric/:id/value",
			"/telemetry/metric/:id",
			"/telemetry/metric",
			"/telemetry/metric/:id/value",
			"/blob",
			"/blob/:id",
			"/blob/:id/content",
			"/blob/:id",
			"/blob/:id",
			"/blob",
			"/identity",
			"/identity/:identity",
			"/identity/:identity/verification-method",
			"/identity/:identity/verification-method/:verificationMethodId",
			"/identity/:identity/service",
			"/identity/:identity/service/:serviceId",
			"/identity/:identity/verifiable-credential/:verificationMethodId",
			"/identity/verifiable-credential/verify",
			"/identity/:identity/verifiable-credential/revoke/:revocationIndex",
			"/identity/:identity/verifiable-credential/unrevoke/:revocationIndex",
			"/identity/:identity/verifiable-presentation/:verificationMethodId",
			"/identity/verifiable-presentation/verify",
			"/identity/:identity/proof/:verificationMethodId",
			"/identity/proof/verify",
			"/identity/:identity",
			"/identity/profile",
			"/identity/profile",
			"/identity/profile/:identity/public",
			"/identity/profile",
			"/identity/profile",
			"/identity/profile/query",
			"/nft",
			"/nft/:id",
			"/nft/:id",
			"/nft/:id/transfer",
			"/nft/:id",
			"/verifiable",
			"/verifiable/:id",
			"/verifiable/:id",
			"/verifiable/:id",
			"/immutable-proof",
			"/immutable-proof/:id",
			"/immutable-proof/:id/verify",
			"/attestation",
			"/attestation/:id",
			"/attestation/:id/transfer",
			"/attestation/:id",
			"/aig",
			"/aig/:id",
			"/aig/:id",
			"/aig",
			"/ais",
			"/ais/:id",
			"/ais/:id",
			"/ais/:id",
			"/ais",
			"/ais/:id",
			"/ais/:id/:entryId",
			"/ais/:id/:entryId/object",
			"/ais/:id/:entryId",
			"/ais/:id/:entryId",
			"/ais/:id/entries",
			"/ais/:id/entries/objects",
			"/data-processing/rule-group/:id",
			"/data-processing/rule-group/:id",
			"/data-processing/rule-group/:id",
			"/data-processing/extract",
			"/data-processing/convert",
			"/data-processing/rule-group",
			"/documents",
			"/documents/:auditableItemGraphDocumentId",
			"/documents/:auditableItemGraphDocumentId",
			"/documents/:auditableItemGraphDocumentId/:revision",
			"/documents/:auditableItemGraphDocumentId/:revision",
			"/documents",
			"/rights-management/policy/admin",
			"/rights-management/policy/admin/:id",
			"/rights-management/policy/admin/:id",
			"/rights-management/policy/admin/agreement/:id",
			"/rights-management/policy/admin/offer/:id",
			"/rights-management/policy/admin/set/:id",
			"/rights-management/policy/admin/:id",
			"/rights-management/policy/admin",
			"/rights-management/negotiations/:id",
			"/rights-management/negotiations/request",
			"/rights-management/negotiations/:id/request",
			"/rights-management/negotiations/:id/events",
			"/rights-management/negotiations/:id/agreement/verification",
			"/rights-management/negotiations/:id/termination",
			"/rights-management/negotiations/offers",
			"/rights-management/negotiations/:id/offers",
			"/rights-management/negotiations/:id/agreement",
			"/rights-management/negotiations/admin/:policyId",
			"/rights-management/negotiations/admin/:policyId",
			"/rights-management/negotiations/admin/:policyId",
			"/rights-management/negotiations/admin",
			"/synchronised-storage/sync-changeset",
			"/synchronised-storage/decryption-key",
			"/federated-catalogue/request",
			"/federated-catalogue/datasets/:datasetId",
			"/data-space-connector/notify",
			"/data-space-connector/activity-logs/:id",
			"/data-space-connector/entities",
			"/data-space-connector/entities/query"
		]);

		const buildSocketRoutes = engineServer.getSocketRoutes();
		expect(buildSocketRoutes.map(r => r.path)).toEqual([
			"event-bus/subscribe",
			"event-bus/unsubscribe",
			"data-space-connector/activity-logs/status"
		]);

		// Give the server a moment to start
		await new Promise(resolve => setTimeout(resolve, 1000));

		const res = await fetch(`http://localhost:${port}/info`);
		expect(await res.json()).toEqual({
			name: "foo",
			version: "1"
		});

		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start engine server with custom component and rest path", async () => {
		const engine = new Engine({
			config: {
				types: {
					testType: [{ type: "test-type", restPath: "test", options: { value: 1234 } }]
				},
				web: { port }
			}
		});

		engine.addTypeInitialiser(
			"testType",
			`file://${path.join(__dirname, "testComponent.js")}`,
			"testTypeInitialiser"
		);

		const engineServer = new EngineServer({
			engineCore: engine
		});

		engineServer.addRestRouteGenerator(
			"testType",
			`file://${path.join(__dirname, "testComponent.js")}`,
			"generateRestRoutes"
		);

		await engineServer.start();

		// Give the server a moment to start
		await new Promise(resolve => setTimeout(resolve, 1000));

		const res = await fetch(`http://localhost:${port}/test/value`);
		expect(await res.json()).toEqual({
			value: 1234
		});

		await engineServer.stop();
		expect(engineServer).toBeDefined();
	});

	test("Can start server with custom entity storage, custom store and REST endpoint", async () => {
		EntitySchemaFactory.register(nameof<TestEntity>(), () =>
			EntitySchemaHelper.getSchema(TestEntity)
		);

		const engine = new Engine({
			config: {
				debug: true,
				types: {
					entityStorageConnector: [
						{
							type: EntityStorageConnectorType.Memory,
							overrideInstanceType: "test-entity"
						}
					],
					entityStorageComponent: [
						{
							type: EntityStorageComponentType.Service,
							options: {
								entityStorageType: nameof<TestEntity>(),
								partitionContextIds: [ContextIdKeys.Node]
							},
							restPath: "foo"
						}
					]
				},
				web: { port }
			}
		});

		const engineServer = new EngineServer({
			engineCore: engine
		});

		await engineServer.start();

		const service = ComponentFactory.get<IEntityStorageComponent<TestEntity>>("test-entity");
		await service.set({ id: "test1234" });

		// Give the server a moment to start
		await new Promise(resolve => setTimeout(resolve, 1000));

		const res = await fetch(`http://localhost:${port}/foo/test1234`);
		expect(await res.json()).toEqual({
			id: "test1234"
		});

		const item = await service.get("test1234");
		expect(item?.id).toEqual("test1234");

		await engineServer.stop();
	});
});
