---
trigger: always_on
---

# Arquitectura Backend: Licitaciones

## 🏛️ Estructura y Fuente de Verdad

- **Arquitectura:** MVC + Repository + Services.
- **Modelo de Datos:** Guiarse ESTRICTAMENTE por `backend/app/licitaciones/diagramaclases.txt`. Si el código difiere del diagrama, el diagrama tiene la razón.
- **Estilos:** Seguir `backend/guiasdeestilo.txt`.

## 🧩 Patrones de Diseño (Implementación Obligatoria)

El código ya tiene una estructura base que debes respetar:

1.  **State Pattern (Estados):**

    - **Ubicación:** `backend/app/licitaciones/models/estados/`
    - **Lógica:** La clase `Licitacion` delega el comportamiento a clases como `EstadoBorrador`, `EstadoNueva`, etc.
    - **Regla:** NO usar `if/else` gigantes para estados. Crear/Usar la clase de estado correspondiente.

2.  **Chain of Responsibility (Supervisores):**
    - **Ubicación:** `backend/app/licitaciones/models/supervisores/`
    - **Flujo:** `SupervisorCompra` -> `SupervisorTecnico` -> `SupervisorEconomico`.
    - **Uso:** Las aprobaciones deben pasar por esta cadena.

## 📡 APIs

- Contratos definidos en `backend/app/licitaciones/apis/*.json`.
- Leer `readme.md` en esa carpeta para entender el propósito de cada endpoint.
