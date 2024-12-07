import Navigo from 'navigo';
import { loadPage } from "./components/loadPage.ts";

export interface NavItem {
  name: string;
  url: string;
  render: string;
}

export const navItems: NavItem[] = [
  {name: "Home", url: "/", render: "home"},
  {name: "About", url: "/about", render: "about"},
  {name: "Shop", url: "/shop", render: "shop"},
  {name: "Contact", url: "/contact", render: "contact"},
];

const app: HTMLElement | null = document.getElementById("app");
const nav: HTMLElement | null = document.getElementById("navigation");

let navHTML = `<ul>` +
  navItems.map((item) => `<li><a href="${item.url}">${item.name}</a></li>`)
          .join("")
  + `</ul>`;

if (nav) nav.innerHTML = navHTML;

const router = new Navigo("/", {
  hash: false,
  linksSelector: 'a',
});

for (const item of navItems) {
  router.on(item.url, async () => {
    const content = await loadPage(item.render);
    if (app && content) {
      app.innerHTML = content;
    }
  });
}

router.notFound(() => {
  if (app) app.innerHTML = `<h1>Página no encontrada</h1>`;
});

router.resolve();