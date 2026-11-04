'use strict';
(() => {
  const config=window.MAVDOG_CONFIG||{};
  // Social links are shared by the footer and portfolio page.
  const socialProfiles = [
    { label: 'Facebook', href: 'https://www.facebook.com/share/16R22v2rrG/?mibextid=wwXIfr' },
    { label: 'Instagram', href: 'https://www.instagram.com/jbrit0013?igsh=Z2J6YzlneWI5YnVs' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jason-britton-8988a113/' }
  ];
  const appScript = document.currentScript;
  if (appScript) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = new URL('../css/social.css', appScript.src).href;
    document.head.append(stylesheet);
  }
  function socialAnchor(profile) {
    const link = document.createElement('a');
    link.href = profile.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = profile.label + ' ↗';
    link.setAttribute('aria-label', profile.label + ' (opens in a new tab)');
    return link;
  }
  document.querySelectorAll('.site-footer').forEach(footer => {
    const social = document.createElement('nav');
    social.className = 'footer-social';
    social.setAttribute('aria-label', 'Social media');
    const title = document.createElement('span');
    title.className = 'footer-social-title';
    title.textContent = 'Follow along';
    social.append(title, ...socialProfiles.map(socialAnchor));
    footer.insertBefore(social, footer.querySelector('.footer-bottom'));
  });
  document.querySelectorAll('.social-row > div').forEach(row => {
    row.replaceChildren(...socialProfiles.map(socialAnchor));
  });
  // Reuse the existing business logos rather than generating a new brand mark.
  if (appScript) {
    const mainLogo = new URL('../images/Main logo - no background.png', appScript.src).href;
    const grayLogo = new URL('../images/Gray logo - no background.png', appScript.src).href;
    const headerLogo = document.querySelector('.site-header .brand img');
    if (headerLogo) {
      headerLogo.classList.add('business-logo');
      headerLogo.addEventListener('load', () => headerLogo.classList.remove('image-unavailable'));
      const fallback = () => { if (headerLogo.src !== grayLogo) headerLogo.src = grayLogo; };
      headerLogo.addEventListener('error', fallback, { once: true });
      if (headerLogo.complete && !headerLogo.naturalWidth) fallback();
    }
    document.querySelectorAll('.footer-brand').forEach(brand => {
      const logo = document.createElement('img');
      logo.className = 'business-logo footer-business-logo';
      logo.alt = '';
      logo.width = 76;
      logo.height = 76;
      logo.loading = 'lazy';
      logo.addEventListener('load', () => logo.classList.remove('image-unavailable'));
      logo.addEventListener('error', () => { logo.src = mainLogo; }, { once: true });
      logo.src = grayLogo;
      brand.prepend(logo);
    });
  }


  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
  const $=s=>document.querySelector(s);
  const node=(tag,value,className)=>{const el=document.createElement(tag);if(value!==undefined)el.textContent=String(value);if(className)el.className=className;return el;};
  const safeImage=value=>{try{if(typeof value!=='string'||!value)return '';const url=new URL(value,document.baseURI);return ['https:','http:','file:','blob:'].includes(url.protocol)?url.href:'';}catch{return '';}};
  function prepareImage(img){
    const unavailable=()=>{
      img.classList.add('image-unavailable');
      const photo=img.closest('.gallery-photo');
      if(photo){
        photo.hidden=true;
        const photos=[...document.querySelectorAll('.gallery-photo')];
        const note=$('#gallery-empty');
        if(note)note.hidden=!photos.every(item=>item.hidden);
      }
    };
    img.addEventListener('error',unavailable,{once:true});
    if(img.complete&&img.naturalWidth===0&&img.getAttribute('src'))unavailable();
  }
  document.querySelectorAll('img').forEach(prepareImage);
  document.querySelectorAll('[data-inquiry]').forEach(link=>link.addEventListener('click',()=>{
    const select=$('#contact-subject');if(select)select.value=link.dataset.inquiry;
  }));
  document.querySelectorAll('a[href="#contact"]').forEach(link=>link.addEventListener('click',()=>{
    setTimeout(()=>$('#contact-name')?.focus({preventScroll:true}),450);
  }));
  const menu=$('#hamburger-btn'),nav=$('#main-nav');
  matchMedia('(min-width: 768px)').addEventListener('change',()=>{
    nav?.classList.remove('show');menu?.setAttribute('aria-expanded','false');
  });
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('show',open);});
  nav?.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('show');menu.setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){nav.classList.remove('show');menu.setAttribute('aria-expanded','false');menu.focus();}});
  document.addEventListener('click',e=>{
    if(menu?.getAttribute('aria-expanded')==='true'&&!e.target.closest('.site-header')){
      nav.classList.remove('show');menu.setAttribute('aria-expanded','false');
    }
  });
  if(config.phone&&/^\+?[\d ()-]{7,25}$/.test(config.phone)){document.querySelectorAll('[data-phone]').forEach(a=>{a.hidden=false;a.textContent=config.phone;a.href='tel:'+config.phone.replace(/[^+\d]/g,'');});document.querySelectorAll('[data-phone-missing]').forEach(el=>el.hidden=true);document.querySelectorAll('[data-phone-heading]').forEach(el=>el.hidden=false);}
  if(config.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)){document.querySelectorAll('[data-email]').forEach(a=>{a.hidden=false;a.textContent=config.email;a.href='mailto:'+config.email;});document.querySelectorAll('[data-email-missing]').forEach(el=>el.hidden=true);document.querySelectorAll('[data-email-heading]').forEach(el=>el.hidden=false);}
  async function request(url,options={},json=true){const response=await fetch(url,{...options,signal:AbortSignal.timeout(20000)});if(!response.ok)throw new Error('Request failed');if(!json)return null;const body=await response.text();return body?JSON.parse(body):null;}
  const contact=$('#form');
  if(contact){const status=$('#result'),button=contact.querySelector('button');if(!config.web3formsAccessKey){button.disabled=true;status.textContent='Online inquiries are currently unavailable. Please use the contact details listed here.';}contact.addEventListener('submit',async e=>{e.preventDefault();if(!config.web3formsAccessKey)return;const data=new FormData(contact);if(data.get('botcheck'))return;status.textContent='Please wait…';button.disabled=true;try{const result=await request('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({...Object.fromEntries(data),access_key:config.web3formsAccessKey})});if(!result?.success)throw new Error('Submission failed');contact.reset();status.textContent='Form submitted successfully!';}catch{status.textContent='Your message could not be confirmed. Please try again. Your text has been kept.';}finally{button.disabled=false;}});}
  // Native dialogs handle focus trapping and Escape. Restore focus after every close.
  const openers=new WeakMap();
  function open(dialog){openers.set(dialog,document.activeElement);dialog.showModal();}
  document.querySelectorAll('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>openers.get(dialog)?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));});
  const imageDialog=$('#image-dialog');
  document.querySelectorAll('.gallery-photo').forEach(button=>button.addEventListener('click',()=>{const src=button.querySelector('img');if(!imageDialog)return;const img=imageDialog.querySelector('img');img.src=src.src;img.alt=src.alt;open(imageDialog);}));
  // Slideshow: native JS replaces require.context and React state/effects.
  if($('#slideshow')){
    const slides=(config.slideshowImages?.length?config.slideshowImages:window.MAVDOG_SLIDES||[]).map(value=>typeof value==='string'?{src:value,alt:'MAVDOG K-9 training'}:value).filter(x=>safeImage(x.src));
    const img=$('#slide-image'),status=$('#slide-status'),pause=$('#pause-slideshow');let index=0,timer;const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;
    function show(){if(!slides.length){img.hidden=true;status.textContent='Training photographs are coming soon. Explore our programs or get in touch to learn more.';['#left-arrow','#right-arrow','#pause-slideshow'].forEach(s=>$(s).hidden=true);return;}status.textContent='';img.hidden=false;img.classList.remove('image-unavailable');img.src=slides[index].src;img.alt=slides[index].alt||`Training photograph ${index+1} of ${slides.length}`;}
    function restart(){clearInterval(timer);if(!paused&&!document.hidden&&slides.length>1)timer=setInterval(()=>{index=(index+1)%slides.length;show();},Math.max(1500,Number(config.slideshowInterval)||5000));pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Play slideshow':'Pause slideshow';}
    function move(step){if(!slides.length)return;index=(index+step+slides.length)%slides.length;show();restart();}
    $('#left-arrow').addEventListener('click',()=>move(-1));$('#right-arrow').addEventListener('click',()=>move(1));pause.addEventListener('click',()=>{paused=!paused;restart();});document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',()=>{paused=reduced.matches;restart();});show();restart();
  }
  // Testimonials: preserve original GET/POST/PUT/DELETE routes and field names.
  if(!$('#testimonials-container'))return;
  let api='';try{const url=new URL(config.apiUrl);if(url.protocol==='https:'||(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))api=url.href.replace(/\/$/,'');}catch{}
  const status=$('#review-status'),list=$('#testimonials-container'),retry=$('#retry-reviews'),form=$('#review-form'),formDialog=$('#review-form-dialog'),popup=$('#review-dialog'),deleteDialog=$('#delete-dialog');
  let selected=null,editing=null,previewUrl=null;
  const credentials=config.apiCredentials==='include'?'include':'omit';
  const stars=review=>{const count=Math.max(0,Math.min(5,Math.round(Number(review.stars)||0)));return '★'.repeat(count)+'☆'.repeat(5-count);};
  function reviewImage(value){if(typeof value!=='string'||!value)return '';try{return safeImage(new URL(value,api+'/').href);}catch{return '';}}
  function render(reviews){list.replaceChildren();for(const review of reviews){if(!review||typeof review!=='object')continue;const card=node('button',undefined,'testimonial-card');card.type='button';const image=reviewImage(review.img);if(image){const img=node('img');img.src=image;img.alt=review.dog_name||'Dog';img.loading='lazy';prepareImage(img);card.append(img);}card.append(node('h2',[review.client_name,review.dog_name].filter(Boolean).join(' & ')),node('p','Training Type: '+(review.training_type||'')),node('p',stars(review),'stars'),node('p',review.review||'','review'));card.addEventListener('click',()=>{selected=review;$('#review-title').textContent=[review.client_name,review.dog_name].filter(Boolean).join(' & ');$('#review-stars').textContent=stars(review);$('#review-training').textContent='Training Type: '+(review.training_type||'');$('#review-text').textContent=review.review||'';$('#review-image').hidden=!image;if(image)$('#review-image').src=image;$('#review-image').alt=review.dog_name||'Dog';$('#review-actions').hidden=!config.enableReviewManagement||!review._id;open(popup);});list.append(card);}}
  async function load(){retry.hidden=true;status.textContent='Loading testimonials…';if(!api){status.textContent='Client experiences will be available here soon.';return;}try{const reviews=await request(api+'/api/reviews',{credentials});if(!Array.isArray(reviews))throw new Error('Invalid reviews');render(reviews);status.textContent=reviews.length?'':'No testimonials yet. Be the first to share your experience.';}catch{status.textContent='Testimonials could not be loaded. Please try again.';retry.hidden=false;}}
  retry.addEventListener('click',load);
  function resetPreview(){if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null;}$('#img-prev').removeAttribute('src');$('#img-prev').hidden=true;}
  function openForm(review){editing=review||null;form.reset();resetPreview();$('#review-form-status').textContent='';$('#review-form-title').textContent=review?'Edit Testimonial':'Add New Testimonial';form.className=review?'edit-form':'add-form';formDialog.className=review?'edit-modal-container':'add-modal-container';form.querySelector('.save-btn').textContent=review?'Save':'Submit';if(review){for(const field of ['client_name','dog_name','stars','training_type','review'])form.elements.namedItem(field).value=review[field]??'';const image=reviewImage(review.img);if(image){$('#img-prev').src=image;$('#img-prev').hidden=false;}}else form.elements.namedItem('stars').value=5;open(formDialog);}
  $('#add-btn').hidden=!config.enableReviewSubmissions||!api;
  $('#add-btn').addEventListener('click',()=>openForm());
  $('#edit-review').addEventListener('click',()=>{if(!config.enableReviewManagement||!selected?._id)return;popup.close();openForm(selected);});
  $('#delete-review').addEventListener('click',()=>{if(!config.enableReviewManagement||!selected?._id)return;popup.close();$('#delete-client').textContent=selected.client_name||'';$('#delete-result').textContent='';open(deleteDialog);});
  $('#review-file').addEventListener('change',()=>{resetPreview();const file=$('#review-file').files[0];if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024){$('#review-form-status').textContent='Choose a JPG, PNG, or WebP file smaller than 5 MB.';$('#review-file').value='';return;}previewUrl=URL.createObjectURL(file);$('#img-prev').src=previewUrl;$('#img-prev').hidden=false;});
  formDialog.addEventListener('close',resetPreview);
  form.addEventListener('submit',async e=>{e.preventDefault();if(editing?!config.enableReviewManagement:!config.enableReviewSubmissions)return;const result=$('#review-form-status'),button=form.querySelector('.save-btn');button.disabled=true;result.textContent=editing?'Updating…':'Sending…';try{const data=new FormData(form);if(!$('#review-file').files.length)data.delete('img');const path='/api/reviews'+(editing?'/'+encodeURIComponent(editing._id):'');await request(api+path,{method:editing?'PUT':'POST',body:data,credentials});formDialog.close();await load();}catch{result.textContent='Could not save the testimonial. Check your connection and permissions, then try again.';}finally{button.disabled=false;}});
  $('#confirm-delete').addEventListener('click',async()=>{if(!config.enableReviewManagement||!selected?._id)return;const button=$('#confirm-delete');button.disabled=true;$('#delete-result').textContent='Deleting…';try{await request(api+'/api/reviews/'+encodeURIComponent(selected._id),{method:'DELETE',credentials},false);deleteDialog.close();await load();}catch{$('#delete-result').textContent='Delete failed. Check your connection and permissions, then try again.';}finally{button.disabled=false;}});
  load();
})();
