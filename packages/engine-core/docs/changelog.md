# Changelog

## [0.9.3-next.6](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.3-next.5...engine-core-v0.9.3-next.6) (2026-09-10)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.3-next.5 to 0.9.3-next.6

## [0.9.3-next.5](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.3-next.4...engine-core-v0.9.3-next.5) (2026-09-08)


### Features

* stop components in reverse order ([34311d0](https://github.com/iotaledger/twin-engine/commit/34311d0782b9e6ce299699d4ab8593f1ad678d09))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.3-next.4 to 0.9.3-next.5

## [0.9.3-next.4](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.3-next.3...engine-core-v0.9.3-next.4) (2026-09-08)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.3-next.3 to 0.9.3-next.4

## [0.9.3-next.3](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.3-next.2...engine-core-v0.9.3-next.3) (2026-09-07)


### Features

* add email injection types ([#250](https://github.com/iotaledger/twin-engine/issues/250)) ([110f891](https://github.com/iotaledger/twin-engine/commit/110f8913133f363a6cf0eaffe13524bf06d41487))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.3-next.2 to 0.9.3-next.3

## [0.9.3-next.2](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.3-next.1...engine-core-v0.9.3-next.2) (2026-09-01)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.3-next.1 to 0.9.3-next.2

## [0.9.3-next.1](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.3-next.0...engine-core-v0.9.3-next.1) (2026-08-27)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add engine core builder ([#199](https://github.com/iotaledger/twin-engine/issues/199)) ([a91db96](https://github.com/iotaledger/twin-engine/commit/a91db96f931c451dd97e7209bd93477313d7f2e4))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add metrics producer type initialisers to engine ([#122](https://github.com/iotaledger/twin-engine/issues/122)) ([45f52d7](https://github.com/iotaledger/twin-engine/commit/45f52d7ad9c94bda0d2671756049bb5973b64b10))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add registered component methods ([a9a2899](https://github.com/iotaledger/twin-engine/commit/a9a2899f266baa48e63bfbda958877a4f941602d))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))
* add sorting to factories so default entries are at start ([1a69356](https://github.com/iotaledger/twin-engine/commit/1a693567befcf27e6edc9880746ee82cfb9538e5))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add tenant admin routes ([#76](https://github.com/iotaledger/twin-engine/issues/76)) ([3c0af90](https://github.com/iotaledger/twin-engine/commit/3c0af90a572fcda08d8720bdcee9b9f1cd02b872))
* add tenant component ([#138](https://github.com/iotaledger/twin-engine/issues/138)) ([ebbcb8f](https://github.com/iotaledger/twin-engine/commit/ebbcb8fa3fee05048ddad2891c6ada66bd29e7bd))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* clone log-level control and per-component start timing in engine core ([#189](https://github.com/iotaledger/twin-engine/issues/189)) ([8e4e26d](https://github.com/iotaledger/twin-engine/commit/8e4e26d9992955d380ef2873ad6ad54c31faaf68))
* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))
* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))
* improved cloning ([#190](https://github.com/iotaledger/twin-engine/issues/190)) ([b43833b](https://github.com/iotaledger/twin-engine/commit/b43833b8bbcf4b1257abbe9c2552238963d3f6e2))
* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))
* isCloneable to cloneMode ([#237](https://github.com/iotaledger/twin-engine/issues/237)) ([f4f2ce2](https://github.com/iotaledger/twin-engine/commit/f4f2ce281bbe60175c5352044599c0491360ffcc))
* linting and dependency update ([7289210](https://github.com/iotaledger/twin-engine/commit/7289210726b67b69ded06d9c7a5a7e01e42285a0))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* make sure options exists ([e77fe22](https://github.com/iotaledger/twin-engine/commit/e77fe227134b2e620b9bc22cfa7b269a238f53f8))
* multi instance component support ([#83](https://github.com/iotaledger/twin-engine/issues/83)) ([6012b50](https://github.com/iotaledger/twin-engine/commit/6012b50959df5af893f05516d42eea2e0800b31a))
* organization identifiers ([#152](https://github.com/iotaledger/twin-engine/issues/152)) ([d8e6d51](https://github.com/iotaledger/twin-engine/commit/d8e6d5147f402f0fe17b445efd8ae97db0c36adb))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* set initialised flag when skipping start ([039b4df](https://github.com/iotaledger/twin-engine/commit/039b4dff22c90d0ba3703372a11213709d26aa52))
* silent telemetry tracing ([#229](https://github.com/iotaledger/twin-engine/issues/229)) ([33b184a](https://github.com/iotaledger/twin-engine/commit/33b184a7def9f28fcff7c540e739b7ae28d46298))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* typescript 6 update ([b227f52](https://github.com/iotaledger/twin-engine/commit/b227f5271b18ac627b932ea8e59d2879ff01ebd7))
* update dependencies ([e6ebe42](https://github.com/iotaledger/twin-engine/commit/e6ebe42b9d61066227ad8b45dae14c8f8615b760))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use factory default feature for sorting ([ec8b370](https://github.com/iotaledger/twin-engine/commit/ec8b370c5c028cb300cdd1e76b0a0cdb2263773c))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* clone state ([#203](https://github.com/iotaledger/twin-engine/issues/203)) ([a240233](https://github.com/iotaledger/twin-engine/commit/a240233eb775d5e35095f3aff3c834d51c473a2c))
* improve populateClone filtering ([60abfff](https://github.com/iotaledger/twin-engine/commit/60abfffb7ed7140f4be9ab59c7dd0aff689330ae))
* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))
* pass contextIds to populateClone ([#79](https://github.com/iotaledger/twin-engine/issues/79)) ([b22f1bb](https://github.com/iotaledger/twin-engine/commit/b22f1bbf0319069914e316d27de4c2a8623421cf))
* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))
* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.3-next.0 to 0.9.3-next.1

## [0.9.2](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2...engine-core-v0.9.2) (2026-08-24)


### Features

* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* release to production ([3a4acd1](https://github.com/iotaledger/twin-engine/commit/3a4acd1f6c66b841d80b6fd3bc1a439a77148fa5))
* release to production ([5559958](https://github.com/iotaledger/twin-engine/commit/5559958e2128e6ec3a81e779d1ebd3f370bbb081))
* release to production ([#171](https://github.com/iotaledger/twin-engine/issues/171)) ([31c43e9](https://github.com/iotaledger/twin-engine/commit/31c43e978f11175fbfa18ad2025c2dc8a62e1434))
* release to production ([#196](https://github.com/iotaledger/twin-engine/issues/196)) ([91987ea](https://github.com/iotaledger/twin-engine/commit/91987ea74e53d8e2295e0a353d38504fd0ee791f))
* release to production ([#242](https://github.com/iotaledger/twin-engine/issues/242)) ([b632383](https://github.com/iotaledger/twin-engine/commit/b632383320ff79ae4bb989e92211f4dc7a6565ee))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))

## [0.9.2-next.16](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.15...engine-core-v0.9.2-next.16) (2026-08-23)


### Features

* isCloneable to cloneMode ([#237](https://github.com/iotaledger/twin-engine/issues/237)) ([f4f2ce2](https://github.com/iotaledger/twin-engine/commit/f4f2ce281bbe60175c5352044599c0491360ffcc))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.15 to 0.9.2-next.16

## [0.9.2-next.15](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.14...engine-core-v0.9.2-next.15) (2026-08-21)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.14 to 0.9.2-next.15

## [0.9.2-next.14](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.13...engine-core-v0.9.2-next.14) (2026-08-20)


### Features

* silent telemetry tracing ([#229](https://github.com/iotaledger/twin-engine/issues/229)) ([33b184a](https://github.com/iotaledger/twin-engine/commit/33b184a7def9f28fcff7c540e739b7ae28d46298))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.13 to 0.9.2-next.14

## [0.9.2-next.13](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.12...engine-core-v0.9.2-next.13) (2026-08-19)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.12 to 0.9.2-next.13

## [0.9.2-next.12](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.11...engine-core-v0.9.2-next.12) (2026-08-18)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.11 to 0.9.2-next.12

## [0.9.2-next.11](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.10...engine-core-v0.9.2-next.11) (2026-08-17)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.10 to 0.9.2-next.11

## [0.9.2-next.10](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.9...engine-core-v0.9.2-next.10) (2026-08-14)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.9 to 0.9.2-next.10

## [0.9.2-next.9](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.8...engine-core-v0.9.2-next.9) (2026-08-11)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.8 to 0.9.2-next.9

## [0.9.2-next.8](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.7...engine-core-v0.9.2-next.8) (2026-08-10)


### Features

* make sure options exists ([e77fe22](https://github.com/iotaledger/twin-engine/commit/e77fe227134b2e620b9bc22cfa7b269a238f53f8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.7 to 0.9.2-next.8

## [0.9.2-next.7](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.6...engine-core-v0.9.2-next.7) (2026-08-07)


### Features

* linting and dependency update ([7289210](https://github.com/iotaledger/twin-engine/commit/7289210726b67b69ded06d9c7a5a7e01e42285a0))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.6 to 0.9.2-next.7

## [0.9.2-next.6](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.5...engine-core-v0.9.2-next.6) (2026-08-06)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.5 to 0.9.2-next.6

## [0.9.2-next.5](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.4...engine-core-v0.9.2-next.5) (2026-08-03)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.4 to 0.9.2-next.5

## [0.9.2-next.4](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.3...engine-core-v0.9.2-next.4) (2026-08-03)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.3 to 0.9.2-next.4

## [0.9.2-next.3](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.2...engine-core-v0.9.2-next.3) (2026-08-02)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.2 to 0.9.2-next.3

## [0.9.2-next.2](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.1...engine-core-v0.9.2-next.2) (2026-07-30)


### Bug Fixes

* clone state ([#203](https://github.com/iotaledger/twin-engine/issues/203)) ([a240233](https://github.com/iotaledger/twin-engine/commit/a240233eb775d5e35095f3aff3c834d51c473a2c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.1 to 0.9.2-next.2

## [0.9.2-next.1](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.2-next.0...engine-core-v0.9.2-next.1) (2026-07-28)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add engine core builder ([#199](https://github.com/iotaledger/twin-engine/issues/199)) ([a91db96](https://github.com/iotaledger/twin-engine/commit/a91db96f931c451dd97e7209bd93477313d7f2e4))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add metrics producer type initialisers to engine ([#122](https://github.com/iotaledger/twin-engine/issues/122)) ([45f52d7](https://github.com/iotaledger/twin-engine/commit/45f52d7ad9c94bda0d2671756049bb5973b64b10))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add registered component methods ([a9a2899](https://github.com/iotaledger/twin-engine/commit/a9a2899f266baa48e63bfbda958877a4f941602d))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))
* add sorting to factories so default entries are at start ([1a69356](https://github.com/iotaledger/twin-engine/commit/1a693567befcf27e6edc9880746ee82cfb9538e5))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add tenant admin routes ([#76](https://github.com/iotaledger/twin-engine/issues/76)) ([3c0af90](https://github.com/iotaledger/twin-engine/commit/3c0af90a572fcda08d8720bdcee9b9f1cd02b872))
* add tenant component ([#138](https://github.com/iotaledger/twin-engine/issues/138)) ([ebbcb8f](https://github.com/iotaledger/twin-engine/commit/ebbcb8fa3fee05048ddad2891c6ada66bd29e7bd))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* clone log-level control and per-component start timing in engine core ([#189](https://github.com/iotaledger/twin-engine/issues/189)) ([8e4e26d](https://github.com/iotaledger/twin-engine/commit/8e4e26d9992955d380ef2873ad6ad54c31faaf68))
* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))
* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))
* improved cloning ([#190](https://github.com/iotaledger/twin-engine/issues/190)) ([b43833b](https://github.com/iotaledger/twin-engine/commit/b43833b8bbcf4b1257abbe9c2552238963d3f6e2))
* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* multi instance component support ([#83](https://github.com/iotaledger/twin-engine/issues/83)) ([6012b50](https://github.com/iotaledger/twin-engine/commit/6012b50959df5af893f05516d42eea2e0800b31a))
* organization identifiers ([#152](https://github.com/iotaledger/twin-engine/issues/152)) ([d8e6d51](https://github.com/iotaledger/twin-engine/commit/d8e6d5147f402f0fe17b445efd8ae97db0c36adb))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* set initialised flag when skipping start ([039b4df](https://github.com/iotaledger/twin-engine/commit/039b4dff22c90d0ba3703372a11213709d26aa52))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* typescript 6 update ([b227f52](https://github.com/iotaledger/twin-engine/commit/b227f5271b18ac627b932ea8e59d2879ff01ebd7))
* update dependencies ([e6ebe42](https://github.com/iotaledger/twin-engine/commit/e6ebe42b9d61066227ad8b45dae14c8f8615b760))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use factory default feature for sorting ([ec8b370](https://github.com/iotaledger/twin-engine/commit/ec8b370c5c028cb300cdd1e76b0a0cdb2263773c))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* improve populateClone filtering ([60abfff](https://github.com/iotaledger/twin-engine/commit/60abfffb7ed7140f4be9ab59c7dd0aff689330ae))
* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))
* pass contextIds to populateClone ([#79](https://github.com/iotaledger/twin-engine/issues/79)) ([b22f1bb](https://github.com/iotaledger/twin-engine/commit/b22f1bbf0319069914e316d27de4c2a8623421cf))
* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))
* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.2-next.0 to 0.9.2-next.1

## [0.9.1](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1...engine-core-v0.9.1) (2026-07-27)


### Features

* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* release to production ([3a4acd1](https://github.com/iotaledger/twin-engine/commit/3a4acd1f6c66b841d80b6fd3bc1a439a77148fa5))
* release to production ([5559958](https://github.com/iotaledger/twin-engine/commit/5559958e2128e6ec3a81e779d1ebd3f370bbb081))
* release to production ([#171](https://github.com/iotaledger/twin-engine/issues/171)) ([31c43e9](https://github.com/iotaledger/twin-engine/commit/31c43e978f11175fbfa18ad2025c2dc8a62e1434))
* release to production ([#196](https://github.com/iotaledger/twin-engine/issues/196)) ([91987ea](https://github.com/iotaledger/twin-engine/commit/91987ea74e53d8e2295e0a353d38504fd0ee791f))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))

## [0.9.1-next.8](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.7...engine-core-v0.9.1-next.8) (2026-07-24)


### Bug Fixes

* improve populateClone filtering ([60abfff](https://github.com/iotaledger/twin-engine/commit/60abfffb7ed7140f4be9ab59c7dd0aff689330ae))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.7 to 0.9.1-next.8

## [0.9.1-next.7](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.6...engine-core-v0.9.1-next.7) (2026-07-24)


### Features

* clone log-level control and per-component start timing in engine core ([#189](https://github.com/iotaledger/twin-engine/issues/189)) ([8e4e26d](https://github.com/iotaledger/twin-engine/commit/8e4e26d9992955d380ef2873ad6ad54c31faaf68))
* improved cloning ([#190](https://github.com/iotaledger/twin-engine/issues/190)) ([b43833b](https://github.com/iotaledger/twin-engine/commit/b43833b8bbcf4b1257abbe9c2552238963d3f6e2))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.6 to 0.9.1-next.7

## [0.9.1-next.6](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.5...engine-core-v0.9.1-next.6) (2026-07-20)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.5 to 0.9.1-next.6

## [0.9.1-next.5](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.4...engine-core-v0.9.1-next.5) (2026-07-02)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.4 to 0.9.1-next.5

## [0.9.1-next.4](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.3...engine-core-v0.9.1-next.4) (2026-06-30)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.3 to 0.9.1-next.4

## [0.9.1-next.3](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.2...engine-core-v0.9.1-next.3) (2026-06-29)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.2 to 0.9.1-next.3

## [0.9.1-next.2](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.1...engine-core-v0.9.1-next.2) (2026-06-26)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.1 to 0.9.1-next.2

## [0.9.1-next.1](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.1-next.0...engine-core-v0.9.1-next.1) (2026-06-26)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add metrics producer type initialisers to engine ([#122](https://github.com/iotaledger/twin-engine/issues/122)) ([45f52d7](https://github.com/iotaledger/twin-engine/commit/45f52d7ad9c94bda0d2671756049bb5973b64b10))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add registered component methods ([a9a2899](https://github.com/iotaledger/twin-engine/commit/a9a2899f266baa48e63bfbda958877a4f941602d))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))
* add sorting to factories so default entries are at start ([1a69356](https://github.com/iotaledger/twin-engine/commit/1a693567befcf27e6edc9880746ee82cfb9538e5))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add tenant admin routes ([#76](https://github.com/iotaledger/twin-engine/issues/76)) ([3c0af90](https://github.com/iotaledger/twin-engine/commit/3c0af90a572fcda08d8720bdcee9b9f1cd02b872))
* add tenant component ([#138](https://github.com/iotaledger/twin-engine/issues/138)) ([ebbcb8f](https://github.com/iotaledger/twin-engine/commit/ebbcb8fa3fee05048ddad2891c6ada66bd29e7bd))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))
* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))
* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* multi instance component support ([#83](https://github.com/iotaledger/twin-engine/issues/83)) ([6012b50](https://github.com/iotaledger/twin-engine/commit/6012b50959df5af893f05516d42eea2e0800b31a))
* organization identifiers ([#152](https://github.com/iotaledger/twin-engine/issues/152)) ([d8e6d51](https://github.com/iotaledger/twin-engine/commit/d8e6d5147f402f0fe17b445efd8ae97db0c36adb))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* set initialised flag when skipping start ([039b4df](https://github.com/iotaledger/twin-engine/commit/039b4dff22c90d0ba3703372a11213709d26aa52))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* typescript 6 update ([b227f52](https://github.com/iotaledger/twin-engine/commit/b227f5271b18ac627b932ea8e59d2879ff01ebd7))
* update dependencies ([e6ebe42](https://github.com/iotaledger/twin-engine/commit/e6ebe42b9d61066227ad8b45dae14c8f8615b760))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use factory default feature for sorting ([ec8b370](https://github.com/iotaledger/twin-engine/commit/ec8b370c5c028cb300cdd1e76b0a0cdb2263773c))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))
* pass contextIds to populateClone ([#79](https://github.com/iotaledger/twin-engine/issues/79)) ([b22f1bb](https://github.com/iotaledger/twin-engine/commit/b22f1bbf0319069914e316d27de4c2a8623421cf))
* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))
* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.1-next.0 to 0.9.1-next.1

## [0.9.0](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.0...engine-core-v0.9.0) (2026-06-25)


### Features

* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* release to production ([3a4acd1](https://github.com/iotaledger/twin-engine/commit/3a4acd1f6c66b841d80b6fd3bc1a439a77148fa5))
* release to production ([5559958](https://github.com/iotaledger/twin-engine/commit/5559958e2128e6ec3a81e779d1ebd3f370bbb081))
* release to production ([#171](https://github.com/iotaledger/twin-engine/issues/171)) ([31c43e9](https://github.com/iotaledger/twin-engine/commit/31c43e978f11175fbfa18ad2025c2dc8a62e1434))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))

## [0.9.0-next.1](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.9.0-next.0...engine-core-v0.9.0-next.1) (2026-06-24)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add metrics producer type initialisers to engine ([#122](https://github.com/iotaledger/twin-engine/issues/122)) ([45f52d7](https://github.com/iotaledger/twin-engine/commit/45f52d7ad9c94bda0d2671756049bb5973b64b10))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add registered component methods ([a9a2899](https://github.com/iotaledger/twin-engine/commit/a9a2899f266baa48e63bfbda958877a4f941602d))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))
* add sorting to factories so default entries are at start ([1a69356](https://github.com/iotaledger/twin-engine/commit/1a693567befcf27e6edc9880746ee82cfb9538e5))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add tenant admin routes ([#76](https://github.com/iotaledger/twin-engine/issues/76)) ([3c0af90](https://github.com/iotaledger/twin-engine/commit/3c0af90a572fcda08d8720bdcee9b9f1cd02b872))
* add tenant component ([#138](https://github.com/iotaledger/twin-engine/issues/138)) ([ebbcb8f](https://github.com/iotaledger/twin-engine/commit/ebbcb8fa3fee05048ddad2891c6ada66bd29e7bd))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))
* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))
* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* multi instance component support ([#83](https://github.com/iotaledger/twin-engine/issues/83)) ([6012b50](https://github.com/iotaledger/twin-engine/commit/6012b50959df5af893f05516d42eea2e0800b31a))
* organization identifiers ([#152](https://github.com/iotaledger/twin-engine/issues/152)) ([d8e6d51](https://github.com/iotaledger/twin-engine/commit/d8e6d5147f402f0fe17b445efd8ae97db0c36adb))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* set initialised flag when skipping start ([039b4df](https://github.com/iotaledger/twin-engine/commit/039b4dff22c90d0ba3703372a11213709d26aa52))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* typescript 6 update ([b227f52](https://github.com/iotaledger/twin-engine/commit/b227f5271b18ac627b932ea8e59d2879ff01ebd7))
* update dependencies ([e6ebe42](https://github.com/iotaledger/twin-engine/commit/e6ebe42b9d61066227ad8b45dae14c8f8615b760))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use factory default feature for sorting ([ec8b370](https://github.com/iotaledger/twin-engine/commit/ec8b370c5c028cb300cdd1e76b0a0cdb2263773c))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))
* pass contextIds to populateClone ([#79](https://github.com/iotaledger/twin-engine/issues/79)) ([b22f1bb](https://github.com/iotaledger/twin-engine/commit/b22f1bbf0319069914e316d27de4c2a8623421cf))
* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))
* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.9.0-next.0 to 0.9.0-next.1

## [0.0.3-next.56](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.55...engine-core-v0.0.3-next.56) (2026-06-23)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.55 to 0.0.3-next.56

## [0.0.3-next.55](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.54...engine-core-v0.0.3-next.55) (2026-06-19)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.54 to 0.0.3-next.55

## [0.0.3-next.54](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.53...engine-core-v0.0.3-next.54) (2026-06-19)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.53 to 0.0.3-next.54

## [0.0.3-next.53](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.52...engine-core-v0.0.3-next.53) (2026-06-18)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.52 to 0.0.3-next.53

## [0.0.3-next.52](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.51...engine-core-v0.0.3-next.52) (2026-06-16)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.51 to 0.0.3-next.52

## [0.0.3-next.51](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.50...engine-core-v0.0.3-next.51) (2026-06-15)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.50 to 0.0.3-next.51

## [0.0.3-next.50](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.49...engine-core-v0.0.3-next.50) (2026-06-11)


### Features

* organization identifiers ([#152](https://github.com/iotaledger/twin-engine/issues/152)) ([d8e6d51](https://github.com/iotaledger/twin-engine/commit/d8e6d5147f402f0fe17b445efd8ae97db0c36adb))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.49 to 0.0.3-next.50

## [0.0.3-next.49](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.48...engine-core-v0.0.3-next.49) (2026-06-09)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.48 to 0.0.3-next.49

## [0.0.3-next.48](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.47...engine-core-v0.0.3-next.48) (2026-06-08)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.47 to 0.0.3-next.48

## [0.0.3-next.47](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.46...engine-core-v0.0.3-next.47) (2026-06-08)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.46 to 0.0.3-next.47

## [0.0.3-next.46](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.45...engine-core-v0.0.3-next.46) (2026-06-04)


### Features

* add tenant component ([#138](https://github.com/iotaledger/twin-engine/issues/138)) ([ebbcb8f](https://github.com/iotaledger/twin-engine/commit/ebbcb8fa3fee05048ddad2891c6ada66bd29e7bd))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.45 to 0.0.3-next.46

## [0.0.3-next.45](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.44...engine-core-v0.0.3-next.45) (2026-06-02)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add metrics producer type initialisers to engine ([#122](https://github.com/iotaledger/twin-engine/issues/122)) ([45f52d7](https://github.com/iotaledger/twin-engine/commit/45f52d7ad9c94bda0d2671756049bb5973b64b10))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add registered component methods ([a9a2899](https://github.com/iotaledger/twin-engine/commit/a9a2899f266baa48e63bfbda958877a4f941602d))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))
* add sorting to factories so default entries are at start ([1a69356](https://github.com/iotaledger/twin-engine/commit/1a693567befcf27e6edc9880746ee82cfb9538e5))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add tenant admin routes ([#76](https://github.com/iotaledger/twin-engine/issues/76)) ([3c0af90](https://github.com/iotaledger/twin-engine/commit/3c0af90a572fcda08d8720bdcee9b9f1cd02b872))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))
* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))
* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* multi instance component support ([#83](https://github.com/iotaledger/twin-engine/issues/83)) ([6012b50](https://github.com/iotaledger/twin-engine/commit/6012b50959df5af893f05516d42eea2e0800b31a))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* set initialised flag when skipping start ([039b4df](https://github.com/iotaledger/twin-engine/commit/039b4dff22c90d0ba3703372a11213709d26aa52))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* typescript 6 update ([b227f52](https://github.com/iotaledger/twin-engine/commit/b227f5271b18ac627b932ea8e59d2879ff01ebd7))
* update dependencies ([e6ebe42](https://github.com/iotaledger/twin-engine/commit/e6ebe42b9d61066227ad8b45dae14c8f8615b760))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use factory default feature for sorting ([ec8b370](https://github.com/iotaledger/twin-engine/commit/ec8b370c5c028cb300cdd1e76b0a0cdb2263773c))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))
* pass contextIds to populateClone ([#79](https://github.com/iotaledger/twin-engine/issues/79)) ([b22f1bb](https://github.com/iotaledger/twin-engine/commit/b22f1bbf0319069914e316d27de4c2a8623421cf))
* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))
* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.44 to 0.0.3-next.45

## [0.0.3-next.44](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.43...engine-core-v0.0.3-next.44) (2026-06-02)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.43 to 0.0.3-next.44

## [0.0.3-next.43](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.42...engine-core-v0.0.3-next.43) (2026-05-29)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.42 to 0.0.3-next.43

## [0.0.3-next.42](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.41...engine-core-v0.0.3-next.42) (2026-05-28)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.41 to 0.0.3-next.42

## [0.0.3-next.41](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.40...engine-core-v0.0.3-next.41) (2026-05-26)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.40 to 0.0.3-next.41

## [0.0.3-next.40](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.39...engine-core-v0.0.3-next.40) (2026-05-22)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.39 to 0.0.3-next.40

## [0.0.3-next.39](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.38...engine-core-v0.0.3-next.39) (2026-05-21)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.38 to 0.0.3-next.39

## [0.0.3-next.38](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.37...engine-core-v0.0.3-next.38) (2026-05-20)


### Features

* add metrics producer type initialisers to engine ([#122](https://github.com/iotaledger/twin-engine/issues/122)) ([45f52d7](https://github.com/iotaledger/twin-engine/commit/45f52d7ad9c94bda0d2671756049bb5973b64b10))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.37 to 0.0.3-next.38

## [0.0.3-next.37](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.36...engine-core-v0.0.3-next.37) (2026-05-12)


### Features

* typescript 6 update ([b227f52](https://github.com/iotaledger/twin-engine/commit/b227f5271b18ac627b932ea8e59d2879ff01ebd7))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.36 to 0.0.3-next.37

## [0.0.3-next.36](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.35...engine-core-v0.0.3-next.36) (2026-05-08)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.35 to 0.0.3-next.36

## [0.0.3-next.35](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.34...engine-core-v0.0.3-next.35) (2026-05-05)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.34 to 0.0.3-next.35

## [0.0.3-next.34](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.33...engine-core-v0.0.3-next.34) (2026-05-05)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.33 to 0.0.3-next.34

## [0.0.3-next.33](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.32...engine-core-v0.0.3-next.33) (2026-05-05)


### Features

* add registered component methods ([a9a2899](https://github.com/iotaledger/twin-engine/commit/a9a2899f266baa48e63bfbda958877a4f941602d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.32 to 0.0.3-next.33

## [0.0.3-next.32](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.31...engine-core-v0.0.3-next.32) (2026-04-24)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.31 to 0.0.3-next.32

## [0.0.3-next.31](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.30...engine-core-v0.0.3-next.31) (2026-04-22)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.30 to 0.0.3-next.31

## [0.0.3-next.30](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.29...engine-core-v0.0.3-next.30) (2026-04-16)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.29 to 0.0.3-next.30

## [0.0.3-next.29](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.28...engine-core-v0.0.3-next.29) (2026-04-14)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.28 to 0.0.3-next.29

## [0.0.3-next.28](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.27...engine-core-v0.0.3-next.28) (2026-04-10)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.27 to 0.0.3-next.28

## [0.0.3-next.27](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.26...engine-core-v0.0.3-next.27) (2026-03-20)


### Features

* update dependencies ([e6ebe42](https://github.com/iotaledger/twin-engine/commit/e6ebe42b9d61066227ad8b45dae14c8f8615b760))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.26 to 0.0.3-next.27

## [0.0.3-next.26](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.25...engine-core-v0.0.3-next.26) (2026-03-05)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.25 to 0.0.3-next.26

## [0.0.3-next.25](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.24...engine-core-v0.0.3-next.25) (2026-03-02)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.24 to 0.0.3-next.25

## [0.0.3-next.24](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.23...engine-core-v0.0.3-next.24) (2026-02-26)


### Features

* use factory default feature for sorting ([ec8b370](https://github.com/iotaledger/twin-engine/commit/ec8b370c5c028cb300cdd1e76b0a0cdb2263773c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.23 to 0.0.3-next.24

## [0.0.3-next.23](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.22...engine-core-v0.0.3-next.23) (2026-02-23)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))
* add sorting to factories so default entries are at start ([1a69356](https://github.com/iotaledger/twin-engine/commit/1a693567befcf27e6edc9880746ee82cfb9538e5))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add tenant admin routes ([#76](https://github.com/iotaledger/twin-engine/issues/76)) ([3c0af90](https://github.com/iotaledger/twin-engine/commit/3c0af90a572fcda08d8720bdcee9b9f1cd02b872))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))
* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))
* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* multi instance component support ([#83](https://github.com/iotaledger/twin-engine/issues/83)) ([6012b50](https://github.com/iotaledger/twin-engine/commit/6012b50959df5af893f05516d42eea2e0800b31a))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* set initialised flag when skipping start ([039b4df](https://github.com/iotaledger/twin-engine/commit/039b4dff22c90d0ba3703372a11213709d26aa52))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))
* pass contextIds to populateClone ([#79](https://github.com/iotaledger/twin-engine/issues/79)) ([b22f1bb](https://github.com/iotaledger/twin-engine/commit/b22f1bbf0319069914e316d27de4c2a8623421cf))
* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))
* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.22 to 0.0.3-next.23

## [0.0.3-next.22](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.21...engine-core-v0.0.3-next.22) (2026-02-23)


### Features

* add sorting to factories so default entries are at start ([1a69356](https://github.com/iotaledger/twin-engine/commit/1a693567befcf27e6edc9880746ee82cfb9538e5))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.21 to 0.0.3-next.22

## [0.0.3-next.21](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.20...engine-core-v0.0.3-next.21) (2026-02-13)


### Features

* multi instance component support ([#83](https://github.com/iotaledger/twin-engine/issues/83)) ([6012b50](https://github.com/iotaledger/twin-engine/commit/6012b50959df5af893f05516d42eea2e0800b31a))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.20 to 0.0.3-next.21

## [0.0.3-next.20](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.19...engine-core-v0.0.3-next.20) (2026-02-06)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.19 to 0.0.3-next.20

## [0.0.3-next.19](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.18...engine-core-v0.0.3-next.19) (2026-02-05)


### Features

* set initialised flag when skipping start ([039b4df](https://github.com/iotaledger/twin-engine/commit/039b4dff22c90d0ba3703372a11213709d26aa52))


### Bug Fixes

* pass contextIds to populateClone ([#79](https://github.com/iotaledger/twin-engine/issues/79)) ([b22f1bb](https://github.com/iotaledger/twin-engine/commit/b22f1bbf0319069914e316d27de4c2a8623421cf))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.18 to 0.0.3-next.19

## [0.0.3-next.18](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.17...engine-core-v0.0.3-next.18) (2026-02-04)


### Features

* add tenant admin routes ([#76](https://github.com/iotaledger/twin-engine/issues/76)) ([3c0af90](https://github.com/iotaledger/twin-engine/commit/3c0af90a572fcda08d8720bdcee9b9f1cd02b872))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.17 to 0.0.3-next.18

## [0.0.3-next.17](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.16...engine-core-v0.0.3-next.17) (2026-02-02)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.16 to 0.0.3-next.17

## [0.0.3-next.16](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.15...engine-core-v0.0.3-next.16) (2026-01-28)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.15 to 0.0.3-next.16

## [0.0.3-next.15](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.14...engine-core-v0.0.3-next.15) (2026-01-26)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.14 to 0.0.3-next.15

## [0.0.3-next.14](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.13...engine-core-v0.0.3-next.14) (2026-01-19)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))
* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))
* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))
* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))
* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.13 to 0.0.3-next.14

## [0.0.3-next.13](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.12...engine-core-v0.0.3-next.13) (2026-01-19)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.12 to 0.0.3-next.13

## [0.0.3-next.12](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.11...engine-core-v0.0.3-next.12) (2026-01-19)


### Features

* improve startup error handling ([#65](https://github.com/iotaledger/twin-engine/issues/65)) ([5b2d1c5](https://github.com/iotaledger/twin-engine/commit/5b2d1c539cf5484afa85e294d6d6c18f24ef8274))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.11 to 0.0.3-next.12

## [0.0.3-next.11](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.10...engine-core-v0.0.3-next.11) (2026-01-16)


### Bug Fixes

* save state if dirty even if not started ([1abe4b9](https://github.com/iotaledger/twin-engine/commit/1abe4b97e6d27364dd673f62f83034b88b7fae0c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.10 to 0.0.3-next.11

## [0.0.3-next.10](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.9...engine-core-v0.0.3-next.10) (2026-01-13)


### Features

* add skipComponentStart flag ([#62](https://github.com/iotaledger/twin-engine/issues/62)) ([07e90af](https://github.com/iotaledger/twin-engine/commit/07e90afa4ba1baaa79c0c6f0f45200d781801534))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.9 to 0.0.3-next.10

## [0.0.3-next.9](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.8...engine-core-v0.0.3-next.9) (2026-01-07)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.8 to 0.0.3-next.9

## [0.0.3-next.8](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.7...engine-core-v0.0.3-next.8) (2026-01-06)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.7 to 0.0.3-next.8

## [0.0.3-next.7](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.6...engine-core-v0.0.3-next.7) (2025-12-04)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.6 to 0.0.3-next.7

## [0.0.3-next.6](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.5...engine-core-v0.0.3-next.6) (2025-11-28)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.5 to 0.0.3-next.6

## [0.0.3-next.5](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.4...engine-core-v0.0.3-next.5) (2025-11-20)


### Features

* initialise context id handlers before bootstrap ([e94df44](https://github.com/iotaledger/twin-engine/commit/e94df440aa553350dba5da2ae93b5c34e0ac3692))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.4 to 0.0.3-next.5

## [0.0.3-next.4](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.3...engine-core-v0.0.3-next.4) (2025-11-20)


### Features

* context id handlers repopulated after engine clone ([9712e32](https://github.com/iotaledger/twin-engine/commit/9712e328f4607f5b2c82355c394c61bde0ee39bf))
* interlock stop method ([3806ba7](https://github.com/iotaledger/twin-engine/commit/3806ba7b44b3cb3ce130f4e3684a666533674663))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.3 to 0.0.3-next.4

## [0.0.3-next.3](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.2...engine-core-v0.0.3-next.3) (2025-11-14)


### Bug Fixes

* make sure stop is called even if start is not implemented ([ece2b9d](https://github.com/iotaledger/twin-engine/commit/ece2b9de5c6dff2b5ccf2a3115c1a7328a330125))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.2 to 0.0.3-next.3

## [0.0.3-next.2](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.1...engine-core-v0.0.3-next.2) (2025-11-13)


### Features

* close already started components on startup error ([a55a117](https://github.com/iotaledger/twin-engine/commit/a55a117a508998288c8ae804e732fc6085cb22fa))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.1 to 0.0.3-next.2

## [0.0.3-next.1](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.3-next.0...engine-core-v0.0.3-next.1) (2025-11-13)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add context id features ([#51](https://github.com/iotaledger/twin-engine/issues/51)) ([eaef180](https://github.com/iotaledger/twin-engine/commit/eaef1807397a907bc7655ef1545a151a710ca2f1))
* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))
* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))
* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))
* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))
* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))
* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))
* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))
* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))
* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))
* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))
* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Bug Fixes

* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.3-next.0 to 0.0.3-next.1

## [0.0.2-next.26](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.25...engine-core-v0.0.2-next.26) (2025-10-09)


### Bug Fixes

* use correct instance type name ([6278486](https://github.com/iotaledger/twin-engine/commit/6278486d8f0f2d601d3cf521a647898cd7cc1f31))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.25 to 0.0.2-next.26

## [0.0.2-next.25](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.24...engine-core-v0.0.2-next.25) (2025-10-09)


### Features

* add validate-locales ([b92ea09](https://github.com/iotaledger/twin-engine/commit/b92ea09dbcfe35225271a51f24d231f59e2d363e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.24 to 0.0.2-next.25

## [0.0.2-next.24](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.23...engine-core-v0.0.2-next.24) (2025-10-08)


### Features

* maintain isDefault flag for registered instances ([2ac5bee](https://github.com/iotaledger/twin-engine/commit/2ac5bee094bef42b396cc82b0d18bb6aebe27352))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.23 to 0.0.2-next.24

## [0.0.2-next.23](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.22...engine-core-v0.0.2-next.23) (2025-10-07)


### Features

* override type initialisers with new registrations ([5b4ff56](https://github.com/iotaledger/twin-engine/commit/5b4ff561d06b6513c870a72bb20ba23c0653cfe8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.22 to 0.0.2-next.23

## [0.0.2-next.22](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.21...engine-core-v0.0.2-next.22) (2025-10-07)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.21 to 0.0.2-next.22

## [0.0.2-next.21](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.20...engine-core-v0.0.2-next.21) (2025-10-07)


### Features

* use peer dependencies ([69dd744](https://github.com/iotaledger/twin-engine/commit/69dd7449010b8e6f5f35e7fad201ad4c1cab400c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.20 to 0.0.2-next.21

## [0.0.2-next.20](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.19...engine-core-v0.0.2-next.20) (2025-10-06)


### Features

* standardised engine logging naming ([0dbf857](https://github.com/iotaledger/twin-engine/commit/0dbf857587641f86ddf010143519d0e8333489ff))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.19 to 0.0.2-next.20

## [0.0.2-next.19](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.18...engine-core-v0.0.2-next.19) (2025-10-02)


### Features

* simplify config building ([732c871](https://github.com/iotaledger/twin-engine/commit/732c871c5aca236759168f4bc15aeffd98a330a8))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.18 to 0.0.2-next.19

## [0.0.2-next.18](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.17...engine-core-v0.0.2-next.18) (2025-09-29)


### Features

* upgrade framework components ([efd52e8](https://github.com/iotaledger/twin-engine/commit/efd52e80564fff29c3897bfa09b6305b3a322812))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.17 to 0.0.2-next.18

## [0.0.2-next.17](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.16...engine-core-v0.0.2-next.17) (2025-09-26)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.16 to 0.0.2-next.17

## [0.0.2-next.16](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.15...engine-core-v0.0.2-next.16) (2025-09-25)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.15 to 0.0.2-next.16

## [0.0.2-next.15](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.14...engine-core-v0.0.2-next.15) (2025-09-24)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.14 to 0.0.2-next.15

## [0.0.2-next.14](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.13...engine-core-v0.0.2-next.14) (2025-09-19)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.13 to 0.0.2-next.14

## [0.0.2-next.13](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.12...engine-core-v0.0.2-next.13) (2025-09-08)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.12 to 0.0.2-next.13

## [0.0.2-next.12](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.11...engine-core-v0.0.2-next.12) (2025-09-05)


### Features

* add rights management negotiation ([84ef46b](https://github.com/iotaledger/twin-engine/commit/84ef46bff110611a19512793425c8c873ee2a590))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.11 to 0.0.2-next.12

## [0.0.2-next.11](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.10...engine-core-v0.0.2-next.11) (2025-08-29)


### Features

* eslint migration to flat config ([6b978da](https://github.com/iotaledger/twin-engine/commit/6b978daf777a615d7758b63c3df57d5a376f6dfb))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.10 to 0.0.2-next.11

## [0.0.2-next.10](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.9...engine-core-v0.0.2-next.10) (2025-08-26)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.9 to 0.0.2-next.10

## [0.0.2-next.9](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.8...engine-core-v0.0.2-next.9) (2025-08-25)


### Features

* add isPrimary and isClone methods ([a7c63e9](https://github.com/iotaledger/twin-engine/commit/a7c63e97f54c95b104cc81e66d3fa42c6607bdc1))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.8 to 0.0.2-next.9

## [0.0.2-next.8](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.7...engine-core-v0.0.2-next.8) (2025-08-22)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.7 to 0.0.2-next.8

## [0.0.2-next.7](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.6...engine-core-v0.0.2-next.7) (2025-08-22)


### Features

* remove unused component states ([d56d648](https://github.com/iotaledger/twin-engine/commit/d56d6486119ea8b8501a33f9e3a3101a08b826ed))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.6 to 0.0.2-next.7

## [0.0.2-next.6](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.5...engine-core-v0.0.2-next.6) (2025-08-21)


### Features

* update framework core ([acc0f8d](https://github.com/iotaledger/twin-engine/commit/acc0f8d455a4b8ec47f1da643139fa0f07775fa6))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.5 to 0.0.2-next.6

## [0.0.2-next.5](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.4...engine-core-v0.0.2-next.5) (2025-08-14)


### Features

* add synchronised storage support ([5142e34](https://github.com/iotaledger/twin-engine/commit/5142e3488f09195cf9f48a9c6c6d1014231a4c2c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.4 to 0.0.2-next.5

## [0.0.2-next.4](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.3...engine-core-v0.0.2-next.4) (2025-07-25)


### Features

* add default logging component for web server ([8ad94f0](https://github.com/iotaledger/twin-engine/commit/8ad94f0d2d9a5241a8854b1e59fb9a55ce310142))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.3 to 0.0.2-next.4

## [0.0.2-next.3](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.2...engine-core-v0.0.2-next.3) (2025-07-24)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.2 to 0.0.2-next.3

## [0.0.2-next.2](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.1...engine-core-v0.0.2-next.2) (2025-07-21)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.1 to 0.0.2-next.2

## [0.0.2-next.1](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.2-next.0...engine-core-v0.0.2-next.1) (2025-07-11)


### Features

* add auth admin component ([201cd06](https://github.com/iotaledger/twin-engine/commit/201cd061be83afccb5a6b06856ffe7cf8db7d6b3))
* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.2-next.0 to 0.0.2-next.1

## 0.0.1 (2025-07-11)


### Features

* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* release to production ([3a4acd1](https://github.com/iotaledger/twin-engine/commit/3a4acd1f6c66b841d80b6fd3bc1a439a77148fa5))
* release to production ([5559958](https://github.com/iotaledger/twin-engine/commit/5559958e2128e6ec3a81e779d1ebd3f370bbb081))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.84 to 0.0.1

## [0.0.1-next.84](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.83...engine-core-v0.0.1-next.84) (2025-07-11)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.83 to 0.0.1-next.84

## [0.0.1-next.83](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.82...engine-core-v0.0.1-next.83) (2025-07-10)


### Features

* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))
* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.81 to 0.0.1-next.83

## [0.0.1-next.81](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.80...engine-core-v0.0.1-next.81) (2025-07-07)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.80 to 0.0.1-next.81

## [0.0.1-next.80](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.79...engine-core-v0.0.1-next.80) (2025-06-23)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.79 to 0.0.1-next.80

## [0.0.1-next.79](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.78...engine-core-v0.0.1-next.79) (2025-06-18)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.78 to 0.0.1-next.79

## [0.0.1-next.78](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.77...engine-core-v0.0.1-next.78) (2025-06-18)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.77 to 0.0.1-next.78

## [0.0.1-next.77](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.76...engine-core-v0.0.1-next.77) (2025-06-18)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.76 to 0.0.1-next.77

## [0.0.1-next.76](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.75...engine-core-v0.0.1-next.76) (2025-06-12)


### Features

* update dependencies ([97c9f64](https://github.com/iotaledger/twin-engine/commit/97c9f64b6ef096963bcc5de338a2a9e99bdc1a11))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.75 to 0.0.1-next.76

## [0.0.1-next.75](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.74...engine-core-v0.0.1-next.75) (2025-05-29)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.74 to 0.0.1-next.75

## [0.0.1-next.74](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.73...engine-core-v0.0.1-next.74) (2025-05-23)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.73 to 0.0.1-next.74

## [0.0.1-next.73](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.72...engine-core-v0.0.1-next.73) (2025-05-22)


### Features

* remove bootstrapped components, component should manage their own state ([5c7e9e4](https://github.com/iotaledger/twin-engine/commit/5c7e9e419ef26933e49c9c5a21a20a8961244e7f))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.72 to 0.0.1-next.73

## [0.0.1-next.72](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.71...engine-core-v0.0.1-next.72) (2025-05-06)


### Features

* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))
* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.71 to 0.0.1-next.72

## [0.0.1-next.71](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.70...engine-core-v0.0.1-next.71) (2025-05-06)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.70 to 0.0.1-next.71

## [0.0.1-next.70](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.69...engine-core-v0.0.1-next.70) (2025-04-28)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.69 to 0.0.1-next.70

## [0.0.1-next.69](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.68...engine-core-v0.0.1-next.69) (2025-04-25)


### Miscellaneous Chores

* **engine-core:** Synchronize repo versions


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.68 to 0.0.1-next.69

## [0.0.1-next.68](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.67...engine-core-v0.0.1-next.68) (2025-04-17)


### Features

* use shared store mechanism ([#2](https://github.com/iotaledger/twin-engine/issues/2)) ([9eed8d7](https://github.com/iotaledger/twin-engine/commit/9eed8d7766388479b42f03e2542fe761f2156408))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.67 to 0.0.1-next.68

## [0.0.1-next.67](https://github.com/iotaledger/twin-engine/compare/engine-core-v0.0.1-next.66...engine-core-v0.0.1-next.67) (2025-03-28)


### Features

* add mimeTypeProcessors and disableNodeIdentity ([bb7e81e](https://github.com/iotaledger/twin-engine/commit/bb7e81e2036fe042068a5645ec59b22e20d33aad))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @twin.org/engine-models bumped from 0.0.1-next.66 to 0.0.1-next.67

## v0.0.1-next.66

- Initial Release
