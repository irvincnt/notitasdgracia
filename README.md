# ✨ Notitas de Gracia - Blog con MDX y Next.js

Un hermoso blog moderno construido con Next.js, MDX y Tailwind CSS. Perfecto para compartir historias sobre arte, fotografía y creatividad.

## 🚀 Características

- **MDX Integration**: Escribe tus posts en Markdown con soporte para JSX
- **Diseño Responsivo**: Hermoso diseño adaptable a todos los dispositivos
- **Dark Mode**: Soporte completo para modo oscuro
- **SEO Optimizado**: Metadatos automáticos y generación de sitemaps
- **Tailwind CSS v4**: Estilos modernos y personalizables
- **GitHub Flavored Markdown**: Soporte para tablas, listas de tareas y más
- **Renderizado Estático**: Mejor rendimiento con pre-renderización

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn

## 🛠️ Instalación

1. **Clona el repositorio**

   ```bash
   git clone <tu-repositorio>
   cd notitas-de-gracia
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   El blog estará disponible en `http://localhost:3000`

## 📝 Crear un Nuevo Post

Para crear un nuevo post, crea un archivo `.mdx` en `src/content/blog/`:

```mdx
export const metadata = {
  title: "Mi Primer Post",
  description: "Una breve descripción del post",
  date: "2024-01-15",
  image: "https://example.com/imagen.jpg",
  author: "Tu Nombre",
};

# Mi Primer Post

Aquí va el contenido del post en Markdown...

## Secciones

- Puedes usar **negritas**
- _Itálicas_
- `código inline`

### Listas y Más

1. Listas numeradas
2. Funcionan perfectamente
3. Sin problemas
```

Los posts se organizan automáticamente por fecha en orden descendente.

## 📁 Estructura del Proyecto

```
notitas-de-gracia/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Página individual de posts
│   │   │   └── page.tsx              # Listado de todos los posts
│   │   ├── components/
│   │   │   └── mdx-layout.tsx        # Layout para artículos MDX
│   │   ├── globals.css               # Estilos globales
│   │   ├── layout.tsx                # Layout principal
│   │   ├── page.tsx                  # Página principal (home)
│   │   └── mdx-components.tsx        # Configuración de componentes MDX
│   ├── content/
│   │   └── blog/                     # Archivos MDX de los posts
│   │       ├── fotografia-silvestre.mdx
│   │       ├── arte-tridimensional.mdx
│   │       ├── tendencias-arte-display.mdx
│   │       └── viajes-descubrimiento.mdx
│   └── lib/
│       └── blog.ts                   # Utilidades para leer posts
├── next.config.ts                    # Configuración de Next.js con MDX
├── tailwind.config.js                # Configuración de Tailwind
├── tsconfig.json                     # Configuración de TypeScript
└── package.json
```

## 🎨 Personalización

### Cambiar el Título y Descripción

Edita `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Tu Nombre - Blog",
  description: "La descripción de tu blog",
};
```

### Modificar el Logo/Nombre

En el mismo archivo `src/app/layout.tsx`, busca:

```typescript
<a href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
  ✨ Notitas de Gracia
</a>
```

### Estilos Personalizados

La mayoría de los estilos están en Tailwind CSS. Edita los archivos `.tsx` para cambiar las clases.

## 🚀 Build y Deploy

### Construir para Producción

```bash
npm run build
```

### Iniciar en Producción

```bash
npm run start
```

### Deploy en Vercel (Recomendado)

1. Sube tu código a GitHub
2. Conecta tu repositorio en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente que es un proyecto Next.js
4. ¡Listo! Tu blog estará en vivo

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Guía de MDX en Next.js](https://nextjs.org/docs/pages/guides/mdx)
- [Tailwind CSS Documentación](https://tailwindcss.com/docs)
- [Remark & Rehype Plugins](https://github.com/remarkjs/remark)

## 🛠️ Tecnologías Utilizadas

- **Next.js 15.5.6** - Framework React
- **MDX** - Markdown con JSX
- **Tailwind CSS v4** - Utilidades CSS
- **@tailwindcss/typography** - Plugin de tipografía
- **Remark GFM** - GitHub Flavored Markdown
- **TypeScript** - Tipado estático

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 💬 Soporte

Si tienes preguntas o sugerencias, no dudes en abrir un issue en GitHub.

---

**Hecho con ❤️ para compartir historias hermosas**
