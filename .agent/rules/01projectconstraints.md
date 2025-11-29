---
trigger: always_on
---

# Contexto y Restricciones Globales (Licitaciones)

## 🎯 Objetivo

Desarrollo exclusivo de la funcionalidad **Gestión de Licitaciones**.

## ⛔ Restricciones de Alcance (ESTRICTO)

1.  **Zona Permitida:** Solo puedes leer/editar:
    - `backend/app/licitaciones/`
    - `frontend/src/modules/licitaciones/`
    - Pero si se requiere editar algun archivo externo para pruebas o hacer funcional mi funcionalidad, pideme permiso
2.  **Zona Prohibida:** NO modificar `solicitudes`, `facturación` o `proveedores` (frontend o backend).

## ⚙️ Entorno de Desarrollo y Ejecución

Esto, solo es para mi, para que yo pueda acordarme, tu no puedes aplicar ningun comando, asi que si solicitas alguna o algo
enviamen el comando y dime que lo pruebe.

### Backend (Python/Flask)

- **Activación:** `env\Scripts\activate` (Windows).

### Frontend (React/Vite)

- **Ejecución:** Para probar visualmente la interfaz:
  ```bash
  cd frontend
  npm run dev
  ```
