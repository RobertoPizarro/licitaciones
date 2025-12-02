---
trigger: always_on
---

# Contexto y Restricciones Globales (Licitaciones)

## 🎯 Objetivo

Desarrollo exclusivo de la funcionalidad **Gestión de Licitaciones**.
Ante cualquier posible edicion, primero analizar todo el proyecto o lo necesario para evitar fallos.

## ⛔ Restricciones de Alcance (ESTRICTO)

1.  **Zona Permitida:** Puedes editar:

    - Backend: Todas las carpetas llamadas licitaciones que esten dentro de las carpetas APIs, BP, controllers, dtos, enums, models, repositories, services.
    - `frontend/src/modules/licitaciones/`

2.  **Zona Prohibida:** NO modificar `solicitudes`, `facturación` o `proveedores` (frontend)

3.  Puedes leer cualquier archivo, y si requieres editar alguno que no este permitido entonces avisame primero.

## ⚙️ Entorno de Desarrollo y Ejecución

Esto, solo es para mi, para que yo pueda acordarme, tu no puedes aplicar ningun comando, asi que si solicitas alguna o algo
enviamen el comando y dime que lo pruebe.

### Backend (Python/Flask)

- **Activación:**
  Paso 1: C:\Users\Abc\Desktop\...\Modulo de Compras>
  python -m venv env

  Paso 2: env\Scripts\activate

  - Ir a backend:
    cd backend

  - Instalar desde requirements:
    pip install -r requirements.txt

  - Actualizar el requirements
    pip freeze > requirements.txt

### Frontend (React/Vite)

- **Ejecución:** Para probar visualmente la interfaz:
  ```bash
  cd frontend
  npm run dev
  ```
