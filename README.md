# RTC PR-12: MovieApp (Advanced)

Una aplicación web moderna para explorar y buscar películas, construida con React y Vite.

## Características

- 🎬 Exploración de películas populares
- 🔍 Búsqueda en tiempo real
- 📱 Diseño responsive
- 🌙 Modo oscuro por defecto
- ⚡ Carga optimizada de imágenes (lazy loading)
- 🔄 Gestión de estado global
- 📑 Navegación entre páginas
- 🎯 Modales interactivos
- ⚠️ Manejo de errores
- 🚀 Optimización de rendimiento

## Tecnologías

- React 19
- Vite 6
- Axios 1.7
- React Router DOM 7
- React Icons 5
- The Movie Database API

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- API Key de TMDB

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/oihuka/rtc_p12.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_TMDB_API_KEY=tu_api_key_aquí
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── components/    # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── hooks/         # Custom hooks
├── reducers/      # Gestión de estado global
├── services/      # Servicios y configuración de API
└── .css           # Estilos CSS de la aplicación
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
