---
trigger: always_on
---

# Flujo de Negocio: Ciclo de Vida de Licitación

## 🏁 Disparador (Trigger)

1. **Evento:** Mientras se esta llenando una **Solicitud de Compra Simple**.
2. **Condición:** Si `Monto_Total` > **10,000** (Moneda local).
3. **Acción del Sistema:**
   - Sistema habilita boton para iniciar procesa de licitación, al dar click nos manda a **Formulario de Licitación**.
   - **Herencia:** Copia `Título`, `Notas`, e `Items` de la solicitud original.
   - **Input Requerido:** Usuario ingresa `Fecha_Limite`, `Presupuesto_Max` y selecciona `Documentos_Requeridos`.
     (el único documento obligatorio, es la propuesta económica)
     (documento obligatorio: no es posible quitarlo, sera un documento requerido siempre)
     (documento requerido: son los documentos seleccionados manualmente en el formulario de solicitud de licitacion)
   - **Resultado:** Crea solicitud de licitación en estado pendiente.

## Ventanas

### 0. Lista de Licitaciones

Al hacer click en "licitaciones" en el sidebar de la pagina web:

- Usuario puede:
  - Buscar licitacion, por nombre o ID.
  - Fitlrar por estado
  - Filtrar licitaciones entre 2 fechas
  - Moverse en la paginación para ver las licitaciones que no se ven, ya que en la lista solo salen 10.
  - Dar click a ver detalles de una licitación.

### 1. PENDIENTE

Estas solicitudes no aparecen en la tabla con todas las solicitudes, solo aparecen al darle click al boton "Solicitudes de licitación pendientes" en la parte superior izquierda, al hacer click el usuario accedera a un modal con las solcitudes en estado pendiente donde abra boton para ver sus detalles ( nombre, items, presupuesto maximo, documentos requeridos) y los botones de accion para aprobar o rechazar ).

- ➡️ **Acción de Usuario:**

  1. Usuario clickea "Solicitudes de licitación pendientes"
  2. Usuario mira todas las solicitudes de licitacion en estado pendiente
  3. Usuario da click a cancelar o eliminar en una solicitude de licitacion.
  4. Aprece modal para confirmar su accion.

- ✅ **Supervisor Aprueba** -> Cambia estado a **NUEVA**
- ❌ **Supervisor Rechaza** -> Cambia estado a **CANCELADA**

## 🔄 Máquina de Estados (Transiciones)

Tras ser aprobada la solicitud de licitacion, esta empieza en estado nueva y el comprador puede darle click a ver detalles en la lista.

### 1. NUEVA

_Aprobada, lista para invitar proveedores. Aparece en la lista de las licitaciones, usuario le da click a ver detalles y saldran todos los detalles de esta licitacion._

- ➡️ **Acción de Usuario (Invitación):**
  1. Usuario abre modal.
  2. Usuario selecciona los proveedores a los cuales va a enviar la licitación.
     - Sistema genera en el modal Correos/Asunto/Cuerpo
     - Sistema permite la descarga de las plantillas de los documentos requeridos en ese mismo modal
  3. Usuario hace click en "Abrir Gmail" en ese mismo modal
  4. En una ventana aparte, se abre Gmail y trae consigo Correos/Asunto/Cuerpo
  5. Usuario adjunta manualmente al correo las plantillas de los documentos requeridos que descargo en el modal
  6. Usuario envia el correo.
  7. Usuario regresa a la página y cierra el modal
  8. Usuario da click en "Finaliza invitación"
  9. Usuario confirma en un nuevo modal la finalizacion de la invitación.
- **Transición:** Al confirmar la acción -> Cambia estado a **EN_INVITACION**

### 2. EN_INVITACION

_Esperando recepción de propuestas hasta la fecha límite._

