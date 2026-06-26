// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import path from "node:path";
import { ContextIdKeys, ContextIdStore } from "@twin.org/context";
import { ComponentFactory, Factory, I18n } from "@twin.org/core";
import { Engine } from "@twin.org/engine";
import coreLocales from "@twin.org/engine-core/locales/en.json" with { type: "json" };
import {
	AuthenticationAdminComponentType,
	AuthenticationAuditComponentType,
	AuthenticationComponentType,
	AuthenticationRateComponentType,
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
	AutomationActionType,
	AutomationComponentType,
	BackgroundTaskComponentType,
	BlobStorageComponentType,
	BlobStorageConnectorType,
	DataConverterConnectorType,
	DataExtractorConnectorType,
	DataProcessingComponentType,
	DataspaceControlPlaneComponentType,
	DataspaceDataPlaneComponentType,
	DocumentManagementComponentType,
	EntityStorageComponentType,
	EntityStorageConnectorType,
	EventBusComponentType,
	EventBusConnectorType,
	FaucetConnectorType,
	FederatedCatalogueComponentType,
	HealthComponentType,
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
	MetricsCollectorComponentType,
	MetricsProducerComponentType,
	NftComponentType,
	NftConnectorType,
	NotarizationComponentType,
	NotarizationConnectorType,
	PlatformComponentType,
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
	RightsManagementPolicyObligationEnforcerComponentType,
	RightsManagementPolicyRequesterComponentType,
	RightsManagementPxpComponentType,
	TaskSchedulerComponentType,
	TelemetryComponentType,
	TelemetryConnectorType,
	TenantAdminComponentType,
	TrustComponentType,
	TrustGeneratorComponentType,
	TrustVerifierComponentType,
	VaultConnectorType,
	WalletConnectorType
} from "@twin.org/engine-types";
import engineTypesLocales from "@twin.org/engine-types/locales/en.json" with { type: "json" };
import { entity, EntitySchemaFactory, EntitySchemaHelper, property } from "@twin.org/entity";
import type { IEntityStorageComponent } from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import packageLocales from "../locales/en.json" with { type: "json" };
import { EngineServer } from "../src/engineServer.js";
import {
	addDefaultRestPaths,
	addDefaultSocketPaths
} from "../src/utils/engineServerConfigHelper.js";

