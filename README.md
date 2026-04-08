# BTG Pactual - Gestión de Fondos (Prueba Técnica)

Esta plataforma de gestión de fondos de inversión para **BTG Pactual** ha sido desarrollada bajo estándares de arquitectura limpia y reactividad avanzada, aprovechando las últimas capacidades de **Angular 20**.

---
##  Stack Tecnológico

* **Angular 20:** Arquitectura Standalone y el nuevo *Control Flow* (`@if`, `@for`).
* **Tailwind CSS:** Design System escalable basado en variables de entorno y capas personalizadas (`@layer`).
* **Lucide Angular:** Set de iconografía optimizado y cargado bajo demanda (*tree-shaking*).
* **LocalStorage:** Motor de persistencia reactivo para mantener el estado de la cuenta.

---

##  Arquitectura y Patrones

El proyecto destaca por una implementación híbrida que demuestra versatilidad técnica y adaptabilidad:

* **Pattern Facade (Fachada):** Se implementó una capa de abstracción (`FinanceFacade`) como único punto de entrada para los componentes. Esto desacopla la lógica de negocio de la interfaz de usuario, facilitando el testing unitario y la mantenibilidad a largo plazo.
* **Interoperabilidad RxJS + Signals:**
    * **Observables (Requisito):** Uso de `Observables` para el manejo de flujos de datos asíncronos y eventos de red, cumpliendo estrictamente con los requisitos técnicos de la prueba.
    * **Signals (Modern Standard):** Integración de `toSignal` y `computed` para transformar flujos asíncronos en estados granulares. Esto garantiza una detección de cambios ultra eficiente y una sintaxis limpia en los templates.
* **Declarative Programming:** Se priorizó el uso de `async pipe` y `Signals` para evitar el manejo manual de suscripciones (`.subscribe()`), eliminando el riesgo de fugas de memoria (*memory leaks*).

---

### Estructura de Carpetas: LIFT & Feature-First

El proyecto aplica principios de organización LIFT (Locate, Identify, Flat, T-Dry) y se estructura siguiendo un enfoque **Feature-First / Vertical Slice**, priorizando la independencia de cada dominio funcional:

- **core/**: Lógica única y global (servicios singleton, estado global, modelos, validadores). Es el "cerebro" de la app.
- **shared/**: Componentes visuales y reutilizables (“Dumb Components”), desacoplados de la lógica de negocio.
- **features/**: Dominios funcionales independientes (ej. `funds`, `transactions`). Cada carpeta contiene sus propios componentes y páginas, facilitando escalabilidad y mantenimiento.

---

## Instalación y Uso

Requisitos: Node.js v20.19+ y npm v10+

Sigue estos pasos para ejecutar el proyecto localmente:

Clonar el repositorio git clone https://github.com/Valle1806/fund-app.git

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Servidor de desarrollo:**
     ```bash
   ng start
   ```
3. **Acceso:**
    El proyecto estará disponible en http://localhost:4200

---

## Pruebas Unitarias y Calidad

Para verificar la estabilidad del proyecto y la lógica de negocio, se incluyó una suite de pruebas con **Jasmine** y **Angular Testing Library** en algunos componentes.

Para ejecutar los tests y generar el reporte de cobertura:
```bash
npm test -- --watch=false --browsers=ChromeHeadless --code-coverage
```

---
## Requisitos implementados
 
| # | Requisito | Vista |
|---|-----------|-------|
| 1 | Visualizar lista de fondos | Fondos |
| 2 | Suscribirse con validación de monto mínimo | Fondos |
| 3 | Cancelar suscripción y ver saldo actualizado | Fondos |
| 4 | Historial de transacciones | Historial |
| 5 | Seleccionar método de notificación (Email / SMS) | Modal de suscripción |
| 6 | Mensajes de error por saldo insuficiente | Modal de suscripción |
| 7 | Manejo adecuado de errores | APP en general |


## Capturas de funcionamiento

Vista Fondos:

<img width="1918" height="993" alt="ListaFondos" src="https://github.com/user-attachments/assets/f13f0690-9be5-4e0d-9d9e-5666365e6314" />



Modal de suscripción: 

<img width="1909" height="980" alt="formularioAplicacion" src="https://github.com/user-attachments/assets/137721d6-f796-4a86-a9fe-5053ac2baeb9" />

    
Vista Historial: 

<img width="1913" height="982" alt="HistorialTransacciones" src="https://github.com/user-attachments/assets/75df9148-bb69-42b6-a22a-172601a4ddf1" />

 
---

## Notas para el Evaluador
* Botón de Reset: Se incluyó un acceso rápido en el Header (icono de reinicio) que limpia el localStorage y restablece el balance inicial. Esto permite repetir los flujos de prueba sin necesidad de limpiar manualmente los datos del navegador.

* Localización: El código fuente, nombres de variables y arquitectura siguen el estándar internacional (Inglés), mientras que la interfaz de usuario y los mensajes de error/éxito están totalmente en Español.

* Simulación de Latencia: Las suscripciones cuentan con un delay intencional para demostrar el manejo de estados de carga (loading spinners) y la prevención de acciones concurrentes mediante el estado isSending.

   
