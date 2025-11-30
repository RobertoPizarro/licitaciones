---
trigger: always_on
---

# Arquitectura Frontend: Atomic Design

- **Modelo de Datos:** Guiarse ESTRICTAMENTE por `backend/app/models/licitaciones/diagramaClases.txt`. Si el código difiere del diagrama, el diagrama tiene la razón.

## ⚛️ Estructura

El módulo `licitaciones` utiliza **Atomic Design**. Ubica los componentes según su complejidad:

1.  **Atoms:** UI básica (Botones, Inputs, Badges).
2.  **Molecules:** Grupos funcionales (Cards de propuestas, Filas de ítems).
3.  **Organisms:** Secciones complejas (Modales de evaluación, Timelines).
4.  **Templates:** Estructura de página (Layouts).
5.  **Pages:** Lógica de negocio y conexión con Hooks.

## 🎨 UI/UX

- **Framework:** React + Vite + TailwindCSS.
- **Iconos:** `lucide-react`.
- **Regla:** El frontend debe reflejar los estados definidos en el backend. Si el backend dice `EVALUACION_TECNICA`, el frontend debe mostrar los componentes correspondientes a esa etapa.
