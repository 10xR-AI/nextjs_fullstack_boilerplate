# Testing Guide

Complete testing documentation for the Modern Next.js Boilerplate.

---

## Test Structure

### Unit Tests
Located in `lib/__tests__/` and `app/api/__tests__/`:
- **API Keys**: `lib/__tests__/api-keys.test.ts`
- **Usage Tracker**: `lib/__tests__/usage-tracker.test.ts`
- **Notifications**: `lib/__tests__/notifications.test.ts`
- **Cost Tracker**: `lib/__tests__/cost-tracker.test.ts`
- **Templates**: `lib/__tests__/templates.test.ts`
- **Search**: `lib/__tests__/search.test.ts`
- **Activity Feed**: `lib/__tests__/activity.test.ts`
- **Roles**: `lib/__tests__/roles.test.ts`
- **Feature Flags**: `lib/__tests__/feature-flags.test.ts`
- **Billing**: `lib/__tests__/billing.test.ts`

### API Route Tests
Located in `app/api/__tests__/`:
- **API Keys API**: `app/api/__tests__/api-keys.test.ts`
- **Notifications API**: `app/api/__tests__/notifications.test.ts`
- **Health Check**: `app/api/__tests__/health.test.ts`

### Component Tests
Located alongside components:
- **Button**: `components/Button/Button.test.tsx`

### E2E Tests
Located in `e2e/`:
- **Example**: `e2e/example.spec.ts`

---

## Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# With UI
pnpm test:ui

# Coverage report
pnpm test:coverage

# E2E tests
pnpm e2e:headless
pnpm e2e:ui
```

---

## Test Coverage

### Core Features Tested

✅ **API Keys Management**
- Key generation and hashing
- Key creation and verification
- Key listing and revocation
- API route handlers

✅ **Usage Tracking**
- Usage tracking with quotas
- Quota checking and enforcement
- Usage statistics aggregation

✅ **Notifications**
- Notification creation
- Email delivery
- Mark as read/unread
- Unread count

✅ **Cost Tracking**
- Cost calculation for AI providers
- Cost tracking and aggregation
- Cost summaries

✅ **Templates**
- Template creation
- Template retrieval and filtering
- Usage tracking

✅ **Search**
- Document indexing
- Full-text search
- Fallback search

✅ **Activity Feed**
- Activity creation
- Feed retrieval
- User activity tracking

✅ **Roles & Permissions**
- Role configuration loading
- Permission checking
- Wildcard permissions

✅ **Feature Flags**
- Flag checking
- Rollout percentages
- User/organization targeting

✅ **Billing**
- Plan definitions
- Stripe integration structure

---

## Test Setup

### Configuration

Tests use Vitest with:
- **Environment**: jsdom (for React components)
- **Setup Files**: `vitest.setup.ts`, `lib/__tests__/setup.ts`
- **Coverage**: v8 provider with text, json, and html reports

### Mocking Strategy

- **Database**: Mongoose models are mocked
- **External Services**: Stripe, PostHog, etc. are mocked
- **Auth**: Better Auth session is mocked
- **Queue**: Job queue functions are mocked

---

## Writing New Tests

### Example: Testing a Library Function

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest"
import { myFunction } from "../my-module"
import { connectDB } from "../db/mongoose"

vi.mock("../db/mongoose", () => ({
  connectDB: vi.fn(),
}))

describe("My Module", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should do something", async () => {
    const result = await myFunction()
    expect(result).toBeDefined()
  })
})
```

### Example: Testing an API Route

```typescript
import { describe, it, expect, vi } from "vitest"
import { GET } from "../my-route"
import { auth } from "@/lib/auth"

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

describe("My API Route", () => {
  it("should return data", async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue({
      user: { id: "user-123" },
    } as any)

    const request = new Request("http://localhost/api/my-route")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toBeDefined()
  })
})
```

---

## Best Practices

1. **Mock External Dependencies**: Always mock database, external APIs, and services
2. **Test Edge Cases**: Test error conditions, empty inputs, and boundary cases
3. **Isolate Tests**: Each test should be independent and not rely on others
4. **Clear Mocks**: Use `beforeEach` to clear mocks between tests
5. **Descriptive Names**: Use clear, descriptive test names
6. **Arrange-Act-Assert**: Structure tests with clear sections

---

## Continuous Integration

Tests should run in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run tests
  run: pnpm test

- name: Generate coverage
  run: pnpm test:coverage

- name: Run E2E tests
  run: pnpm e2e:headless
```

---

## Troubleshooting

### Tests Failing

1. **Check Mock Setup**: Ensure all dependencies are properly mocked
2. **Verify Environment**: Check that test environment variables are set
3. **Clear Cache**: Try clearing `.next` and `node_modules`
4. **Check Imports**: Ensure all imports are correct and paths are valid

### Coverage Issues

1. **Exclude Patterns**: Check `vitest.config.ts` for exclude patterns
2. **Missing Tests**: Add tests for uncovered code paths
3. **Mock Coverage**: Ensure mocks don't interfere with coverage

---

## Next Steps

- Add more integration tests
- Add E2E tests for critical flows
- Increase coverage for edge cases
- Add performance tests
- Add load tests for API routes

