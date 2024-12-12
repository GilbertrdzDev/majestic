let app: HTMLElement | null = null;

export const getAppRoot = () => {
  if (!app) {
    app = document.getElementById("app");
  }
  return app;
}