# RTC PR-12: Chess Coach ♟️

Una aplicación web moderna para aprender y practicar ajedrez, construida con React y Vite. Esta aplicación proporciona una interfaz interactiva para jugar ajedrez con un diseño responsive y moderno.

## Características

- ♟️ Tablero de ajedrez interactivo
- 📱 Diseño responsive que mantiene el tablero cuadrado
- 🎯 Movimientos de piezas validados
- 🌙 Modo oscuro por defecto
- 🔄 Gestión de estado global
- ⚡ Rendimiento optimizado
- 🎨 Diseño limpio y profesional
- ⚠️ Manejo de errores
- 🔍 Validación de movimientos en tiempo real

## Tecnologías

- React 19
- Vite 6
- PropTypes 15.8
- React Icons 5.4.0
- React Router DOM 7.1.5

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/oihuka/rtc_p12.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── assets/ # Recursos estáticos e imágenes de piezas
├── components/ # Componentes reutilizables
│ ├── ChessBoard/ # Componente principal del tablero
│ └── ... # Otros componentes
├── pages/ # Páginas de la aplicación
├── hooks/ # Custom hooks
├── reducers/ # Gestión de estado global
├── styles/ # Estilos CSS modulares
└── utils/ # Utilidades y lógica del juego
```

## Componentes Principales

### ChessBoard

El componente central de la aplicación que implementa:

- Tablero de 8x8 responsive
- Manejo de estado para posiciones de piezas
- Validación de movimientos
- Interfaz interactiva para el jugador

## Características del Tablero

- Diseño responsive que mantiene la proporción cuadrada
- Sistema de coordenadas integrado
- Soporte para movimientos de piezas
- Validación de movimientos legales
- Interfaz intuitiva para el usuario

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Genera la versión de producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter para verificar el código
- `npm run clean`: Limpia los directorios de build y dependencias

## Buenas Prácticas Implementadas

- Uso de PropTypes para validación de tipos
- Componentes modulares y reutilizables
- CSS modular para evitar conflictos de estilos
- Código limpio y documentado
- Manejo de estados eficiente
- Optimización de rendimiento

## Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