const basePort = Math.floor(Math.random() * 1000);
let port = 13000 + basePort;

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
				entityStorageConnector: [
					{ type: EntityStorageConnectorType.Memory, options: { storagePrefix: "test-" } }
				],
				blobStorageConnector: [{ type: BlobStorageConnectorType.Memory, features: ["public"] }],
				blobStorageComponent: [{ type: BlobStorageComponentType.Service }],
				backgroundTaskComponent: [{ type: BackgroundTaskComponentType.Service }],
				automationComponent: [{ type: AutomationComponentType.Service }],
				automationAction: [
					{ type: AutomationActionType.Fetch, options: { config: { url: "http://example.com" } } }
				],
				eventBusConnector: [{ type: EventBusConnectorType.Local }],
				eventBusComponent: [{ type: EventBusComponentType.Service }],
				telemetryConnector: [{ type: TelemetryConnectorType.EntityStorage }],
				telemetryComponent: [{ type: TelemetryComponentType.Service }],
				metricsCollectorComponent: [{ type: MetricsCollectorComponentType.Service }],
				metricsProducerComponent: [{ type: MetricsProducerComponentType.System }],
				messagingEmailConnector: [{ type: MessagingEmailConnectorType.EntityStorage }],
				messagingSmsConnector: [{ type: MessagingSmsConnectorType.EntityStorage }],
				messagingPushNotificationConnector: [
					{ type: MessagingPushNotificationConnectorType.EntityStorage }
				],
				messagingAdminComponent: [{ type: MessagingAdminComponentType.Service }],
				messagingComponent: [{ type: MessagingComponentType.Service }],
				vaultConnector: [{ type: VaultConnectorType.EntityStorage }],
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
				notarizationConnector: [{ type: NotarizationConnectorType.EntityStorage }],
				notarizationComponent: [{ type: NotarizationComponentType.Service }],
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
						type: RightsManagementPnpComponentType.RestClient,
						options: {
							endpoint: "http://localhost"
						},
						features: ["remote"]
					},
					{
						type: RightsManagementPnpComponentType.Service,
						options: {
							config: {
								callbackPath: ""
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
				rightsManagementPolicyObligationEnforcerComponent: [
					{
						type: RightsManagementPolicyObligationEnforcerComponentType.PassThrough
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
				federatedCatalogueComponent: [
					{
						type: FederatedCatalogueComponentType.Service,
						options: {}
					}
				],
				dataspaceControlPlaneComponent: [
					{
						type: DataspaceControlPlaneComponentType.Service
					}
				],
				dataspaceDataPlaneComponent: [
					{
						type: DataspaceDataPlaneComponentType.Service
					}
				],
				healthComponent: [
					{
						type: HealthComponentType.Service
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
				restRouteProcessor: [
					{
						type: RestRouteProcessorType.RestRoute
					}
				],
				socketRouteProcessor: [
					{
						type: SocketRouteProcessorType.SocketRoute
					}
				],
				authenticationAuditComponent: [
					{
						type: AuthenticationAuditComponentType.EntityStorage
					}
				],
				authenticationRateComponent: [
					{
						type: AuthenticationRateComponentType.EntityStorage
					}
				],
				authenticationComponent: [
					{
						type: AuthenticationComponentType.EntityStorage
					}
				],
				authenticationAdminComponent: [
					{
						type: AuthenticationAdminComponentType.EntityStorage
					}
				],
				platformComponent: [
					{
						type: PlatformComponentType.Service
					}
				]
			},
			web: { port }
		};
		const engine = new Engine({
			config
		});
		engine.addContextId(ContextIdKeys.Node, "did:iota:0x123");
		const engineServer = new EngineServer({
			engineCore: engine
		});

		addDefaultRestPaths(config);
		addDefaultSocketPaths(config);
		await engineServer.start();

		const buildRestRoutes = engineServer.getRestRoutes();
		expect(buildRestRoutes.map(r => `${r.method.padEnd(8, " ")} ${r.path}`)).toEqual([
			"GET      /",
			"GET      /favicon.ico",
			"GET      /info",
			"GET      /livez",
			"GET      /readyz",
			"GET      /spec",
			"GET      /health",
			"POST     /authentication/login",
			"POST     /authentication/logout",
			"POST     /authentication/refresh",
			"PUT      /authentication/password",
			"POST     /authentication/admin/users",
			"PUT      /authentication/admin/users/:email",
			"PUT      /authentication/admin/users/:email/password",
			"GET      /authentication/admin/users/:email",
			"GET      /authentication/admin/users/identity/:identity",
			"DELETE   /authentication/admin/users/:email",
			"POST     /authentication/audit",
			"GET      /authentication/audit",
			"POST     /logging",
			"GET      /logging",
			"GET      /tenants",
			"POST     /tenants",
			"GET      /tenants/:id",
			"GET      /tenants/api-key/:apiKey",
			"GET      /tenants/public-origin/:publicOrigin",
			"DELETE   /tenants/:id",
			"PUT      /tenants/:id",
			"POST     /telemetry/metric",
			"GET      /telemetry/metric/:id",
			"PUT      /telemetry/metric/:id",
			"POST     /telemetry/metric/:id/value",
			"DELETE   /telemetry/metric/:id",
			"GET      /telemetry/metric",
			"GET      /telemetry/metric/:id/value",
			"POST     /automation/trigger/:trigger",
			"POST     /automation",
			"DELETE   /automation/:actionId",
			"GET      /automation/:actionId",
			"GET      /automation",
			"POST     /blob",
			"GET      /blob/:id",
			"GET      /blob/:id/content",
			"PUT      /blob/:id",
			"DELETE   /blob/:id",
			"DELETE   /blob",
			"GET      /blob",
			"POST     /identity",
			"DELETE   /identity/:identity",
			"POST     /identity/:identity/verification-method",
			"DELETE   /identity/:identity/verification-method/:verificationMethodId",
			"POST     /identity/:identity/service",
			"DELETE   /identity/:identity/service/:serviceId",
			"POST     /identity/:identity/alias",
			"DELETE   /identity/:identity/alias/:alias",
			"POST     /identity/:identity/verifiable-credential/:verificationMethodId",
			"POST     /identity/verifiable-credential/verify/document",
			"GET      /identity/verifiable-credential/verify",
			"GET      /identity/:identity/verifiable-credential/revoke/:revocationIndex",
			"GET      /identity/:identity/verifiable-credential/unrevoke/:revocationIndex",
			"POST     /identity/:identity/verifiable-presentation/:verificationMethodId",
			"POST     /identity/verifiable-presentation/verify/document",
			"GET      /identity/verifiable-presentation/verify",
			"POST     /identity/:identity/proof/:verificationMethodId",
			"POST     /identity/proof/verify",
			"GET      /identity/:identity",
			"POST     /identity/profile",
			"GET      /identity/profile",
			"GET      /identity/profile/:identity/public",
			"PUT      /identity/profile",
			"DELETE   /identity/profile",
			"GET      /identity/profile/query",
			"POST     /nft",
			"GET      /nft/:id",
			"DELETE   /nft/:id",
			"POST     /nft/:id/transfer",
			"PUT      /nft/:id",
			"POST     /notarization",
			"GET      /notarization/:id",
			"DELETE   /notarization/:id",
			"PUT      /notarization/:id",
			"POST     /notarization/:id/transfer",
			"POST     /immutable-proof",
			"GET      /immutable-proof/:id",
			"GET      /immutable-proof/:id/verify",
			"DELETE   /immutable-proof/:id",
			"DELETE   /immutable-proof/:id/notarization",
			"POST     /attestation",
			"GET      /attestation/:id",
			"PUT      /attestation/:id/transfer",
			"DELETE   /attestation/:id",
			"POST     /aig",
			"GET      /aig/:id",
			"GET      /aig/:id/versions/:version",
			"GET      /aig/:id/versions",
			"GET      /aig/:id/changesets/:changesetId",
			"GET      /aig/:id/changesets",
			"PUT      /aig/:id",
			"PATCH    /aig/:id",
			"GET      /aig",
			"DELETE   /aig/:id/proof",
			"POST     /ais",
			"GET      /ais/:id",
			"PUT      /ais/:id",
			"DELETE   /ais/:id",
			"PUT      /ais/:id/close",
			"GET      /ais",
			"POST     /ais/:id/entries",
			"GET      /ais/:id/entries/:entryId",
			"GET      /ais/:id/entries/:entryId/object",
			"DELETE   /ais/:id/entries/:entryId",
			"PUT      /ais/:id/entries/:entryId",
			"GET      /ais/:id/entries",
			"GET      /ais/entries",
			"GET      /ais/:id/entries/objects",
			"GET      /ais/entries/objects",
			"DELETE   /ais/:id/proof",
			"PUT      /data-processing/rule-group/:id",
			"GET      /data-processing/rule-group/:id",
			"DELETE   /data-processing/rule-group/:id",
			"POST     /data-processing/extract",
			"POST     /data-processing/convert",
			"GET      /data-processing/rule-group",
			"POST     /documents",
			"PATCH    /documents/:auditableItemGraphDocumentId",
			"GET      /documents/:auditableItemGraphDocumentId",
			"GET      /documents/:auditableItemGraphDocumentId/:revision",
			"DELETE   /documents/:auditableItemGraphDocumentId/:revision",
			"GET      /documents",
			"POST     /rights-management/policy/admin",
			"PUT      /rights-management/policy/admin/:id",
			"GET      /rights-management/policy/admin/:id",
			"GET      /rights-management/policy/admin/agreement/:id",
			"GET      /rights-management/policy/admin/offer/:id",
			"GET      /rights-management/policy/admin/set/:id",
			"DELETE   /rights-management/policy/admin/:id",
			"GET      /rights-management/policy/admin",
			"GET      /rights-management/negotiations/:id",
			"POST     /rights-management/negotiations/request",
			"POST     /rights-management/negotiations/:id/request",
			"POST     /rights-management/negotiations/:id/events",
			"POST     /rights-management/negotiations/:id/agreement/verification",
			"POST     /rights-management/negotiations/:id/termination",
			"POST     /rights-management/negotiations/offers",
			"POST     /rights-management/negotiations/:id/offers",
			"POST     /rights-management/negotiations/:id/agreement",
			"POST     /rights-management/negotiations/admin",
			"GET      /rights-management/negotiations/admin/:policyId",
			"PUT      /rights-management/negotiations/admin/:policyId",
			"DELETE   /rights-management/negotiations/admin/:policyId",
			"GET      /rights-management/negotiations/admin",
			"POST     /federated-catalogue/request",
			"GET      /federated-catalogue/datasets/:datasetId",
			"POST     /federated-catalogue/datasets",
			"DELETE   /federated-catalogue/datasets/:datasetId",
			// Dataspace Control Plane routes
			"GET      .well-known/dspace-version",
			"POST     /dataspace/transfers/request",
			"GET      /dataspace/transfers/:pid",
			"POST     /dataspace/transfers/:pid/start",
			"POST     /dataspace/transfers/:pid/complete",
			"POST     /dataspace/transfers/:pid/suspend",
			"POST     /dataspace/transfers/:pid/terminate",
			"POST     /dataspace/app-datasets",
			"GET      /dataspace/app-datasets",
			"GET      /dataspace/app-datasets/:id",
			"PUT      /dataspace/app-datasets/:id",
			"DELETE   /dataspace/app-datasets/:id",
			// Dataspace Data Plane routes
			"POST     /dataspace/inbox",
			"GET      /dataspace/activity-logs/:id",
			"GET      /dataspace/entities",
			"POST     /dataspace/entities/query"
		]);

		const buildSocketRoutes = engineServer.getSocketRoutes();
		expect(buildSocketRoutes.map(r => r.path)).toEqual([
			"event-bus/subscribe",
			"event-bus/unsubscribe",
			// Dataspace Data Plane socket routes
			"dataspace/activity-logs/status"
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
							options: { storagePrefix: "test-" },
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
