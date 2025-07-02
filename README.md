# ComputeArea

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.0.

Este proyecto es una aplicación web desarrollada con Angular que permite estimar el área de una mancha blanca dentro de una imagen binaria utilizando un método de muestreo de Monte Carlo. Es una herramienta útil para análisis donde la medición directa de áreas irregulares es difícil.

# Funcionalidades Principales
- Carga de Imágenes: Sube imágenes binarias (PNG, JPEG, BMP) para su análisis.
- Estimación por Muestreo:

  - Genera un número configurable de puntos aleatorios sobre la imagen.

  - Cuenta cuántos de esos puntos caen dentro de la "mancha" (píxeles blancos).

  - Estima el área de la mancha basándose en la proporción de puntos en la mancha respecto al total de puntos y el área total de la imagen.

- Historial de Resultados: Almacena y muestra un historial de todos los cálculos realizados, incluyendo fecha, nombre de la imagen, puntos muestreados y área estimada.

- Gestión de Resultados: Permite eliminar resultados individuales o borrar todo el historial.

- Metodología Integrada: Un stepper interactivo guía al usuario a través de la metodología detrás del cálculo de Monte Carlo.

- Interfaz de Usuario Intuitiva: Desarrollada con Angular Material para una experiencia de usuario moderna y responsiva.

- CSS: se implmento la plantilla de CSS al momento de crear el proyecto en angular para darle estilos a los componentes de la interface

# Tecnologías Utilizadas
- Angular v13+: Framework principal para el desarrollo frontend

  ![image](https://github.com/user-attachments/assets/183e86f5-7592-40ef-b850-e7304d4d6fe3)


- TypeScript: Lenguaje de programación.

- RxJS: Para manejo de operaciones asíncronas y reactividad (aunque el estado principal ahora usa Signals, RxJS sigue siendo clave para operaciones como la carga de imágenes).

- Angular Material: Librería de componentes UI para una interfaz consistente y atractiva.

- HTML5 Canvas API: Utilizada para el procesamiento de imágenes en el lado del cliente (carga de píxeles, conteo de puntos).

- localStorage: Para persistir el historial de resultados en el navegador.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running unit tests coverage

Run `ng test --code-coverage` to execute the unit tests coverage

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
