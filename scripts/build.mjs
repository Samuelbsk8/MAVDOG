import {readdir,writeFile,cp,mkdir,rm,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');process.chdir(root);
const files=await readdir('images/slideshow').catch(()=>[]);
let images=files.filter(x=>/\.(png|jpe?g|webp|gif|svg)$/i.test(x)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).map(x=>'images/slideshow/'+x);
if(!images.length){
  for(const name of ['ronin-run.JPG','Harra-laydown.JPG','ronin-sit.JPG','cover.JPG']){
    try{await readFile('images/'+name);images.push('images/'+name);}catch{}
  }
}
await writeFile('js/slideshow-images.js','window.MAVDOG_SLIDES = '+JSON.stringify(images,null,2)+';\n');
await rm('dist',{force:true,recursive:true});await mkdir('dist');
for(const name of ['index.html','portfolio.html','testimonials.html','404.html','config.js','css','js','images','_headers','robots.txt'])await cp(name,'dist/'+name,{recursive:true});
console.log('Built dist/ with the new MAVDOG design and '+images.length+' slideshow photos.');
if(!images.length)console.log('Copy your original slideshow photos into images/slideshow, then rebuild.');
console.log('Run npm run check for links, markup, and missing original images.');
