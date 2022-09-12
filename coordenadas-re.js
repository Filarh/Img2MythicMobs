const fs = require('fs')
const Jimp = require('jimp')
const { off } = require('process')
const sharp = require('sharp')
const ruta = './for_particles/'
const cd = require('color-difference')


/////easy/////////
      const imginput = 'sword'
      ////después de cuantos pasos iniciar el dibujo///////
      const offset = 4
      ////si el dibujo va en el suelo o vertical////
      const vertical = 1
      const colored = 0
      ///compresión de la imagen, que tan grande puede representarse en relación a su resolución 128/(0.06)////
      const compresion = 0.06
      const resolution = 128
      //hoyos para optimización, dejalo en 1 si no deseas optimizar
      const holes = 1
      /////tamáño máximo de los puntos (0.8)//////
      let particlesize = 0.4
      //duracion de las partículas// 
      const duracion = 2 //0ms
      ///determina si el tamaño de las particulas se cambia dinamicamente en base al alpha del pixel
      const dynamicsize = 1
      ///optimizar colores, esto prácticamente desactiva el tamaño dinámico de las partículas
      const coloropt = 1
      /// Tolerancia entre colores///
      const Tolerancia = 30
      /// aún más optimización, hace que las coordenadas de píxeles persistentes sean más cortas de escribir
      const moreopt = 1
//////////////

const particle_b = particlesize
//nombre del archivo
const skillname = 'dibujo'
//nombre de la skill//
let hname = 'Draw'
//nombre del tick de la skill//
let defaultOT = 'dT'
//////////////////////
const targetfolder = 'frames'

let fullroute = ruta + imginput + '.png'


async function makescript(targetfile,sname){
  console.log(`procesado: ` + targetfile )
  const pi = await sharp(targetfile).resize(null,resolution).png().toBuffer()
  await sharp(pi).png().toFile('miratuwbda.png')
  const image = await Jimp.read(pi);
  const XXX = image.bitmap.width 
  const YYY = image.bitmap.height 
  let ses = scrapx(XXX,YYY,image,sname)
  return ses
}

function scrapx(a,b,image,nombre_skill){
  var opz = particlesize
  var oot = defaultOT
  data = ''

  data +=`${nombre_skill}: \n Skills: \n`
  const relativeX = image.bitmap.width /2
  const relativeY = image.bitmap.height /2
  let curx = 0
  let cury = 0

  let sis = image.getPixelColor(0,0);
  let hs = sis.toString(16).slice(0,-2);
  let phexstring =  hs
  if (hs.length < 3) phexstring =  '000000'

  for (let yc = 0; yc < b;yc++){

    for(let xc = 0;xc < a;xc++){
      
      let retraso = b-yc
      
      if(xc % holes ===0 ){
          sas = Jimp.intToRGBA(image.getPixelColor(xc,yc))
          
          //console.log(sas.a + ' tu wbda: ' + (sas.a * 0.8/ 255).toFixed(2))
          if (sas.a > 30) {
            curx=  relativeX - xc
            cury=   relativeY - yc
            curx = (curx * compresion).toFixed(2)
            cury = (cury * compresion+ offset).toFixed(2) 
            
            if (!!colored){
                end = ''
                  let sus = image.getPixelColor(xc,yc);
                  let hexString = sus.toString(16).slice(0,-2);
                  if (hexString.length < 3){ 
                    console.log(' X: ' + xc + ' Y: ' + yc + ' raw: ' + sus + ' +' + sus.toString(16) + ' ' + JSON.stringify(sas))
                    hexString = '000000'
                  }
                  if (!!dynamicsize) particlesize = (sas.a * opz / 255).toFixed(2)

                  if (!coloropt){defaultOT = `[effect:particles{p=reddust;color=#${hexString};amount=1;size=${particlesize}}]`
                  }else{
                    
                    if (!colarr.includes(hexString)) {
                      if(cd.compare('#'+ phexstring, '#' + hexString) > Tolerancia){
                        colarr.push (hexString)
                        colarrindex.push('c' + find)
                        defaultOT = `${colarrindex[find]}`
                        find += 1
                        }
                    }else{
                      defaultOT = `${colarrindex[colarr.indexOf(hexString)]}`
                    }
                    phexstring =  hexString
                  }
                  
                        

            }
            
            let towrite 
            if (!vertical) towrite = ` - projectile{g=-0.02;oT=${defaultOT};syo=0;sso=${curx};sfo=${cury};d=${duracion};mr=5;v=0} \n`
            if (!!vertical) towrite = ` - projectile{g=-0.02;oT=${defaultOT};syo=${cury};sso=${curx};sfo=0;d=${duracion};mr=5;v=0} \n`
            if (!moreopt){
              data += towrite
            }else{
                    let indices = new Set(tr)
                    if (indices.has(towrite)){data += ` - skill{s=${tri[tr.indexOf(towrite)]}} \n`}
                    //if (tr.includes(towrite)){data += ` - skill{s=${tri[tr.indexOf(towrite)]}} \n`}
                    else{
                      
                      if (dup.includes(towrite)){
                          tri.push('h' + rpix)
                          tr.push(towrite)
                          data += towrite
                          rpix += 1
                      }else{
                          dup.push(towrite)
                          data += towrite}
                    }
          }
           
        
        }
      }

    }
  

  }
  data += '\n'
  
  particlesize = particle_b
  return data

}

