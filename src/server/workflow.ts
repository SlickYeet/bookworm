import { Client as QStashClient } from "@upstash/qstash"
import { Client as WorkflowClient } from "@upstash/workflow"

import { env } from "@/config"

export const workflowClient = new WorkflowClient({
  baseUrl: env.upstash.qStash.url,
  token: env.upstash.qStash.token,
})

export const qStashClient = new QStashClient({
  token: env.upstash.qStash.token,
})
