import Navigo from 'navigo';
import { loadPage } from "./components/loadPage.ts";

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

const app: HTMLElement | null = document.getElementById("app");
const nav: HTMLElement | null = document.getElementById("navigation");

let navHTML = `<ul>` +
  navItems.map(
    (item) => `
      <li>
        <a href="${item.url}">${item.name}</a>
        ${
      item.subItems
        ? `<ul>` +
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

const router = new Navigo("/", {
  hash: false,
  linksSelector: 'a',
});

const registerRoute = async (url: string, render: string) => {
  router.on(url, async () => {
    const content = await loadPage(render);
    if (app && content) {
      app.innerHTML = content;
    }
  });
};

for (const item of navItems) {
  await registerRoute(item.url, item.render);

  if (item.subItems) {
    for (const subItem of item.subItems) {
      await registerRoute(subItem.url, subItem.render);
    }
  }
}

router.notFound(() => {
  if (app) app.innerHTML = `<h1>Página no encontrada</h1>`;
});

router.resolve();