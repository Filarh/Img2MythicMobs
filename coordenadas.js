const fs = require('fs')
const Jimp = require('jimp')
const { off } = require('process')
const sharp = require('sharp')
const ruta = './for_particles/'

/////easy/////////
      const imginput = 'sample'
      ////después de cuantos pasos iniciar el dibujo///////
      const offset = 4
      ////si el dibujo va en el suelo o vertical////
      const vertical = 0
      const colored = 1
      ///compresión de la imagen, que tan grande puede representarse en relación a su resolución 128/(0.06)////
      const compresion = 0.06
      const resolution = 128
      //hoyos para optimización, dejalo en 1 si no deseas optimizar
      const holes = 1
      /////tamáño máximo de los puntos (0.8)//////
      let particlesize = 0.8
      //duracion de las partículas// 
      const duracion = 200 //0ms
      ///determina si el tamaño de las particulas se cambia dinamicamente en base al alpha del pixel
      const dynamicsize = 1
//////////////


//nombre del archivo
const skillname = 'output'
//nombre de la skill//
let hname = 'sample'
//nombre del tick de la skill//
let defaultOT = 'sampleT'
//////////////////////


//const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
async function makescript(){
const pi = await sharp(ruta + imginput + '.png').resize(resolution).png().toBuffer()
const image = await Jimp.read(pi);

const XXX = image.bitmap.width 
const YYY = image.bitmap.height 
scrapx(XXX,YYY,image)
}

function scrapx(a,b,image){
  var opz = particlesize
  var oot = defaultOT
  var data = `${hname}: \n Skills: \n`
  const relativeX = image.bitmap.width /2
  const relativeY = image.bitmap.height /2
  let curx = 0
  let cury = 0
  

  for (let yc = 0; yc < b;yc++){

    for(let xc = 0;xc < a;xc++){

      if(xc % holes ===0 ){
          sas = Jimp.intToRGBA(image.getPixelColor(xc,yc))
          //console.log(sas.a + ' tu wbda: ' + (sas.a * 0.8/ 255).toFixed(2))
          
          if (sas.a > 0) {
            curx=  relativeX - xc
            cury= relativeY - yc          
            curx = (curx * compresion).toFixed(2)
            cury = (cury * compresion+ offset).toFixed(2) 

            if (!!colored){
              let sus = image.getPixelColor(xc,yc);
              let hexString = sus.toString(16).slice(0,-2);
              if (!!dynamicsize) particlesize = (sas.a * opz / 255).toFixed(2)
              
              defaultOT = `[effect:particles{p=reddust;color=#${hexString};amount=1;size=${particlesize}}]`
            }

            if (!vertical) data += ` - projectile{g=-0.002;hp=false;oT=${defaultOT};hR=1;vR=1;sB=false;sE=false;syo=0;sso=${curx};sfo=${cury};d=${duracion};MaxRange=1;v=0} \n`
            if (!!vertical) data += ` - projectile{g=-0.002;hp=false;oT=${defaultOT};hR=1;vR=1;sB=false;sE=false;syo=${cury};sso=${curx};sfo=0;d=${duracion};MaxRange=1;v=0} \n`
            //data += ` - projectile{hp=false;g=-0.002;oT=[effect:particles{p=reddust;color=#${genRanHex(6)};amount=1;size:0.06}];sB=false;sE=false;syo=0;sso=${curx};sfo=${cury};d=50;MaxRange=1;v=0} \n`
        }
      }

    }
  

  }
  data += `${oot}: \n Skills: \n - effect:particles{p=reddust;amount=1;color=#42f58d;hs=0;vs=0;y=0;size=0.3}`
  //data += `dT: \n Skills: \n - effect:particles{p=flame;amount=1;hs=0;vs=0;y=0}`
  fs.writeFile(skillname +'.yml',data,terminado) 
  function terminado(err) {
    console.log("\x1b[32m",'Tu script fue escrito exitosamente(by Allen, no olvides la estrella xd)');
  }
}

console.log("\x1b[36m",'parámetros:');
console.log("\x1b[34m",' Resolución: ' + resolution + ' /c: ' + compresion + ' /pix: ' +  particlesize)
console.log("\x1b[35m",' Coloreado: ' + !!colored)
console.log("\x1b[31m",' Vertical: ' + !!vertical)
console.log("\x1b[33m",' Offset: ' + offset)
console.log("\x1b[35m",' Dynamic Size: ' + !!dynamicsize)
makescript()