require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/TileLayer",
    "esri/Basemap",
    "esri/layers/CSVLayer",
    "dojo/domReady!" // will not be called until DOM is ready
    ], function (
    Map,SceneView,TileLayer,Basemap,CSVLayer) 
        {
        const url = "./proofread.csv";

        const csvLayer = new CSVLayer({
            title: "Poems",
            url: url,
            copyright: "cd",
        });

        csvLayer.renderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "point-3d", // autocasts as new PointSymbol3D()
                // for this symbol we use 2 symbol layers, one for the outer circle
                // and one for the inner circle
                symbolLayers: [
                {
                    type: "icon", // autocasts as new IconSymbol3DLayer()
                    resource: { primitive: "circle" },
                    material: { color: [255, 84, 54, 0.6] },
                    size: 5
                },
                {
                    type: "icon", // autocasts as new IconSymbol3DLayer()
                    resource: { primitive: "circle" },
                    material: { color: [255, 84, 54, 0] },
                    outline: { color: [255, 84, 54, 0.6], size: 1 },
                    size: 10
                }
                ]
            }
            };
  
      
      const map = new Map({
          basemap: new Basemap({
              baseLayers: [new TileLayer({
                  url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/VintageShadedRelief/MapServer",
                  opacity: 0.7,
                  minScale: 0
              })]
          }),
          ground: {
              surfaceColor: [255, 255, 255]
          }
          layers: [csvLayer]
      });
    
      const view = new SceneView({
        map: map,
        container: "sceneContainer",
        environment: {
          atmosphereEnabled: false,
          background: {
            type: "color",
            color: [0,10,16]
          }
        },
        ui: {
          components: ["zoom"]
         }
      });  
    });
