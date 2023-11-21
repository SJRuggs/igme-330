(()=>{var e={832:()=>{var e=document.querySelector("#burger"),t=document.querySelector("#nav-links");e.addEventListener("click",(function(){t.classList.toggle("is-active")}))},515:(e,t,n)=>{"use strict";var r,a,o,i,c;n.d(t,{DV:()=>v,HR:()=>y,M0:()=>b,MC:()=>f,Qu:()=>p,eA:()=>r,gH:()=>m,jA:()=>g,qo:()=>a,uE:()=>d});var u,l,s,h=Object.freeze({gain:.5,numSamples:256}),d=function(e){var t=window.AudioContext||window.webkitAudioContext;r=new t,o=new Audio,f(e),i=r.createMediaElementSource(o),(u=r.createBiquadFilter()).type="highshelf",u.frequency.setValueAtTime(1e3,r.currentTime),(l=r.createBiquadFilter()).type="lowshelf",l.frequency.setValueAtTime(1e3,r.currentTime),s=r.createWaveShaper(),(a=r.createAnalyser()).fftSize=h.numSamples,(c=r.createGain()).gain.value=h.gain,i.connect(u),u.connect(l),l.connect(s),s.connect(a),a.connect(c),c.connect(r.destination)},f=function(e){return o.src=e},v=function(e){return o.play()},y=function(e){return o.pause()},g=function(e){return c.gain.value=Number(e)},m=function(e){e?u.gain.setValueAtTime(25,r.currentTime):u.gain.setValueAtTime(0,r.currentTime)},p=function(e){e?l.gain.setValueAtTime(25,r.currentTime):l.gain.setValueAtTime(0,r.currentTime)},b=function(e,t){s.curve=e?w(t):null},w=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:20,t=new Float32Array(256),n=0;n<256;++n){var r=2*n/256-1;t[n]=(Math.PI+e)*r/(Math.PI+e*Math.abs(r))}return t}},778:(e,t,n)=>{"use strict";var r=n(880);window.onload=function(){return r.S()}},880:(e,t,n)=>{"use strict";n.d(t,{S:()=>i});var r=n(515),a=n(339),o={bars:!0,circles:!0,distortion:!1,distortionAmount:20,emboss:!1,gradient:!0,highshelf:!1,invert:!1,lowshelf:!1,noise:!1,visualize:!0,volume:50},i=function(e){var t=new XMLHttpRequest;t.onload=function(e){return c(JSON.parse(e.target.response))},t.onerror=function(e){return console.log(e.target.status)},t.open("GET","./data/av-data.json"),t.send()},c=function(e){document.querySelector("#description").innerHTML=e.description;for(var t=document.querySelector("#select-track"),n=0;n<e.tracks.length;n++){var o=document.createElement("option");o.value="media/".concat(e.tracks[n],".mp3"),o.innerHTML=e.tracks[n],t.appendChild(o)}r.uE("media/".concat(e.tracks[0],".mp3"));var i=document.querySelector("canvas");u(i),a.q(i,r.qo),l()},u=function(e){document.querySelector("#btn-fs").onclick=function(t){console.log("goFullscreen() called"),s(e)};var t=document.querySelector("#btn-play");t.onclick=function(e){"suspended"==r.eA.state&&r.eA.resume(),"no"==e.target.dataset.playing?(r.DV(),e.target.dataset.playing="yes"):(r.HR(),e.target.dataset.playing="no")};var n=document.querySelector("#slider-volume"),a=document.querySelector("#label-volume");n.oninput=function(e){r.jA(e.target.value),o.volume=e.target.value/2*100,a.innerHTML="".concat(Math.round(e.target.value/2*100),"%")},n.dispatchEvent(new Event("input")),document.querySelector("#select-track").onchange=function(e){r.MC(e.target.value),(t.dataset.playing="yes")&&t.dispatchEvent(new MouseEvent("click"))},Object.getOwnPropertyNames(o).forEach((function(e){var t=document.querySelector("#cb-".concat(e));t&&(t.checked=o[e],t.onchange=function(t){o[e]=t.target.checked,"highshelf"==e?r.gH(t.target.checked):"lowshelf"==e?r.Qu(t.target.checked):"distortion"==e&&r.M0(t.target.checked,o.distortionAmount)})})),r.gH(o.highshelf),r.Qu(o.lowshelf),r.M0(o.distortion,o.distortionAmount);var i=document.querySelector("#burger"),c=document.querySelector("#nav-links");i.addEventListener("click",(function(){c.classList.toggle("is-active")}))},l=function e(t){setTimeout(e,1e3/60),a.i(o)},s=function(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullscreen?e.mozRequestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()}},553:(e,t,n)=>{"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!==r(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a.key),"symbol"===r(o)?o:String(o)),a)}var o}n.d(t,{G:()=>o});var o=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Object.assign(this,{x:t,y:n,radius:r}),this.dx=1,this.dy=1,this.color="white"}var t,n;return t=e,(n=[{key:"update",value:function(e,t){t&&(this.x+=Math.pow(t/100,2),this.y+=Math.pow(t/100,2)),this.wrapAround(e),this.draw(e)}},{key:"draw",value:function(e){e.save(),e.fillStyle=this.color,e.beginPath(),e.arc(this.x,this.y,this.radius,0,2*Math.PI),e.fill(),e.restore()}},{key:"wrapAround",value:function(e){this.x-this.radius>e.canvas.width&&(this.x=-1*this.radius),this.y-this.radius>e.canvas.height&&(this.y=-1*this.radius),this.x+this.radius<0&&(this.x=e.canvas.width-this.radius),this.y+this.radius<0&&(this.y=e.canvas.height-this.radius)}},{key:"distance",value:function(e,t,n,r){return Math.sqrt(Math.pow(n-e,2)+Math.pow(r-t,2))}},{key:"setRadius",value:function(e){this.radius=e}},{key:"setColor",value:function(e){this.color=e}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()},339:(e,t,n)=>{"use strict";n.d(t,{i:()=>f,q:()=>d});var r,a,o,i,c=n(553);function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var l,s=100,h=[],d=function(e,t){r=(l=e).getContext("2d"),a=t,o=new Uint8Array(a.fftSize/2),i=document.createElement("table"),document.querySelector("#data").appendChild(i);for(var n=0;n<s;n++)h.push(new c.G(r.canvas.width/s*n,0,0))},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(a.getByteFrequencyData(o),o=o.slice(0,s),e.visualize){i.style.display="none",r.rect(0,0,r.canvas.width,r.canvas.height),e.gradient&&m(),e.circles&&y(),e.bars&&v(e);var t=r.getImageData(0,0,r.canvas.width,r.canvas.height),n=t.data,c=n.length,u=t.width;e.noise&&b(n,c),e.invert&&p(n,c),e.emboss&&g(n,c,u),r.putImageData(t,0,0);for(var d=0;d<h.length;d++)h[d].setRadius(Math.pow(o[d]/50,2)),h[d].setColor("hsl(".concat(d/o.length*255,", 100%, ").concat(e.volume/2+25,"%)")),h[d].update(r,o[d])}else{i.style.display="block",l.style.display="none";var f=new Uint8Array(a.fftSize);f=f.slice(0,s),a.getByteTimeDomainData(f),S(f)}},v=function(e){for(var t=100,n=0;n<o.length;n++){var a=2*n*Math.PI/o.length,i=r.canvas.width/2+Math.cos(a-Math.PI/2)*t,c=r.canvas.height/2+Math.sin(a-Math.PI/2)*t,u=r.canvas.width/2+Math.cos(a-Math.PI/2)*(t+o[n]),l=r.canvas.height/2+Math.sin(a-Math.PI/2)*(t+o[n]),s="hsl(".concat(n/o.length*255,", 100%, ").concat(e.volume/2+25,"%)");r.save(),r.beginPath(),r.moveTo(i,c),r.lineTo(u,l),r.closePath(),r.lineWidth=3,r.strokeStyle=s,r.stroke(),r.closePath(),r.restore()}},y=function(e){var t=r.canvas.height/4;r.save(),r.globalAlpha=.5;for(var n=0;n<o.length;n++){var a=o[n]/255,i=a*t,c=r.canvas.width/2,u=r.canvas.height/2,l="rgba(255, 111, 111, ".concat(.34-a/3,")"),s="rgba(111, 111, 255, ".concat(.1-a/10,")"),h="rgba(255, 255, 111, ".concat(.25-a/4,")"),d=i,f=1.5*i,v=.5*i;r.fillStyle=l,r.beginPath(),r.arc(c,u,d,0,2*Math.PI,!1),r.fill(),r.closePath(),r.fillStyle=s,r.beginPath(),r.arc(c,u,f,0,2*Math.PI,!1),r.fill(),r.closePath(),r.fillStyle=h,r.beginPath(),r.arc(c,u,v,0,2*Math.PI,!1),r.fill(),r.closePath(),r.restore()}r.restore()},g=function(e,t,n){for(var r=0;r<t;r++)r%4!=3&&(e[r]=127+2*e[r]-e[r+4]-e[r+4*n])},m=function(e){r.save(),r.fillStyle=w(r,0,0,0,r.canvas.height,[{percent:0,color:"purple"},{percent:.5,color:"indigo"}]),r.fillRect(0,0,r.canvas.width,r.canvas.height),r.restore()},p=function(e,t){for(var n=0;n<t;n+=4){var r=e[n],a=e[n+1],o=e[n+2];e[n]=255-r,e[n+1]=255-a,e[n+2]=255-o}},b=function(e,t){for(var n=0;n<t;n+=4)Math.random()<.05&&(e[n]=e[n+1]=e[n+2]=0,e[n+2]=255)},w=function(e,t,n,r,a,o){var i,c=e.createLinearGradient(t,n,r,a),l=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}(o);try{for(l.s();!(i=l.n()).done;){var s=i.value;c.addColorStop(s.percent,s.color)}}catch(e){l.e(e)}finally{l.f()}return c},S=function(e){i.innerHTML="";for(var t=[document.createElement("tr")],n=0;n<s;n++){n%10==0&&(t.push(document.createElement("tr")),t[t.length-1].innerHTML="<td><b>".concat(n," - ").concat(n+9,"</b></td>"));var r=document.createElement("td");r.innerHTML=128-e[n],r.style.color="hsl(".concat(Math.pow(e[n],2),", 100%, 50%)"),r.style.border="1px solid black",t[t.length-1].appendChild(r)}t.forEach((function(e){return i.appendChild(e)}))}}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(339),n(553),n(880),n(778),n(515),n(832)})();