import { $ } from "./selectors";

export async function waitForSelector(selector, intervalTime = 100, timeout = 5000){
    return new Promise ((resolve, reject) => {
        let cont = 0

        const interval = setInterval(()=>{
            cont ++
            if(cont === timeout/intervalTime +1){ //si el contador llega a ser igual a timeOut entre interval +1
                clearInterval(interval)
                reject(false)
            }
            if($(selector)){
                clearInterval(interval)
                resolve(true)
            } 

        },500)
    })
}

export async function waitForScroll (ofset = 60,time = 500, timeOut = 10000){
    let y = 0
    console.log('abc ');

    return new Promise((resolve, reject) =>{
        const interval = setInterval(() =>{
        if(y>= (document.body.scrollHeight - document.body.scrollTop)){
            console.log('12312');
            clearInterval(interval)
            resolve(true)
        }

        y+= ofset

        if(timeOut/time+1 > y/ofset+2*ofset){
            console.log('reject');
            clearInterval(interval)
            reject(false)
        }

        window.scrollTo({top: y, behavior: 'smooth'})
    },time)
 })

}