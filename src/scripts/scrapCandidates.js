import { searchSelectors } from "../config/scrapperSelectors";
import { $, $$ } from "../utils/selectors";
import { waitForScroll, waitForSelector } from "../utils/waitFor";




const postProfile = async (profile) =>{
    const res = await fetch('https://scrap-5215e-default-rtdb.firebaseio.com/URLsProfiles.json',{
        method: 'POST',
        body: JSON.stringify(profile)
    })
 }

async function init (){

    console.log('iniciando');

    await waitForSelector(searchSelectors.paginateResultsContainer)

    await waitForScroll()

    const URLsCandidates = $$(searchSelectors.paginateResultsContainer).map(element=> $('.app-aware-link', element).href)

    console.log(URLsCandidates);

    postProfile(URLsCandidates)

    const port = chrome.runtime.connect({name: "secureChannelScrap"}) //creando un puerto
    port.postMessage({URLsCandidates}) //La info que va a pasar como msj son las urls de los candidatos
}


init() 

//!Pasa la url como msj porque al ser 3 contextos diferentes ningun contexto sabe que variables tiene el otro
//!por eso se la pasa como msj pero OJO! porque pasa msj gasta memoria