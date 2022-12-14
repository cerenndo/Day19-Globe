require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/TileLayer",
    "esri/Basemap",
    "esri/layers/CSVLayer",

    "dojo/domReady!" // will not be called until DOM is ready
    ], function (
    Map,
    SceneView,
    TileLayer,
    Basemap,

    CSVLayer
    ) {
        const url = "./proofread.csv";

        const csvLayer = new CSVLayer({
            title: "Poems",
            url: url,
            copyright: "cd",
            popupTemplate: {
              title: "{Title}",
              content: "{Poem}"
            }
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
                    material: { color: [198, 9, 81, 0.6] },
                    outline: { color: [255, 255, 255, 0.2], size: 2 },
                    size: 10
                },
                ]
            }
            };
  
      const basemap = new Basemap({
        baseLayers: [
          new TileLayer({
            url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/HalfEarthFirefly/MapServer",
            copyright: "ESRI Living Atlas"
          })
        ]
      });
      
      const map = new Map({
        basemap: basemap,
        layers: [csvLayer]
      });
    
      const view = new SceneView({
        map: map,
        alphaCompositingEnabled: true,
        qualityProfile: "high",
        camera: {
          position: [-5.03975781, 44.94826384, 15021223.30821],
          heading: 0.03,
          tilt: 0.3
        },
        popup: {
          dockEnabled: true,
          dockOptions: {
            position: "top-right",
            breakpoint: false,
            buttonEnabled: true
          },
          collapseEnabled: false
        },
        container: "sceneContainer",
        environment: {
          starsEnabled: false,
          atmosphereEnabled: false,
          lighting: {
            directShadowsEnabled: false,
            date: "Sun Jun 21 2019 16:19:18 GMT+0200 (Central European Summer Time)"
          },
          background: {
            type: "color",
            color: [0,10,16]
          },
          constraints: {
            altitude: {
              min: 20000000,
              max: 15000000
            }
          },
        },
        ui: {
          components: ["zoom"]
         }
      });  
    });
