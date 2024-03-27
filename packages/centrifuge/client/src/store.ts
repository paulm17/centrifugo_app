// import { Centrifuge } from "centrifuge";
import { proxy } from "valtio";
import { Store } from "./types";

/*const storage =
  typeof window !== "undefined"
    ? (localStorage.getItem("centrifuge_session_id") as string)
    : "{}"*/

export const useCentrifugeStore: Store = proxy<Store>({
  isLoaded: false,
  connection: null,
  subscriptions: [],
  /*...(JSON.parse(storage) || {*/
  token: "",
  expires: null,
  sessionId: "",
  //}),
});

/*subscribe(useCentrifugeStore, () => {
  const { connection, subscriptions, ...rest } = { ...useCentrifugeStore }

  localStorage.setItem("centrifuge_session_id", JSON.stringify(rest))
})*/
