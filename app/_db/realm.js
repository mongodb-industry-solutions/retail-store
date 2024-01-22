import * as Realm from "realm-web";

export function useApp() {
  const app = new Realm.App({ id: process.env.APP_ID });
  return app;
}