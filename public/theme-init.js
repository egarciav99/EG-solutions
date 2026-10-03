// Aplica el tema guardado antes de pintar la página, para evitar un parpadeo claro en modo oscuro.
// Va como archivo propio (y no inline) porque la CSP solo permite scripts de este dominio.
try {
  if (localStorage.getItem('eg-theme') === 'dark') document.documentElement.dataset.theme = 'dark';
} catch (e) {}
