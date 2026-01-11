import * as d3 from 'd3';
import ScrollyTeller from '@ihmeuw/scrollyteller';
import './style.css';

const appContainerId = 'scrolly-teller-app';

function preloadImages(imageList) {
  imageList.forEach((filename) => {
    const img = new Image();
    img.src = "images/" + filename;
    console.log("Pre-cargando:", filename); // Descomenta para verificar
  });
}

// LISTA MANUAL DE TUS IMÁGENES (Actualízala con tus nombres reales)
const misImagenes = [
  "0_grafico.png",
  "0_grafico_familia.png",
  "0_grafico_otros.png",
  "1_grafico_2015.png",
  "1_grafico_2016.png",
  "1_grafico_2017.png",
  "2_grafico_violin.png",
  "3_grafico_repetidos.png",
  "4_grafico_top_paises.png"
];

// Ejecutamos la precarga inmediatamente
preloadImages(misImagenes);

const seccionStory = {
  sectionIdentifier: 'historia-imagenes',

  // CSV de texto
  narration: 'narration.csv',

  // No usamos datos numéricos adicionales
  data: [],

  reshapeDataFunction: function (data) {
    return data;
  },

  /**
   * 1. CONSTRUIR EL VISOR
   *    Creamos una etiqueta <img> vacía dentro del contenedor.
   */
  buildGraphFunction: function (graphId, sectionConfig) {
    const container = d3.select(`#${graphId}`);

    // Limpiar contenido previo
    container.selectAll('*').remove();

    // Crear imagen
    const img = container
      .append('img')
      .attr('class', 'scrolly-image')
      .attr('src', '')
      .style('max-width', '100%')
      .style('max-height', '80vh')
      .style('display', 'block')
      .style('margin', '0 auto')
      .style('opacity', 1) 
      .style('background-color', '#eee')
      .style('min-height', '50px');

    // Devolver la selección de la imagen para usarla luego
    return img;
  },

  /**
   * 2. ACTUALIZAR AL HACER SCROLL
   *    Se ejecuta cada vez que un nuevo bloque entra en pantalla.
   */
  onActivateNarrationFunction: function ({ sectionConfig, state }) {
    const imgElement = sectionConfig.graph;
    
    let parsedState = state;
    if (typeof state === 'string') {
      try { parsedState = JSON.parse(state); } catch (e) {}
    }

    if (parsedState && parsedState.image) {
      const nuevaRuta = "images/" + parsedState.image;
      
      // Comprobamos si la imagen es la misma para no parpadear
      const srcActual = imgElement.attr("src");
      
      // Si ya tenemos esa imagen cargada, no hacemos nada (evita parpadeo)
      if (srcActual && srcActual.includes(parsedState.image)) {
        return; 
      }

      console.log("Transición suave a:", nuevaRuta);

      // 1. FADE OUT (Desvanecer la actual)
      imgElement.interrupt() // Paramos animaciones anteriores
        .transition()
        .duration(200) // 200ms para desaparecer
        .style("opacity", 0)
        .on("end", function() {
            // 2. CAMBIAR FUENTE (Cuando ya es invisible)
            d3.select(this)
              .attr("src", nuevaRuta)
              // Importante: No hacemos fade in hasta que cargue
              .on("load", function() {
                  // 3. FADE IN (Aparecer la nueva)
                  d3.select(this)
                    .transition()
                    .duration(500) // 500ms para aparecer suave
                    .style("opacity", 1);
              });
        });
    }
  },

  // Callbacks vacíos para scroll/resize (por si se necesitan después)
  onScrollFunction: function () {},

  onResizeFunction: function () {},
};

const storyConfiguration = {
  appContainerId: appContainerId,
  sectionList: [seccionStory],
};

// Arrancar ScrollyTeller
const instance = new ScrollyTeller(storyConfiguration);
instance.render();
