import { loadPage } from "./loadPage.ts";
import { getRouter } from "./getRouter.ts";
import { getAppRoot } from "./getAppRoot.ts";

const router = getRouter();
const app = getAppRoot();

export const registerRoute = async (url: string, render: string) => {
  router.on(url, async () => {
    const content = await loadPage(render);
    if (app && content) {
      app.innerHTML = content;
    }
  });
};