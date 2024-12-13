import { loadPage } from "./loadPage.ts";
import { getRouter } from "./getRouter.ts";
import { getAppRoot } from "./getAppRoot.ts";

import Alpine from 'alpinejs'
// @ts-ignore
import morph from '@alpinejs/morph'
import { verifyAddToCart } from "./verifyAddToCart.ts";

// @ts-ignore
window.Alpine = Alpine
Alpine.plugin(morph)

const router = getRouter();
const app = getAppRoot();

export const registerRoute = async (url: string, render: string) => {
  router.on(url, async () => {
    const content = await loadPage(render);
    if (app && content) {
      Alpine.morph(app.children[0], content);
      verifyAddToCart();
    }
  });
};