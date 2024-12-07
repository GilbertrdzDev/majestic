export const loadPage = async (page: string) => {
  try {
    const response = await fetch(`./pages/${page}.html`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.text();
  } catch (error) {
    console.error('Error al cargar la página:', error);
  }
};