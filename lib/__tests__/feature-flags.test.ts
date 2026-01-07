import { describe, it, expect, beforeEach, vi } from "vitest"
import { isFeatureEnabled, getEnabledFeatures } from "../features/flags"
import { connectDB } from "../db/mongoose"

vi.mock("../db/mongoose", () => ({
  connectDB: vi.fn(),
}))

describe("Feature Flags", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("isFeatureEnabled", () => {
    it("should return false if flag doesn't exist", async () => {
      const FeatureFlag = {
        findOne: vi.fn().mockResolvedValue(null),
      }

      vi.doMock("mongoose", () => ({
        default: {
          models: { FeatureFlag },
          model: vi.fn(),
        },
      }))

      const enabled = await isFeatureEnabled("nonexistent", "user-123")
      expect(enabled).toBe(false)
    })

    it("should return false if flag is disabled", async () => {
      const FeatureFlag = {
        findOne: vi.fn().mockResolvedValue({
          key: "test-flag",
          enabled: false,
          environments: ["production"],
        }),
      }

      vi.doMock("mongoose", () => ({
        default: {
          models: { FeatureFlag },
          model: vi.fn(),
        },
      }))

      const enabled = await isFeatureEnabled("test-flag", "user-123")
      expect(enabled).toBe(false)
    })

    it("should return true if flag is enabled and user is in target list", async () => {
      const FeatureFlag = {
        findOne: vi.fn().mockResolvedValue({
          key: "test-flag",
          enabled: true,
          environments: ["production"],
          targetUsers: ["user-123"],
          rolloutPercentage: 100,
        }),
      }

      vi.doMock("mongoose", () => ({
        default: {
          models: { FeatureFlag },
          model: vi.fn(),
        },
      }))

      const enabled = await isFeatureEnabled("test-flag", "user-123")
      expect(enabled).toBe(true)
    })
  })
})

