import esbuild from 'esbuild';

const entryPoints = [
    'src/sw.js', 
    'src/scripts/scrapper.js', 
    'src/scripts/pop.js', 
    'src/scripts/scrapCandidates.js'
    //Puntos de entrada, que me traiga el service worker y tambien el scrapper js
]

esbuild.build({
    entryPoints, 
    watch:true, //Que este siempre escuchando cambios
    bundle:true, //Que comprima 2 o mar archivos
    outdir: 'dist', //a donde va a ir el codigo comrpimido
    // minify:true, //que lo minifique
})
 .then(res => console.log(JSON.stringify(res)))
 .catch(err => console.log(err))