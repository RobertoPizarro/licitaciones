---
trigger: always_on
---

# Arquitectura Backend: Licitaciones

## 🏛️ Estructura y Fuente de Verdad

- **Modelo de Datos:** Guiarse ESTRICTAMENTE por `backend/app/models/licitaciones`. Si el código difiere de los models, los models tienen la razón.
- **Estilos:** Seguir `backend/Guias de estilo.txt`.

## 🧩 Patrones de Diseño (Implementación Obligatoria)

El código ya tiene una estructura base que debes respetar:

1.  **State Pattern (Estados):**

    - **Ubicación:** `backend/app/modles/licitaciones/estados/`
    - **Lógica:** La clase `Licitacion` delega el comportamiento a clases como `EstadoBorrador`, `EstadoNueva`, etc.
    - **Regla:** NO usar `if/else` gigantes para estados. Crear/Usar la clase de estado correspondiente.

2.  **Chain of Responsibility (Supervisores):**
    - **Ubicación:** `backend/app/models/licitaciones/supervisores/`
    - **Flujo:** `SupervisorCompra` -> `SupervisorTecnico` -> `SupervisorEconomico`.
    - **Uso:** Las aprobaciones deben pasar por esta cadena.

## 📡 APIs

- Contratos definidos en `backend/app/APIs/licitaciones/*.json`.
- Leer `readme.md` en esa carpeta para entender el propósito de cada endpoint.
