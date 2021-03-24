(()=>{"use strict";var e,t,o,n,r,l,a,s;e=document.querySelector(".club-select").querySelector("ul"),t=document.getElementById("free_visit_form"),o=document.getElementById("callback_form"),document.body.addEventListener("click",(function(n){var r=n.target;r.closest(".club-select")?e.style.display="block":r.closest(".club-select")||(e.style.display="none"),r.closest('[data-popup="#free_visit_form"]')?t.style.display="block":!r.closest(".close-form")&&r.closest(".form-wrapper")||(t.style.display="none"),r.closest('[data-popup="#callback_form"]')?o.style.display="block":!r.closest(".close-form")&&r.closest(".form-wrapper")||(o.style.display="none")})),n="Что-то пошло не так.",r="Спасибо! Мы с вами свяжемся.",(l=document.createElement("div")).style.cssText="font-size: 1.5em; margin-top: 5px; margin-bottom: 5px;",document.body.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector('[type="tel"]'),o=t.value.match(/^\+/)&&t.value.length<12,a=t.value.match(/^(7|8)/)&&t.value.length<11,s=t.value.length<11;if(o||a||s)return e.target.querySelector('[type="tel"]').setCustomValidity("Недостаточно символов для номера телефона"),void e.target.querySelector('[type="tel"]').addEventListener("blur",(function(){12===this.value.length&&this.setCustomValidity("")}),!1);l.style.color="#ffd11a",e.target.appendChild(l),l.textContent="Загрузка...";var c=new FormData(e.target),i={};c.forEach((function(e,t){i[t]=e})),function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(i).then((function(e){if(200!==e.status)throw new Error("Network status is not 200")})).then((function(){if(e.target.closest(".form-content")){e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.closest("form").style.display="none";var t=document.createElement("div"),o=document.createElement("img");t.style.cssText="display: block; color: #fff; margin: auto; margin-top: 50px; font-size: 1.5em; max-width: 200px;",o.src="./images/success.svg",o.style.cssText="display: block; width: 100px; height: 100px; margin: auto; margin-bottom: 10px;",t.append(o),t.append(r),e.target.closest(".form-content").appendChild(t),setTimeout((function(){t.style.display="none",e.target.closest("form").style.display="block"}),1500)}else e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.querySelectorAll("input").forEach((function(e){return e.style.border="2px solid green"})),l.textContent=r,setTimeout((function(){return e.target.querySelectorAll("input").forEach((function(e){return e.style.border="none"}))}),1500)})).catch((function(t){if(e.target.closest(".form-content")){e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.closest("form").style.display="none";var o=document.createElement("div"),r=document.createElement("img");o.style.cssText="display: block; color: #fff; margin: auto; margin-top: 50px; font-size: 1.5em; max-width: 200px;",r.src="./images/warning.svg",r.style.cssText="display: block; width: 100px; height: 100px; margin: auto; margin-bottom: 10px;",o.append(r),o.append(n),e.target.closest(".form-content").appendChild(o),setTimeout((function(){o.style.display="none",e.target.closest("form").style.display="block"}),1500)}else e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.querySelectorAll("input").forEach((function(e){return e.style.border="2px solid red"})),l.textContent=n,setTimeout((function(){return e.target.querySelectorAll("input").forEach((function(e){return e.style.border="none"}))}),1500);console.error(t)})).finally((function(){setTimeout((function(){l.textContent=""}),1500)}))})),document.body.addEventListener("input",(function(e){var t=e.target;t.matches('[name="name"]')&&(t.value=t.value.replace(/[^а-яё\-\ ]/gi,"")),t.matches('[name="phone"]')&&(t.value.match(/^\+/)&&(t.value=t.value.substring(0,12)),t.value.match(/^(7|8)/)&&(t.value=t.value.substring(0,11)),t.value=t.value.replace(/[^\d\(\)\-\+]/,""))})),a=document.getElementById("gift"),s=document.querySelector(".fixed-gift"),document.body.addEventListener("click",(function(e){e.target.closest(".fixed-gift")?(a.style.display="block",s.style.display="none"):(e.target.closest(".close-form")||!e.target.closest(".form-wrapper")||e.target.matches(".close-btn"))&&(a.style.display="none")}))})();