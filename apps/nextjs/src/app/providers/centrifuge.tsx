"use client";

import { useEffect } from "react"
import type { ReactNode } from "react"
import { useCentrifuge, useCentrifugeStore, ref, Message } from "@acme/centrifuge-client";

interface CentrifugeProps {
  children: ReactNode
}

function Centrifuge({children}: CentrifugeProps) {
  const serverId = "1234";
  const userId = "A-1234"
  const { connection: centrifuge, sessionId } = useCentrifuge({ userId })

  useEffect(() => {
    if (centrifuge !== null) {
      if (centrifuge.state === "connecting") {
        try {
          if (centrifuge.state === "connecting") {
            useCentrifugeStore.connection = ref(centrifuge)
            // isMountedRef.current = true
            console.log("established connection")

          } else if (centrifuge.state === "disconnected") {
            centrifuge.on("connected", function () {
              useCentrifugeStore.connection = ref(centrifuge)
              // isMountedRef.current = true
              console.log("established new connection")
            })
          }
        } catch (err) {
          console.log("centrifuge", err)
        }
      }
    }
  }, [centrifuge])

  useEffect(() => {
    if (centrifuge !== null) {
      const subServer = centrifuge.newSubscription(`server:${serverId}`)

      subServer.on("publication", function (ctx) {
        const msg = ctx.data as Message

        console.log("message recieved", msg)
      })


      subServer.subscribe()

      return () => {
        subServer.unsubscribe()
        centrifuge.removeSubscription(subServer)
      }
    }
  }, [centrifuge, sessionId])

  return <>{children}</>
}

export default Centrifuge