- ➡️ **Acción de Usuario (registrar propuestas):**

  1. Usuario abre modal.
  2. Usuario selecciona los proveedor invitado.
  3. Usuario adjunta los archivos que le haya enviado el proveedor por correo.
  4. Usuario cierra modal y dar click en "Finalizar registro" luego de registrar todas los documentos (propuestas) de los proveedores.

- ✅ **Registro Manual:** Usuario registra propuesta(s) recibida(s) -> Cambia estado a **CON_PROPUESTAS**
- ❌ **Timeout (Automático):** Si `Fecha_Actual` > `Fecha_Limite` Y `Total_Propuestas` == 0 -> Cambia estado a **CANCELADA**

### 3. CON_PROPUESTAS

_Propuestas cargadas en el sistema._

- ➡️ **Acción:** Usuario envía a revisión -> Cambia estado a **EVALUACION_TECNICA**

### 4. EVALUACION_TECNICA

_Comité Técnico verifica documentos obligatorios._

- ➡️ **Acción de Usuario (evaluación técnica):**

  1. Usuario abre modal.
  2. Usuario selecciona proveedor a evaluar
  3. Usuario mira, descarga o marca como correcto o incorrecto cada documento que envio el proveedor
  4. Si todos los documentos que envio el proveedor, el usuario los marca como correctos y guarda la evaluación, la propuesta de ese proveedor es válida.
  5. Si el proveedor tiene como mínimo un documento incorrecto o un documento marcado como faltante, usuario coloca la jusitifcación del rechazo y guarda la evaluación.
  6. Sea cual sea el resultado, usuario guarda evaluacion de ese proveedor con el botón del mismo nombre.
  7. Selecciona a otro proveedor y repite.

- ✅ **Aprobado:** Si `Propuestas_Validas` >= 1 -> Cambia estado a **EVALUACION_ECONOMIA**
- ❌ **Rechazado:** Si `Propuestas_Validas` == 0 -> Cambia estado a **CANCELADA**

### 5. EVALUACION_ECONOMIA

_Comité Económico puntúa y selecciona._

- ➡️ **Acción de Usuario (evaluación económica):**

  1. Usuario abre modal.
  2. Usuario selecciona proveedor a evaluar
  3. Usuario mira o descarga los documentos económicos/financieros presentados por el proveedor.
  4. Si hace falta un documento, marca como faltante en la parte izquierda del modal.
  5. Si el proveedor no cumple con los criterios, usuario lo marca como rechazado y coloca la justificación.
  6. Si el proveedor cumple con los criterios, usuario asigna una puntuacion a su propuesta y coloca la justifiación.
  7. Sea cual sea el resultado, usuario guarda evaluacion de ese proveedor con el botón del mismo nombre.
  8. Selecciona a otro proveedor y repite.

- ✅ **Selección:** Sistema elige la propuesta con mayor puntaje -> Cambia estado a **ADJUDICADA**
- ❌ **Desierto:** Si ninguna propuesta es viable -> Cambia estado a **CANCELADA**

### 6. ADJUDICADA

_Proveedor seleccionado. Gestión de contrato._

- ➡️ **Acción de Usuario (Formalización):**
  1. Usuario abre modal
  2. Descargar plantilla de Contrato (Esta es tomada de una plantilla ya guardada, gracias a la libreria docxtpl se podra llenar los datos que esten entre {{...}} en la plantilla docx del contrato).
  3. Usuario coloca las firmas correspondientes fuera de la pagina, eso va por su cuenta.
  4. Usuario sube el documento `Contrato_Firmado` al sistema.
  5. Usuario da click a grabar,
- **Transición:** Al detectar la carga del contrato -> Cambia estado a **CON_CONTRATO**

### 7. CON_CONTRATO

_Licitación cerrada legalmente._

- ➡️ **Acción de Usuario (Integración):**
  1. Usuario abre modal.
  2. Usuario confirma el envio de la licitacion, proveedor adjudicado y contrato de adjudicación a la funcionalidad de ordenes de compras.
- **Transición:** Al finalizar la transferencia -> Cambia estado a **FINALIZADA**
