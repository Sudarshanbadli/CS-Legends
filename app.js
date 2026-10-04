const DATA_URL = 'data/people.json';
let people = [], activeQuick = '';
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials = name => name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const uniqueFields = list => [...new Set(list.flatMap(p => p.tags || [p.field]))].sort((a,b)=>a.localeCompare(b));
function renderFilters(){
 const fields=uniqueFields(people);
 $('fieldFilter').innerHTML='<option value="">All fields</option>'+fields.map(f=>`<option value="${esc(f)}">${esc(f)}</option>`).join('');
 $('quickFields').innerHTML=['All',...fields.slice(0,9)].map((f,i)=>`<button class="chip ${i===0?'active':''}" data-field="${i===0?'':esc(f)}">${esc(f)}</button>`).join('');
 $('fieldCloud').innerHTML=fields.map(f=>`<button class="field-pill" data-cloud="${esc(f)}">${esc(f)}</button>`).join('');
 $('fieldCount').textContent=fields.length+'+';
}
function matches(p){
 const q=$('searchInput').value.trim().toLowerCase(), field=$('fieldFilter').value, title=$('titleFilter').value;
 const hay=[p.name,p.field,p.contribution,p.biography,p.honorary_title,...(p.tags||[])].join(' ').toLowerCase();
 return (!q||hay.includes(q))&&(!field||(p.tags||[p.field]).includes(field))&&(!title||!!p.honorary_title);
}
function render(){
 const list=people.filter(matches);
 $('resultCount').textContent=`Showing ${list.length.toLocaleString()} of ${people.length.toLocaleString()} profiles`;
 $('peopleGrid').innerHTML=list.slice(0,120).map(p=>`<article class="person-card" tabindex="0" role="button" data-slug="${esc(p.slug)}" aria-label="Open profile for ${esc(p.name)}"><span class="card-arrow">↗</span><div class="avatar">${esc(initials(p.name))}</div><div class="card-meta">${esc(p.field)}</div><h3>${esc(p.name)}</h3><p>${esc(p.contribution).slice(0,112)}${p.contribution.length>112?'…':''}</p>${p.honorary_title?`<span class="honorary">${esc(p.honorary_title)}</span>`:''}</article>`).join('');
 $('emptyState').hidden=list.length!==0;
}
function openProfile(slug){
 const p=people.find(x=>x.slug===slug); if(!p)return;
 $('modalContent').innerHTML=`<div class="profile-head"><div class="avatar">${esc(initials(p.name))}</div><div><div class="card-meta">${esc(p.field)}</div><h2 id="modalName">${esc(p.name)}</h2><p>${esc(p.country||'Country / affiliation: research required')}</p></div></div>
 ${p.honorary_title?`<div class="honorary">${esc(p.honorary_title)} · popular/honorary descriptor</div>`:''}
 <div class="profile-section"><h4>Biography</h4><p>${esc(p.biography)}</p></div>
 <div class="profile-section"><h4>Contributions</h4><p>${esc(p.contribution)}</p></div>
 <div class="profile-section"><h4>Fields</h4><div class="tag-list">${(p.tags||[p.field]).map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>
 <div class="profile-section"><h4>Research sources</h4><div class="source-links">${(p.sources||[]).map((s,i)=>`<a href="${esc(s)}" target="_blank" rel="noopener">${['IEEE Computer Pioneers','ACM A.M. Turing Award','Computer History Museum'][i]||'Institutional source'} ↗</a>`).join('')}<a href="${esc(p.portrait_search)}" target="_blank" rel="noopener">Search historical portraits on Wikimedia Commons ↗</a></div></div>
 <div class="profile-section"><h4>Portrait and rights</h4><div class="portrait-note">${esc(p.portrait_status)}. Add a portrait only after checking the exact file page, licence, creator, and attribution requirements. See IMAGE_CREDITS.csv.</div></div>`;
 $('modalBackdrop').hidden=false; document.body.style.overflow='hidden'; $('modalClose').focus();
}
function closeProfile(){ $('modalBackdrop').hidden=true;document.body.style.overflow=''; }
$('searchInput').addEventListener('input',render);
$('fieldFilter').addEventListener('change',()=>{activeQuick='';render();document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active',!c.dataset.field));});
$('titleFilter').addEventListener('change',render);
$('quickFields').addEventListener('click',e=>{const b=e.target.closest('[data-field]');if(!b)return;activeQuick=b.dataset.field;$('fieldFilter').value=activeQuick;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active',c===b));render();});
$('fieldCloud').addEventListener('click',e=>{const b=e.target.closest('[data-cloud]');if(!b)return;$('fieldFilter').value=b.dataset.cloud;document.querySelector('#explore').scrollIntoView({behavior:'smooth'});render();});
$('peopleGrid').addEventListener('click',e=>{const c=e.target.closest('[data-slug]');if(c)openProfile(c.dataset.slug);});
$('peopleGrid').addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-slug]')){e.preventDefault();openProfile(e.target.dataset.slug);}});
$('modalClose').addEventListener('click',closeProfile);$('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop'))closeProfile();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProfile();});
$('clearFilters').addEventListener('click',()=>{$('searchInput').value='';$('fieldFilter').value='';$('titleFilter').value='';render();});
$('themeToggle').addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=next;localStorage.setItem('cs-legends-theme',next);});
const saved=localStorage.getItem('cs-legends-theme');if(saved)document.documentElement.dataset.theme=saved;
fetch(DATA_URL).then(r=>{if(!r.ok)throw new Error('Could not load data/people.json');return r.json();}).then(d=>{people=d.people||[];$('peopleCount').textContent=people.length.toLocaleString()+'+';renderFilters();render();}).catch(err=>{$('resultCount').textContent='Unable to load profiles';$('peopleGrid').innerHTML=`<p class="portrait-note">${esc(err.message)}. Check that data/people.json is present in the repository.</p>`;});
