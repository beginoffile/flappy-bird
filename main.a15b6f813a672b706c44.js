(()=>{"use strict";var e=document.getElementById("game-canvas"),t=e.getContext("2d"),n=document.getElementById("title-game"),i=document.getElementById("end-menu"),o=document.getElementById("restart-button"),s=document.getElementById("score-display"),d=document.getElementById("game-container"),a=new Image;a.src="./assets/images/flappy_dunk.png";var c=document.getElementById("idsound"),r=50,l=125,m=50,g=50,u=0,y=.1,p=400,h=e.height-200,v=!1,f=document.getElementById("score-display"),E=0,I=0,k=!1,L=!1;function B(){b("videogame-death-sound-43894.mp3"),document.getElementById("end-menu").style.display="block",d.classList.add("backdrop-blur"),document.getElementById("end-score").innerHTML=E,I<E&&(I=E),document.getElementById("best-score").innerHTML=I}function b(e){c.src="./assets/sounds/".concat(e),c.play()}function M(){var n,i,o,s,d,c,L,H,T,w;(t.clearRect(0,0,e.clientWidth,e.height),t.drawImage(a,m,g),t.fillStyle="#333",t.fillRect(p,-100,r,h),t.fillRect(p,h+l,r,e.height-h),n=m,i=g,o=40,s=30,d=p,c=h-l+30,L=r,H=p,T=h+l+30,w=r,e.height,n+o>d&&i+d+L&&i<c||n+o>H&&n<H+w&&i+s>T||g<0||g+30>e.height)?B():((p-=1.5)<-50&&(p=400,h=Math.random()*(e.height-l)+r),g+=u+=y,m>p+r&&(g<h+l||g+30>h+l)&&!k&&(E++,f.innerHTML=E,k=!0,E>I&&!v&&I>0?(b("winfantasia-6912.mp3"),v=!0):b("short-success-sound-glockenspiel-treasure-video-game-6346.mp3")),m<p+r&&(k=!1),requestAnimationFrame(M))}n.innerHTML="Press to Start...",o.innerHTML="Start",s.style.display="none","serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("./service-worker.js").then((function(e){console.log("SW registered",e)})).catch((function(e){console.log("Sw Registration failed",e)}))})),document.body.onkeyup=function(e){"Space"==e.code&&(u=-5)},e.addEventListener("click",(function(){u=-5})),o.addEventListener("click",(function(){b("game-start-6104.mp3"),L?(document.getElementById("end-menu").style.display="none",d.classList.remove("backdrop-blur"),m=50,g=50,u=0,y=.1,p=400,h=e.height-200,E=0,f.innerHTML=E,v=!1,M()):(L=!0,e.style.display="block",i.style.display="none",n.innerHTML="Game-Over!",o.innerHTML="Restart",s.style.display="block",M())}))})();