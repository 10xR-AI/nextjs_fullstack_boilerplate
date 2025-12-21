import Redis from "ioredis"

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"

// Singleton pattern for Redis connection
let redisInstance: Redis | null = null

export function getRedis(): Redis {
  if (!redisInstance) {
    redisInstance = new Redis(REDIS_URL, {
      maxRetriesPerRequest: null, // Required for BullMQ
      enableReadyCheck: false,
    })

    redisInstance.on("error", (error) => {
      console.error("Redis connection error:", error)
    })

    redisInstance.on("connect", () => {
      console.log("Redis connected")
    })
  }

  return redisInstance
}

// Create a new connection (for workers that need dedicated connections)
export function createRedisConnection(): Redis {
  return new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  })
}

// Close all connections gracefully
export async function closeRedis(): Promise<void> {
  if (redisInstance) {
    await redisInstance.quit()
    redisInstance = null
  }
}