//feedback al usuario///
console.log("\x1b[36m",'parámetros:');
console.log("\x1b[34m",' Resolución: ' + resolution + ' /c: ' + compresion + ' /pix: ' +  particlesize)
console.log("\x1b[35m",' Coloreado: ' + !!colored)
console.log("\x1b[31m",' Vertical: ' + !!vertical)
console.log("\x1b[33m",' Offset: ' + offset)
console.log("\x1b[37m",' Dynamic Size: ' + !!dynamicsize)
/////



async function writescript(datos,fn){
  //console.log(datos)
  fs.writeFile('./tmp/' + fn +'.yml',datos,terminado) 
  //fs.writeFile(fn +'.yml',datos,terminado) 
  function terminado(err) {
    console.log("\x1b[32m",'Tu script fue escrito exitosamente(by Allen, no olvides la estrella xd)');
  }
}


async function animate(framesFolderPath){

let inicio = Date.now()

let truedata = ''
let start = `${hname}: \n Skills: \n`
let files = fs.readdirSync(framesFolderPath)
function ses(err) {
  console.log("\x1b[32m",'AAAAAAAAAAAA');
}
for (let file in files){
  //console.log(` - skill{s=frame${file}} \n`)
  start+= ` - skill{s=frame${file};delay=${file * duracion}}\n`
}


for (let file in files){
  let datoss = await makescript(framesFolderPath + '/' + files[file],`frame${file}`)
  try{truedata += datoss}catch{}
  console.log(file + '/' + files.length)
  //try{writescript(datoss,`z_frame_${file}`)}catch(err){console.log("\x1b[35m",err)}
}

for (k = 0; k < tr.length; k++) {
  if(truedata.includes(`- skill{s=${tri[k]}}`)){
  pixels += `${tri[k]}: \n Skills:\n${tr[k]}`
  }
}

for (i = 0; i < colarr.length; i++) pallete += `${colarrindex[i]}: \n Skills:\n  - effect:particles{p=reddust;c=#${colarr[i]};a=1;size=${particlesize}}\n`
if (!!coloropt && !!colored) writescript(pallete,'pallete')
if (!!moreopt) writescript(pixels,'pixels')
if (!colored) end = `${defaultOT}: \n Skills: \n - effect:particles{p=reddust;amount=1;color=#42f58d;hs=0;vs=0;y=0;size=0.3}`

 writescript(start + truedata + end,skillname)

 let fin = Date.now()
 console.log(Math.floor((fin - inicio) / 1000) + ' segundos')
}

animate(ruta+targetfolder)

// async function run(){
// let lil = await makescript(ruta +'frame1.png','Draw')
// writescript(lil)
// }

// run()
let [dup,tri,tr,colarrindex,colarr] = [[],[],[],[],[]]
let [data,pallete,pixels,end,rpix,find] = ['','','','',0,0]