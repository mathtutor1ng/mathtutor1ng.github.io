// loader.js

// Function to load dmloader.js dynamically
function loadDMLoader() {
    var script = document.createElement('script');
    script.src = 'dmloader2.js';  // Update this path as needed
    script.async = true;
    script.onload = function() {
        //console.log('dmloader2.js loaded successfully.');
        initializeApp(); // Call your initialization function here
    };
    script.onerror = function() {
        console.error('Failed to load dmloader2.js');
    };
    document.head.appendChild(script);  // Append to head to avoid inline script issues
}

// Function to retrieve configuration values from the DOM
function getConfigFromDOM() {
    var configElement = document.getElementById('engine-config');
    return {
        engineArguments: ["--verify-graphics-calls=false",],        //configElement.getAttribute('data-engine-arguments').split(',').filter(Boolean),
        customHeapSize: parseInt(configElement.getAttribute('data-custom-heap-size'), 10),
        exeName: configElement.getAttribute('data-exe-name'),
        displayWidth: parseInt(configElement.getAttribute('data-display-width'), 10),
        displayHeight: parseInt(configElement.getAttribute('data-display-height'), 10)
    };
}

// Function to initialize the Defold app after dmloader.js is loaded
function initializeApp() {
    //NEEDED for dynamic
    var config = getConfigFromDOM();
    // console.log("Printing configs");
    // console.log(config);




    // Now you can use config.engineArguments, config.customHeapSize, and config.exeName
    Module['INITIAL_MEMORY'] = config.customHeapSize;

    var engine_arguments = ["--verify-graphics-calls=false",]
        engine_arguments.push("--verify-graphics-calls=false")
    Module['onRuntimeInitialized'] = function() {
        Module.runApp("canvas", {
            archive_location_filter: function(path) {
                return config.exeName + ".wasm";
            },
            engine_arguments: engine_arguments,
            custom_heap_size: config.customHeapSize,
            full_screen_container: "#canvas-container",
            disable_context_menu: true
        });
    };
    // Call EngineLoader.load
    
    EngineLoader.load("canvas", config.exeName);
    // Resize the game canvas
    function resize_game_canvas() {
        var is_iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        var buttonHeight = 0;
        var prevInnerWidth = -1;
        var prevInnerHeight = -1;
        if (is_iOS) {
            window.scrollTo(0, 0);
        }
       
        var app_container = document.getElementById('app-container');
        var game_canvas = document.getElementById('canvas');
        var innerWidth = window.innerWidth;
        var innerHeight = window.innerHeight - buttonHeight;
       
        if (prevInnerWidth == innerWidth && prevInnerHeight == innerHeight) {
            return;
        }
        
        prevInnerWidth = innerWidth;
        prevInnerHeight = innerHeight;
        config.displayWidth = innerWidth;
        config.displayHeight = innerHeight;

        var width = config.displayWidth;
        var height = config.displayHeight;
        var targetRatio = width / height;
        var actualRatio = innerWidth / innerHeight;

        // Handle different scaling modes
        if (innerWidth < width || innerHeight < height) {
            if (actualRatio > targetRatio) {
                width = innerHeight * targetRatio;
                height = innerHeight;
                app_container.style.marginLeft = ((innerWidth - width) / 2) + "px";
                app_container.style.marginTop = "0px";
            } else {
                width = innerWidth;
                height = innerWidth / targetRatio;
                app_container.style.marginLeft = "0px";
                app_container.style.marginTop = ((innerHeight - height) / 2) + "px";
            }
        } else {
            app_container.style.marginLeft = ((innerWidth - width) / 2) + "px";
            app_container.style.marginTop = ((innerHeight - height) / 2) + "px";
        }

        app_container.style.width = width + "px";
        app_container.style.height = height + buttonHeight + "px";
        game_canvas.width = width;
        game_canvas.height = height;

    }

    resize_game_canvas();
    window.addEventListener('resize', resize_game_canvas, false);
    window.addEventListener('orientationchange', resize_game_canvas, false);
    window.addEventListener('focus', resize_game_canvas, false);
}

// Load dmloader.js and initialize the application
loadDMLoader();
