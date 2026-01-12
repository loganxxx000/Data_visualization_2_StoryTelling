# Data Visualization 2: StoryTelling
**Análisis de Salud Mental en la Industria Tecnológica**

Este proyecto corresponde a la PEC2 de la asignatura Visualización de Datos. Se trata de una narrativa web interactiva (Scrollytelling) basada en datos de las encuestas OSMI (Open Sourcing Mental Illness), utilizando **Webpack**, **Scrollama** y **D3.js**.

---

## 🚀 Guía de Instalación y Ejecución Local

Para visualizar este proyecto en tu ordenador, necesitas instalar las dependencias de Node.js y levantar un servidor de desarrollo local. Sigue estos pasos:

### 1. Prerrequisitos

Necesitas tener **Node.js** instalado en tu sistema.
* Si no lo tienes, descárgalo e instálalo desde su web oficial: [nodejs.org](https://nodejs.org/) (se recomienda la versión LTS).
* Para verificar si lo tienes instalado, abre tu terminal y escribe:
  ```bash
  node -v

### 2. Clonar e Instalar Dependencias
Una vez clonado este repositorio, abre tu terminal (o línea de comandos), navega hasta la carpeta raíz del proyecto y ejecuta el siguiente comando para descargar todas las librerías necesarias (Webpack, D3, Scrollama, etc.):

# Instala todas las dependencias definidas en package.json
npm install

### 3. Ejecutar el Servidor Local
Para ver la web en funcionamiento, utilizaremos el servidor de desarrollo de Webpack. Ejecuta:

Bash

npx webpack serve

Este comando compilará el proyecto y abrirá automáticamente una ventana en tu navegador.

Por defecto, la dirección será: http://localhost:8080/.

El servidor tiene "Hot Reloading": cualquier cambio que hagas en el código (HTML, CSS, JS o CSV) recargará la página automáticamente.

### 📂 Estructura del Proyecto
index.html: Estructura base de la web.

narration.csv: Archivo "guion" que contiene los textos de la historia y define qué gráfica se muestra en cada paso.

images/: Carpeta con las gráficas generadas en Python (Matplotlib/Seaborn).

style.css: Estilos visuales para el layout y el scroll.

webpack.config.js: Configuración del empaquetador y servidor local.

Mental_Health_Analysis.ipynb: Notebook de Python donde se realizó el análisis de datos y la generación de imágenes.
