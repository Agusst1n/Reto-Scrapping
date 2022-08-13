import { injectScript } from "../sw";
import { $ } from "../utils/selectors";


$('#form').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const keyword = e.target[0].value //obteniendo el value del input
    console.log(keyword, 'target');

    // const url = `https://www.linkedin.com/search/results/all/?keywords=` + keyword

    const url = `https://www.linkedin.com/search/results/people/?keywords=` + keyword


    //?Tengo un bug, las keywords desaparecen y me dice que hay un error en la promesa

    const { id } = await chrome.tabs.create({ url }) //obteniendo id de la ventana

    // const options = {
    //     target : {tabId: tab.id}, //Id de la pestania
    //     files: ["scripts/scrapCandidates.js"] //archivos que se van a ejecutar

    // }

    injectScript('scripts/scrapCandidates.js', id)//va a injectar el scrapper en la ventana que sec cree


    // chrome.scripting.executeScript(options) //injectando el script
})