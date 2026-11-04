import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
process.chdir(resolve(import.meta.dirname,'..'));
const pages=['index.html','portfolio.html','testimonials.html','404.html'];
const missing=new Set();
for(const page of pages){
  const html=await readFile('dist/'+page,'utf8');
  assert(!/className=|process\.env|require\.context|<\/?(?:Link|HashLink)\b|\bref=\{|\bonClick=/.test(html),page+': untranslated React');
  assert(html.includes('lang="en"'),page+': missing language');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(ids.length,new Set(ids).size,page+': duplicate IDs');
  for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(/^(?:https?:|mailto:|tel:)/i.test(url))continue;
    const [target,fragment]=url.split('#');
    const path=decodeURIComponent(target.split('?')[0]);
    if(path){
      try{await access('dist/'+path);}catch{
        if(path.startsWith('images/'))missing.add(path);
        else throw new Error(page+': missing '+path);
      }
    }
    if(fragment){
      const dest=await readFile('dist/'+(path||page),'utf8');
      const targetIds=[...dest.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
      assert(targetIds.includes(decodeURIComponent(fragment)),page+': broken anchor '+url);
    }
  }
}
const css=await readFile('dist/css/site.css','utf8');
assert(css.includes("@import url('./main.css')"),'Missing original palette import');
await access('dist/css/main.css');
const palette=await readFile('dist/css/main.css','utf8');
for(const color of ['#6f7460','#2c2d29','#d9dbd2','#f7f7f5','#bfc077','#a07f5a','#9fb39c','#c76d4a','#9a3f25'])assert(palette.includes(color),'Missing brand color '+color);
console.log('PASS: four pages, local links and anchors, script/style references, unique IDs, original palette, and no React syntax.');
if(missing.size){console.log('Original photos/logos still need copying from your old public/images folder ('+missing.size+' referenced files).');for(const p of missing)console.log('  '+p);}
