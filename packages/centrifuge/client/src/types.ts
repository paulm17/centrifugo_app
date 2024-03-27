import type { Centrifuge, Subscription } from "centrifuge"

export interface Store {
  isLoaded: boolean
  token: string
  expires: number | null
  sessionId: string
  connection: Centrifuge | null
  subscriptions: Subscription[]
}

export interface Message {
  event: string
  data: any
}
