(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

// menu mobilne
var bur=$('.burger'),menu=$('.menu');
if(bur){bur.addEventListener('click',function(){var o=menu.classList.toggle('otw');bur.setAttribute('aria-expanded',o)});
 $$('.menu a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('otw');bur.setAttribute('aria-expanded','false')})})}

// filtr ofert + pokaz wiecej
var oferty=$$('.dom'),btns=$$('.filtry button'),wiecej=$('.wiecej'),limit=window.innerWidth<761?4:(window.innerWidth<1321?9:(window.innerWidth<1900?12:15)),pelne=false,filtr='wszystkie';
function pokaz(){var n=0;oferty.forEach(function(d){var ok=filtr==='wszystkie'||d.dataset.f.indexOf(filtr)>-1;if(ok)n++;d.hidden=!ok||(!pelne&&n>limit)});
 var all=oferty.filter(function(d){return filtr==='wszystkie'||d.dataset.f.indexOf(filtr)>-1}).length;
 wiecej.hidden=pelne||all<=limit;$('.wiecej .ile').textContent=all}
btns.forEach(function(b){b.addEventListener('click',function(){btns.forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');filtr=b.dataset.f;pokaz()})});
if(wiecej){$('button',wiecej).addEventListener('click',function(){pelne=true;pokaz()})}
pokaz();

// zapytaj o domek
$$('.dom-pyt').forEach(function(b){b.addEventListener('click',function(){var s=$('#f-dom');s.value=b.dataset.dom;$('#kontakt').scrollIntoView({behavior:'smooth'});setTimeout(function(){$('#f-imie').focus({preventScroll:true})},700)})});

// pas zdjec: przeciaganie myszka + strzalki
$$('.pas').forEach(function(p){var down=false,sx=0,sl=0,moved=false;
 p.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=p.scrollLeft});
 window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;p.classList.add('ciag')}p.scrollLeft=sl-dx});
 window.addEventListener('pointerup',function(){if(!down)return;down=false;p.classList.remove('ciag')});
 p.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
 var box=p.parentNode,pr=$('.s-p',box),nx=$('.s-n',box);
 function st(){if(!pr)return;pr.disabled=p.scrollLeft<4;nx.disabled=p.scrollLeft+p.clientWidth>=p.scrollWidth-4}
 if(pr){pr.addEventListener('click',function(){p.scrollBy({left:-p.clientWidth*.8,behavior:'smooth'})});nx.addEventListener('click',function(){p.scrollBy({left:p.clientWidth*.8,behavior:'smooth'})});p.addEventListener('scroll',st,{passive:true});st()}
});

// lightbox
var lb=$('.lb'),lbi=$('img',lb),lbp=$('p',lb),grupa=[],ix=0;
function otworz(g,i){grupa=g;ix=i;lb.hidden=false;ustaw();document.body.style.overflow='hidden'}
function ustaw(){var e=grupa[ix];lbi.src=e.dataset.duze;lbi.alt=e.dataset.opis||'';lbp.textContent=(e.dataset.opis?e.dataset.opis+'  ':'')+(ix+1)+' / '+grupa.length}
function zamknij(){lb.hidden=true;document.body.style.overflow=''}
$$('[data-duze]').forEach(function(e){e.addEventListener('click',function(){var g=$$('[data-duze]',e.closest('[data-grupa]')).filter(function(x){return !x.closest('[hidden]')});otworz(g,g.indexOf(e))})});
$('.lb-x').addEventListener('click',zamknij);
$('.lb-p').addEventListener('click',function(){ix=(ix-1+grupa.length)%grupa.length;ustaw()});
$('.lb-n').addEventListener('click',function(){ix=(ix+1)%grupa.length;ustaw()});
lb.addEventListener('click',function(e){if(e.target===lb)zamknij()});
document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')zamknij();if(e.key==='ArrowLeft')$('.lb-p').click();if(e.key==='ArrowRight')$('.lb-n').click()});
var tx=0;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)(d<0?$('.lb-n'):$('.lb-p')).click()});

// mapa po kliknieciu
var mb=$('.mapa button');if(mb)mb.addEventListener('click',function(){var f=document.createElement('iframe');f.src='https://www.google.com/maps?q=Os%C3%B3wka+23,+09-304+Lubowidz&output=embed';f.title='Mapa dojazdu: Osówka 23, Lubowidz';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mb.replaceWith(f)});

// formularz pokazowy
var fm=$('form');if(fm)fm.addEventListener('submit',function(e){e.preventDefault();var p=document.createElement('p');p.className='wyslano';p.textContent='To podgląd strony, formularz nie wysyła jeszcze wiadomości. Na docelowej stronie zapytanie trafi na biuro.huberol@gmail.com.';fm.appendChild(p);$('button[type=submit]',fm).disabled=true});

// dolny pasek po przewinieciu za hero
var mob=$('.mob'),hero=$('.hero');
if(mob&&'IntersectionObserver' in window){new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting)},{threshold:0}).observe($('.hero-akcje'))}
})();
