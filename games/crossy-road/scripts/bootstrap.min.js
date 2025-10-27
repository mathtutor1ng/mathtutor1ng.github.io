/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

/**
 * bootstrap.js
 *
 * Handles loading of all other scripts, initializing asset loading and starting the game
 */// window.testGift = true;
// window.testGacha = true;
// window.testCarousel = true;
// localStorage.clear();
// localStorage.coins = 90;
/******************
 * Config
 ******************/window.firstIterationToggle=true;window.devToolsEnabled=!true;window.pokiDebug=!true;window.minAspect=9/16;window.maxAspect=16/9;var skipPreroll=true;//JAB was false
var loaderBg='#7bcbed';var minDimensions={width:0,height:0};var maxDimensions={width:Infinity,height:Infinity};/******************
 * Implementation
 ******************/var audioContextCheck=typeof AudioContext!=='undefined'?AudioContext:typeof webkitAudioContext!=='undefined'?webkitAudioContext:undefined;// Shared variables
var DOMReadyTime,loadingScreen,hipsterWhale,wrapper,loadingDone,brandingDone,started;// Create the wrapper that will contain the preroll, loader and game
wrapper=document.createElement('div');wrapper.id='container';wrapper.style.position='absolute';wrapper.style.left='50%';wrapper.style.top='50%';wrapper.style.background=loaderBg;// Phase 1: Initializiation
// ------------------------
onDOMReady(function(){// for testing add build number JAB
//const buildNumber = "1.0.17"; // Replace with build/version number
//document.getElementById('build-number').textContent = `Build: ${buildNumber}`;
console.log("1. onDOMREADY");//analytics.track('game_onboarding', 'loading', 'dom_ready');
DOMReadyTime=performance.now();window.bodyRect=document.body.getBoundingClientRect();console.log("BodyRect dimensions onDOMReady:",bodyRect.width,bodyRect.height);// Setup wrapper
document.body.appendChild(wrapper);resize();window.addEventListener('resize',resize);// Load the AssetLoader in order to start loading the preroll
loadScript('scripts/asset-loader.min.js',loadPreroll);});// Run window.onload after all content (images, styles) is fully loaded
window.onload=function(){console.log("All resources finished loading");// Set bodyRect dimensions, as it may depend on images or styles being loaded
window.bodyRect=document.body.getBoundingClientRect();console.log("BodyRect dimensions .onload:",bodyRect.width,bodyRect.height);};// Phase 2: Preroll
// ------------------------
function showHipsterSplash(){//analytics.track('game_onboarding', 'loading', 'game_developer_branding');
hipsterWhale.show();hipsterWhale.play(function(){brandingDone=true;loadingScreen.show(skipPreroll);attemptStart();});}function loadPreroll(){console.log("2. loadPreroll");// First up, load what's required for our preroll
AssetLoader.add.script('scripts/loading-flow.min.js');AssetLoader.add.image('sprites/poki-icon.png');AssetLoader.add.image('sprites/poki-logo.png');AssetLoader.load(function(){//analytics.track('game_onboarding', 'loading', 'poki_branding');
// Requirements loaded, create and start the preroll
var preroll=new PokiPreroll();preroll.wrapper=wrapper;preroll.logoSrc=AssetLoader.getAssetById('sprites/poki-logo.png').src;preroll.createElements();if(!skipPreroll){// Show HipsterWhale after preroll has faded out
preroll.play(showHipsterSplash);}// While the preroll runs, load the required assets for the hipster whale screen
AssetLoader.add.image('sprites/hipster-1.png');AssetLoader.add.image('sprites/hipster-2.png');AssetLoader.add.image('sprites/hipster-3.png');AssetLoader.add.image('sprites/whale-1.png');AssetLoader.add.image('sprites/whale-2.png');AssetLoader.add.image('sprites/whale-3.png');AssetLoader.add.image('sprites/hipster-whale.png');AssetLoader.add.script('scripts/tween.min.js');AssetLoader.add.plainAudio('plain-audio/splashintro.mp4');AssetLoader.load(function(){// Done loading! Tell the preroll it can close, and start loading the game
preroll.allowClose();hipsterWhaleBranding();});});// Start loading three.min.js already as it is relatively large
// even though we don't need it until the loader
AssetLoader.loader.script('scripts/three.min.js');};function hipsterWhaleBranding(){console.log("3. HW Branding");hipsterWhale=new HipsterWhale();hipsterWhale.wrapper=wrapper;hipsterWhale.logoSrc=AssetLoader.getAssetById('sprites/hipster-whale.png');hipsterWhale.hipsters=[AssetLoader.getAssetById('sprites/hipster-1.png'),AssetLoader.getAssetById('sprites/hipster-2.png'),AssetLoader.getAssetById('sprites/hipster-3.png')];hipsterWhale.whales=[AssetLoader.getAssetById('sprites/whale-1.png'),AssetLoader.getAssetById('sprites/whale-2.png'),AssetLoader.getAssetById('sprites/whale-3.png')];// Load additional assets required for loading screen
AssetLoader.add.image('sprites/crossy-road-logo.png');AssetLoader.add.webFont('EditUndoBrk','fonts/EditUndoBrk.css');AssetLoader.add.webFont('8bitwonder','fonts/8bitwonder.css');AssetLoader.add.script('scripts/three.min.js');// Still add the load here to make sure it's done before we move on
AssetLoader.load(function(){hipsterWhale.allowClose();loadGame();});}// Phase 3: Loader
// ------------------------
function loadGame(){console.log("3. loadGame");//analytics.track('game_onboarding', 'loading', 'game_loader_start');
loadingScreen=new LoadingScreen();loadingScreen.bgColor=loaderBg;loadingScreen.wrapper=wrapper;loadingScreen.gameLogoSrc=hipsterWhale.logoSrc.src;loadingScreen.pokiLogoSrc=AssetLoader.getAssetById('sprites/poki-logo.png').src;AssetLoader.progressListener=loadingScreen.updateProgress.bind(loadingScreen);AssetLoader.maxConcurrency=5;// Scripts
AssetLoader.add.script('scripts/game.min.js');// Assets
AssetLoader.add.spriteSheet('sprites/CrossyUI.png','sprites/CrossyUI.json');AssetLoader.add.bitmapText('fonts/8-bit-wonder.png','fonts/8-bit-wonder.json');AssetLoader.add.bitmapText('fonts/8-bit-wonder-yellow.png','fonts/8-bit-wonder.json');AssetLoader.add.image('sprites/particles.png');AssetLoader.add.image('sprites/trex.png');AssetLoader.add.image('sprites/trex-phone.png');if(!true||typeof audioContextCheck==='undefined'||typeof audioContextCheck.prototype==='undefined'||typeof audioContextCheck.prototype.decodeAudioData==='undefined'){// Our browser doesn't support loading audio through data urls, load the old way
var audioFiles=['GameReward.mp4','coinhop.mp4','rapidsdeath3.mp4','TrainAlarm.mp4','coinhop2.mp4','rapidsdeath9.mp4','TrainBell2.mp4','drown1.mp4','river.mp4','TrainBell.mp4','drown2.mp4','scoretop.mp4','birdflyaway.mp4','eaglehit.mp4','car-horn.mp4','hawk-screech-02.mp4','trainbell3.mp4','car1.mp4','hop2.mp4','trainpassnohorn.mp4','car2.mp4','insertcoin.mp4','trainpassshorter.mp4','car3.mp4','lilysplash.mp4','trainsplat.mp4','carhit.mp4','logjump.mp4','watersplash.mp4','carsquish.mp4','logjump2.mp4','watersplashlow.mp4','carsquish3.mp4','logjump3.mp4','GetCoin79wav.mp4','coin2.mp4','logjump4.mp4','Pop_1.mp4','Pop_3.mp4','Pop_5.mp4','Pop_7.mp4','Pop_9.mp4','Pop_2.mp4','Pop_4.mp4','Pop_6.mp4','Pop_8.mp4','robot/Pulses_Electric_Spark_02.mp4','robot/robothop4.mp4','robot/grenade1.mp4','robot/robothopshort2.mp4','robot/robothop1.mp4','robot/robothopshort.mp4','robot/robothop2.mp4','robot/robotexplode.mp4','robot/robothop3.mp4','robot/robotloop.mp4','cat/cat1.mp4','cat/cat2.mp4','cat/cat3.mp4','cat/cat4.mp4','chicken/buck1.mp4','chicken/buck5.mp4','chicken/buck10.mp4','chicken/buck6.mp4','chicken/buck11.mp4','chicken/buck7.mp4','chicken/buck12.mp4','chicken/buck8.mp4','chicken/buck2.mp4','chicken/buck9.mp4','chicken/buck3.mp4','chicken/chickendeath.mp4','chicken/buck4.mp4','chicken/chickendeath2.mp4','mallard/quack1.mp4','mallard/quack3.mp4','mallard/quack5.mp4','mallard/quack2.mp4','mallard/quack4.mp4','bannerhit3-g.mp4','prize/counting-of-money-short.mp4','prize/insert-coin.mp4','prize/SlotMachineInsert.mp4','prize/InsertingCoinIntoMachinev1.mp4','prize/InsertingCoinIntoMachinev2.mp4','prize/InsertingCoinIntoMachinev3.mp4','prize/InsertingCoinIntoMachinev4.mp4','prize/coininsert3.mp4','prize/PrizeWheel.mp4','prize/casinomachine.mp4','prize/UnlockPlain.mp4','prize/clickball.mp4','prize/prizewinner.mp4','prize/playslotsmachine.mp4','gift/openbox.mp4','gift/emptyingthepiggybank2.mp4','gift/Earn_Points.mp4','gift/booktap.mp4'];audioFiles.forEach(function(element,idx){AssetLoader.add.audio('audio/'+element);// For some reason our node.js serve-static breaks without queueing
// so in development enable queues
if(false){AssetLoader.queueNext();}});}else{// Our browser is next-level, serve the audio file archive instead to reduce requests
AssetLoader.setupAudioLoader();AssetLoader.add.archive('audio.zip',function(zip){Object.keys(zip.files).forEach(function(key){var file=zip.files[key];// Make sure we're only using the mp4 files
if(file.name.split('.').pop()!=='mp4')return;file.async('base64').then(function(content){AssetLoader.audioLoader.load('data:audio/mp4;base64,'+content,function(buffer){AssetLoader.loadedAssets[file.name]=buffer;});});});});}// Init the Loading Screen
loadingScreen.init();if(skipPreroll){loadingScreen.show(skipPreroll);}// Trigger load, and start game when done
AssetLoader.load(function(){loadingScreen.forceSkip=true;// Tell the loading screen we're done and we can skip
loadingDone=true;attemptStart();});};// Phase 4: Game time!
// ------------------------
function startGame(){console.log("5. startGame()");var loadingTimeTotal=performance.now()-DOMReadyTime;var loadingTimeLoadingScreen=performance.now()-(loadingScreen.startTime||performance.now());//analytics.track('game_onboarding', 'loading', 'game_loader_finished');
//analytics.track('technical_performance', 'loading_time_total', (loadingTimeTotal / 1000).toFixed(1), Math.round(loadingTimeTotal));
//analytics.track('technical_performance', 'loading_time_loading_screen', (loadingTimeLoadingScreen / 1000).toFixed(1), Math.round(loadingTimeLoadingScreen));
window.container=wrapper;window.start();};function attemptStart(){console.log("4. attemptStart()");if(started)return;if(!loadingDone||!brandingDone&&!skipPreroll)return;started=true;//checkVisible(startGame);
startGame();loadingScreen.destroy();}/******************
 * Utility functions
 ******************//**
 * Utility function that loads a script and executed callback when it's done
 */function loadScript(src,callback){var el=document.createElement('script');el.src=src;el.onload=callback;document.head.appendChild(el);};/**
 * Utility function that makes sure callback isn't executed until DOM is fully ready
 *
 * @param {function} callback
 */function onDOMReady(callback){if(document.attachEvent?document.readyState==='complete':document.readyState!=='loading'){callback();}else{document.addEventListener('DOMContentLoaded',callback);}};/**
 * Utility function that takes care of wrapper sizing
 */function resize(){window.bodyRect=document.body.getBoundingClientRect();var windowAspect=bodyRect.width/bodyRect.height;var wrapperAspect=Clamp(windowAspect,window.minAspect,window.maxAspect);var width,height;if(windowAspect>wrapperAspect){// Lock vertically
height=bodyRect.height;width=height*wrapperAspect;}else{// Lock horizontally
width=bodyRect.width;height=width/wrapperAspect;}width=Clamp(width,minDimensions.width,maxDimensions.width);height=Clamp(height,minDimensions.height,maxDimensions.height);wrapper.style.width=width+'px';wrapper.style.height=height+'px';wrapper.style.marginLeft=-width*0.5+'px';wrapper.style.marginTop=-height*0.5+'px';//analytics.track('technical_performance', 'resize_body', bodyRect.width + 'x' + bodyRect.height);
};/**
 * Utility function that makes sure callback isn't executed until window is visible
 *
 * @param {function} callback
 */function checkVisible(callback){if(bodyRect.width===0||bodyRect.height===0){window.setTimeout(function(){checkVisible(callback);},100);}else{callback();}};/**
 * Utility Math Clamp function
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 *
 * @return {number}
 */function Clamp(value,min,max){return Math.min(Math.max(value,min),max);};window.isMobile=function(){var check=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true;})(navigator.userAgent||navigator.vendor||window.opera);return check;}();window.isFirefox=function(){return /firefox/i.test(navigator.userAgent);}();window.isChrome=function(){var isChromium=window.chrome,winNav=window.navigator,vendorName=winNav.vendor,isOpera=winNav.userAgent.indexOf("OPR")>-1,isIEedge=winNav.userAgent.indexOf("Edge")>-1,isIOSChrome=winNav.userAgent.match("CriOS");if(isIOSChrome){return true;}else if(isChromium!==null&&isChromium!==undefined&&vendorName==="Google Inc."&&isOpera==false&&isIEedge==false){return true;}return false;}();window.isSilkBrowser=function(){var match=/(?:; ([^;)]+) Build\/.*)?\bSilk\/([0-9._-]+)\b(.*\bMobile Safari\b)?/.exec(navigator.userAgent);return!!match;}();// Performance.now polyfill
if(!window.performance||!window.performance.now){Date.now||(Date.now=function(){return new this().getTime();});(window.performance||(window.performance={})).now=function(){return Date.now()-offset;};var offset=(window.performance.timing||(window.performance.timing={})).navigatorStart||(window.performance.timing.navigatorStart=Date.now());}function getQueryVariable(variable){var query=window.location.search.substring(1);var vars=query.split("&");for(var i=0;i<vars.length;i++){var pair=vars[i].split("=");if(pair[0]==variable){return pair[1];}}return false;}

/***/ })

/******/ });