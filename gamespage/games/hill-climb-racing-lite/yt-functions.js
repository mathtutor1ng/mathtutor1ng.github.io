// yt-functions.js
function SetYTCallbacks(){
    const audioCallback =
    ytgame.system.onAudioEnabledChange((isAudioEnabled) => {
    if (isAudioEnabled) {
        JsToDef.send("onAudio", true)
    } else {
        JsToDef.send("onAudio", false)
    }			
    });
    const pauseCallback = ytgame.system.onPause(() => {
        JsToDef.send("onPause");
    });
    const unsetCallback = ytgame.system.onResume(() => {
        JsToDef.send("onResume")
    });
}

function SaveYT(data){
    ytgame.game.saveData(data).then(() => {
        JsToDef.send("saveSuccess")
    }, (e) => {
        JsToDef.send("saveFailed")
    });
}
function LoadYT(){
    ytgame.game.loadData().then((data) => {
        JsToDef.send("loadData", data);
    });
}
function GetLocalTag(){
    const localTag = ytgame.system.getLanguage().then((result) => result).then((something) => JsToDef.send("language", something));
}
