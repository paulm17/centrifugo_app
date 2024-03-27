import { useState } from "react"
import { ref, useSnapshot } from "valtio"
import { Centrifuge } from "centrifuge"
import { DateTime } from "luxon"
import { useCentrifugeStore } from "./store"

interface props {
  userId: string
}

export function useCentrifuge({ userId }: props) {
  const [connection, setConnection] = useState<Centrifuge | null>(null)
  const store = useSnapshot(useCentrifugeStore)

  const getToken = () => {
    if (store.token && store.expires) {
      if (
        store.expires <
        DateTime.utc()
          .set({ millisecond: 0 })
          .minus({ minutes: 15 })
          .toSeconds()
      ) {
        return store.token
      }
    }

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/centrifuge/getToken`, {
        method: "GET",
        headers: new Headers({
          "user-id": userId,
        }),
      })
        .then(response => response.json())
        .then(response => {
          useCentrifugeStore.token = response.data.token
          useCentrifugeStore.expires = response.data.expires
          useCentrifugeStore.sessionId = response.data.sessionId

          resolve(response.data.token)
        }).catch(err => {
          console.log("centrifuge token error")
          console.log(err)
          reject(err)
        })
    })
  }

  const getRefreshToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (store.sessionId === "") {
        resolve("")
      }

      fetch(`${process.env.NEXT_PUBLIC_URL}/api/centrifuge/refreshToken`, {
        method: "POST",
        headers: new Headers({
          "session-id": store.sessionId,
        }),
      })
        .then(function (resp) {
          resp.json().then(function (resp) {
            useCentrifugeStore.token = resp.data.token
            useCentrifugeStore.expires = resp.data.expires

            resolve(resp.data.token)
          })
        })
        .catch(err => {
          console.log("centrifuge token refresh error")
          console.log(err)
          reject(err)
        })
    })
  }

  const getConnection = (token: string) => {
    const centrifuge = new Centrifuge(
      `ws://${process.env.NEXT_PUBLIC_CENTRIFUGE_WEBSOCKET_URL}/connection/websocket`,
      {
        token: token,
        getToken: async () => {
          return await getRefreshToken()
        },
      },
    )

    centrifuge.connect()

    return centrifuge.on('connected', function(ctx) {
      return ctx
    });
  }

  const init = async() => {
    const token = await getToken()
    const conn = getConnection(token as string)

    if (conn !== null) {
      setConnection(conn)
      useCentrifugeStore.connection = ref(conn)
    }
  }

  if (userId !== null && useCentrifugeStore.connection === null) {
    init()
  }

  return {
    connection,
    sessionId: store.sessionId,
    useStore: useCentrifugeStore,
  }
}
