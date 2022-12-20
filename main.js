require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/TileLayer",
    "esri/Basemap",
    "esri/layers/CSVLayer",
    "esri/core/watchUtils",
    "dojo/domReady!" // will not be called until DOM is ready
    ], function (
    Map,
    SceneView,
    TileLayer,
    Basemap,
    CSVLayer,
    watchUtils
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

      function rotate() {
        if (!view.interacting) {
          const camera = view.camera.clone();
          camera.position.longitude -= 0.2;
          view.goTo(camera, { animate: false });
          requestAnimationFrame(rotate);
        }
      }

      const satelliteLayer = new TileLayer({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        title: "satellite"
      })

      const fireflyLayer = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/HalfEarthFirefly/MapServer",
        title: "half-earth-firefly"
      })
  
      const basemap = new Basemap({
        baseLayers: [satelliteLayer, fireflyLayer],
        title: "half-earth-basemap",
        id: "half-earth-basemap"
      });
      
      const map = new Map({
        basemap: basemap,
        layers: [csvLayer]
      });

      document.getElementById("start-globe").addEventListener("click", function () {
        closeMenu();
        view.when(function () {
          watchUtils.whenFalseOnce(view, "updating", rotate);
        });
      });

      document.getElementById("container").addEventListener("click", function (e) {
        if (e.target.id === "container") {
          closeMenu();
          view.when(function () {
            watchUtils.whenFalseOnce(view, "updating", rotate);
          });
        }
      });

      function closeMenu() {
        document.getElementById("container").style.display = "none";
        view.container.style.filter = "blur(0px)";
      }


      function rotate() {
        if (!view.interacting) {
          const camera = view.camera.clone();
          camera.position.longitude -= 0.2;
          view.goTo(camera, { animate: false });
          requestAnimationFrame(rotate);
        }
      };
    
      const view = new SceneView({
        map: map,
        camera: {
          position: [-5.03975781, 44.94826384, 26001223.30821],
          heading: 0.03,
          tilt: 0.3
        },
        popup: {
          collapseEnabled: false
        },
        container: "sceneContainer",
        environment: {
          starsEnabled: false,
          atmosphereEnabled: false,
          lighting: {
            directShadowsEnabled: true,
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
          components: ["zoom", "compass", "home" ]
         }
      });
      
    });
