# BTG Pactual - Gestión de Fondos (Prueba Técnica)

Esta plataforma de gestión de fondos de inversión para **BTG Pactual** ha sido desarrollada bajo estándares de arquitectura limpia y reactividad avanzada, aprovechando las últimas capacidades de **Angular 20**.

---

##  Arquitectura y Patrones (Senior Level)

El proyecto destaca por una implementación híbrida que demuestra versatilidad técnica y adaptabilidad:

* **Pattern Facade (Fachada):** Se implementó una capa de abstracción (`FinanceFacade`) como único punto de entrada para los componentes. Esto desacopla la lógica de negocio de la interfaz de usuario, facilitando el testing unitario y la mantenibilidad a largo plazo.
* **Interoperabilidad RxJS + Signals:**
    * **Observables (Requisito):** Uso de `Observables` para el manejo de flujos de datos asíncronos y eventos de red, cumpliendo estrictamente con los requisitos técnicos de la prueba.
    * **Signals (Modern Standard):** Integración de `toSignal` y `computed` para transformar flujos asíncronos en estados granulares. Esto garantiza una detección de cambios ultra eficiente y una sintaxis limpia en los templates.
* **Declarative Programming:** Se priorizó el uso de `async pipe` y `Signals` para evitar el manejo manual de suscripciones (`.subscribe()`), eliminando el riesgo de fugas de memoria (*memory leaks*).

---

##  Stack Tecnológico

* **Angular 20:** Arquitectura Standalone y el nuevo *Control Flow* (`@if`, `@for`).
* **Tailwind CSS:** Design System escalable basado en variables de entorno y capas personalizadas (`@layer`).
* **Lucide Angular:** Set de iconografía optimizado y cargado bajo demanda (*tree-shaking*).
* **LocalStorage Engine:** Motor de persistencia reactivo para mantener el estado de la cuenta.

---

##  Requisitos de Negocio Implementados

1.  **Balance Inicial:** Control de saldo inicial de **$500.000 COP**.
2.  **Validación de Negocio:** Sistema de detección de saldo insuficiente antes de la vinculación (**Requisito 6**).
3.  **Monto Mínimo:** Validación dinámica por fondo según sus reglas específicas de inversión.
4.  **Notificaciones Globales:** Sistema de *Toasts* en español para feedback inmediato de todas las operaciones.
5.  **Historial de Transacciones:** Registro persistente de cada apertura y cancelación de fondos.

---

## Instalación y Uso

Sigue estos pasos para ejecutar el proyecto localmente:

Clonar el repositorio git clone https://github.com/Valle1806/fund-app.git

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Servidor de desarrollo:**
     ```bash
   ng serve
   ```
3. **Acceso:**
    El proyecto estará disponible en http://localhost:4200

## Notas para el Evaluador
* Botón de Reset: Se incluyó un acceso rápido en el Header (icono de reinicio) que limpia el localStorage y restablece el balance inicial. Esto permite repetir los flujos de prueba sin necesidad de limpiar manualmente los datos del navegador.

* Localización: El código fuente, nombres de variables y arquitectura siguen el estándar internacional (Inglés), mientras que la interfaz de usuario y los mensajes de error/éxito están totalmente en Español.

* Simulación de Latencia: Las suscripciones cuentan con un delay intencional para demostrar el manejo de estados de carga (loading spinners) y la prevención de acciones concurrentes mediante el estado isSending.
   
