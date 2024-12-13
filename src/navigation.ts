import { getRouter } from "./components/getRouter.ts";
import { registerRoute } from "./components/registerRoute.ts";
import { getAppRoot } from "./components/getAppRoot.ts";

export interface NavItem {
  name: string;
  url: string;
  render: string;
  subItems?: NavItem[];
}

export const navItems: NavItem[] = [
  {name: "Home", url: "/", render: "home"},
  {name: "About", url: "/about", render: "about"},
  {name: "Contact", url: "/contact", render: "contact"},
  {
    name: "Shop",
    url: "/shop",
    render: "shop/index",
    subItems: [
      {name: "Man", url: "/shop/hombre", render: "shop/hombre"},
      {name: "Women", url: "/shop/mujer", render: "shop/mujer"},
      {name: "Baby", url: "/shop/bebe", render: "shop/bebe"},
      {name: "Sporty", url: "/shop/deportiva", render: "shop/deportiva"},
      {name: "Child", url: "/shop/nino", render: "shop/nino"},
    ],
  },
];

const app = getAppRoot();
const nav: HTMLElement | null = document.getElementById("navigation");

let navHTML = `<ul>` +
  navItems.map(
    (item) => `
      <li>
        <a href="${item.url}">${item.name}</a>
        ${
      item.subItems
        ? `<ul class="submenu">` +
        item.subItems
            .map(
              (subItem) =>
                `<li><a href="${subItem.url}">${subItem.name}</a></li>`,
            )
            .join("") +
        `</ul>`
        : ""
    }
      </li>`,
  ).join("") +
  `</ul>`;

if (nav) nav.innerHTML = navHTML;

(async () => {
  for (const item of navItems) {
    await registerRoute(item.url, item.render);

    if (item.subItems) {
      for (const subItem of item.subItems) {
        await registerRoute(subItem.url, subItem.render);
      }
    }
  }
})();

const router = getRouter();

router.notFound(() => {
  if (app) app.innerHTML = `<h1>Página no encontrada</h1>`;
});

router.resolve();