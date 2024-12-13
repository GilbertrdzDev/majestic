import Navigo from "navigo";

let router: Navigo | null | undefined = null;

export const getRouter = () => {
  if (!router) {
    router = new Navigo("/", {
      hash: false,
      linksSelector: "a",
    });
  }
  return router;
}