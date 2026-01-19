## 📝 Description

Remove the authentication generator component surface from engine-types, and update documentation and tests accordingly.

## 🔄 Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [x] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [x] 📚 Documentation update
- [ ] ⚡ Performance improvement
- [x] ♻️ Code refactoring
- [x] 📦 Dependencies update

## 🛠️ Changes Made

- Remove `AuthenticationGenerator*` exports, config types, and initialiser from `@twin.org/engine-types`
- Remove `authenticationGeneratorComponent` from `IEngineConfig` / `IEngineServerConfig` docs and typings
- Update engine and engine-server tests to stop configuring/verifying authentication generator setup
- Remove `package-lock.json`

## 🧪 Testing

- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested this change manually
- [x] Testing not required for changes
