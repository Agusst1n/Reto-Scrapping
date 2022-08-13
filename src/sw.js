import { db } from "./config/conexion.dexie";

export async function injectScript(path, tabId) {
    const options = {
        target: { tabId }, //objetivo
        files: [path] //el script que va a ejecutar
    }

    return chrome.scripting.executeScript(options) //ejecuta scripts
}

export async function injectScrapCandidates(tabId) {

    return injectScript("scripts/scrapCandidates.js", tabId)

}


chrome.action.onClicked.addListener((tab) => { //acepta un parametro el cual es tab = pestania actual
    console.log('clicking');

    injectScrapCandidates(tab.id)

    // const options = {
    //     target:{tabId: tab.id}, //objetivo
    //     files: ["scripts/scrapCandidates.js"] //el script que va a ejecutar
    // }
    // chrome.scripting.executeScript(options) //ejecuta scripts
})

//Tab = ventana actual en la que se encuentra el usuario


chrome.runtime.onConnect.addListener((port) => {
    if (!(port.name === 'secureChannelScrap')) //en el caso de no se rel puerto seguro (es el nombre establecido para el puerto en scrapCandidates)
        throw new Error('No es el puerto seguro') //retornamos error

    port.onMessage.addListener(async (msg, { sender: { tab: { id: tabId, url: tabUrl } } }) => { //!recibe el msj

        const originalUrlParams = new URLSearchParams(tabUrl.match(/\?.+/)[0].replace('?', ''))

        const page = originalUrlParams.has('page') ? Number(originalUrlParams.get('page')) + 1 : 2

        let cont = 0
        console.log(msg);
        console.log(tabId);

        //    await chrome.tabs.update(tabId, {url:tabUrl + '&page='+ page})

        db.urlsCandidate.add({
            urls: msg.URLsCandidates,
        })

        const { id } = await chrome.tabs.create({ url: msg.URLsCandidates[cont] }); //seleccionando la primer URL


        cont++

        console.log('subiendo el cont', cont);

        injectScript('scripts/scrapper.js', id)//va a injectar el scrapper en la ventana que sec cree


        injectScrapCandidates(tabId)
    })
})