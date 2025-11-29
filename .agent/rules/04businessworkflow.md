---
trigger: always_on
---

# Flujo de Negocio: Ciclo de Vida de Licitación

## 🏁 Disparador (Trigger)

1. **Evento:** Se intenta guardar una **Solicitud de Compra Simple**.
2. **Condición:** Si `Monto_Total` > **10,000** (Moneda local).
3. **Acción del Sistema:**
   - Redirige automáticamente a **Formulario de Licitación**.
   - **Herencia:** Copia `Título`, `Notas`, e `Items` de la solicitud original.
   - **Input Requerido:** Usuario ingresa `Fecha_Limite`, `Presupuesto_Max` y selecciona `Documentos_Requeridos`.
   - **Resultado:** Crea registro en estado **BORRADOR**.

## 🔄 Máquina de Estados (Transiciones)

### 1. BORRADOR

_Licitación creada, a la espera de validación del supervisor._

- ✅ **Supervisor Aprueba** -> Cambia estado a **NUEVA**
- ❌ **Supervisor Rechaza** -> Cambia estado a **CANCELADA**

### 2. NUEVA

_Aprobada, lista para invitar proveedores._

- ➡️ **Acción de Usuario (Invitación):**
  1. Usuario selecciona proveedores registrados.
  2. Clic en botón "Enviar Invitación":
     - Sistema **abre ventana de Gmail** (Asunto/Cuerpo/Destinatarios precargados).
     - Sistema **descarga** automáticamente las plantillas de documentos.
  3. Usuario envía el correo en Gmail y hace clic en "Confirmar" en el sistema.
- **Transición:** Al confirmar la acción -> Cambia estado a **EN_INVITACION**

### 3. EN_INVITACION

_Esperando recepción de propuestas hasta la fecha límite._

- ✅ **Registro Manual:** Usuario registra propuesta(s) recibida(s) -> Cambia estado a **CON_PROPUESTAS**
- ❌ **Timeout (Automático):** Si `Fecha_Actual` > `Fecha_Limite` Y `Total_Propuestas` == 0 -> Cambia estado a **CANCELADA**

### 4. CON_PROPUESTAS

_Propuestas cargadas en el sistema._

- ➡️ **Acción:** Usuario envía a revisión -> Cambia estado a **EVALUACION_TECNICA**

### 5. EVALUACION_TECNICA

_Comité Técnico verifica documentos obligatorios._

- ✅ **Aprobado:** Si `Propuestas_Validas` >= 1 -> Cambia estado a **EVALUACION_ECONOMIA**
- ❌ **Rechazado:** Si `Propuestas_Validas` == 0 -> Cambia estado a **CANCELADA**

### 6. EVALUACION_ECONOMIA

_Comité Económico puntúa y selecciona._

- ✅ **Selección:** Sistema elige la propuesta con mayor puntaje -> Cambia estado a **ADJUDICADA**
- ❌ **Desierto:** Si ninguna propuesta es viable -> Cambia estado a **CANCELADA**

### 7. ADJUDICADA

_Proveedor seleccionado. Gestión de contrato._

- ➡️ **Acción de Usuario (Formalización):**
  1. Descargar plantilla de Contrato (pre-llenada con datos de la licitación).
  2. Gestionar firmas externas.
  3. **Subir** el documento `Contrato_Firmado` al sistema.
- **Transición:** Al detectar la carga del contrato -> Cambia estado a **CON_CONTRATO**

### 8. CON_CONTRATO

_Licitación cerrada legalmente._

- ➡️ **Acción (Integración):** Sistema transfiere datos (Items, Precios, Proveedor, Adjuntos) al módulo de **Orden de Compra**.
- **Transición:** Al finalizar la transferencia -> Cambia estado a **FINALIZADA**
