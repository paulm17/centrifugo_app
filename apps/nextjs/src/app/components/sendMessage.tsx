"use client"

import { useCentrifugeStore } from "@acme/centrifuge-client"

export function SendMessage() {
  const serverId = "1234"
  const userId = "A-1234"

  const onSubmit = async() => {
    const data = {
      origin: "centrifuge",
      event: "onlineState",
      data: {
        chatUserId: userId,
        online: true,
      },
      sentId: userId,
    }

    await useCentrifugeStore.connection?.publish(
      `server:${serverId}`,
      data,
    )
  }

  return <>
    <button onClick={onSubmit}>hit me</button>
  </>
}

export default SendMessage