import './globals.css';

export const metadata = {
  title: 'Erik Salvatierra Choque | Portafolio',
  description: 'Portafolio personal de Erik Salvatierra Choque: desarrollo web, proyectos y contacto.'
};

export default function RootLayout({children}) {
  return <html lang="es"><body>{children}</body></html>;
}
