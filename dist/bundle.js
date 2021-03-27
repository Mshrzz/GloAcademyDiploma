(()=>{"use strict";function e(e,n){if(e){if("string"==typeof e)return t(e,n);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,n):void 0}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o,r,i,s,l,a,c,d,u,p,m,y,h,f;o=document.querySelector(".club-select").querySelector("ul"),r=document.getElementById("free_visit_form"),i=document.getElementById("callback_form"),document.body.addEventListener("click",(function(e){var t=e.target;t.closest(".club-select")?o.style.display="block":t.closest(".club-select")||(o.style.display="none"),t.closest('[data-popup="#free_visit_form"]')?r.style.display="block":!t.closest(".close-form")&&t.closest(".form-wrapper")||(r.style.display="none"),t.closest('[data-popup="#callback_form"]')&&!t.closest("form")?i.style.display="block":!t.closest(".close-form")&&t.closest(".form-wrapper")||(i.style.display="none")})),s="Что-то пошло не так.",l="Спасибо! Мы с вами свяжемся.",(a=document.createElement("div")).style.cssText="font-size: 1.5em; margin-top: 5px; margin-bottom: 5px;",document.body.addEventListener("submit",(function(e){if(e.preventDefault(),e.target.querySelector('[type="checkbox"]')&&!e.target.querySelector('[type="checkbox"]').checked){var t=e.target.querySelector(".personal-data"),n=document.createElement("p");return n.style.cssText="color: red; font-size: 1.2em; margin: 5px 0;",n.textContent="Вы должны подтвердить согласие",t.append(n),e.target.querySelector('[type="submit"]').disabled=!0,void setTimeout((function(){n.style.display="none",e.target.querySelector('[type="submit"]').disabled=!1}),1e3)}if(e.target.querySelector('[name="name"]')&&e.target.querySelector('[name="name"]').value.trim().length<2&&!e.target.closest(".price-message")){var o=e.target.querySelector('[name="name"]');return o.setCustomValidity("Недостаточно символов для имени"),void o.addEventListener("blur",(function(){this.value.trim().length>=2&&this.setCustomValidity("")}),!1)}var r=e.target.querySelector('[type="tel"]'),i=r.value.match(/^\+/)&&r.value.length<12,c=r.value.match(/^(7|8)/)&&r.value.length<11,d=r.value.length<11;if(i||c||d)return e.target.querySelector('[type="tel"]').setCustomValidity("Недостаточно символов для номера телефона"),void e.target.querySelector('[type="tel"]').addEventListener("blur",(function(){12===this.value.length&&this.setCustomValidity("")}),!1);a.style.color="#ffd11a",e.target.appendChild(a),a.textContent="Загрузка...";var u=new FormData(e.target),p={};u.forEach((function(e,t){p[t]=e})),function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(p).then((function(e){if(200!==e.status)throw new Error("Network status is not 200")})).then((function(){if(e.target.closest(".form-content")){e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.closest("form").style.display="none";var t=document.createElement("div"),n=document.createElement("img");t.style.cssText="display: block; color: #fff; margin: auto; margin-top: 50px; font-size: 1.5em; max-width: 200px;",n.src="./images/success.svg",n.style.cssText="display: block; width: 100px; height: 100px; margin: auto; margin-bottom: 10px;",t.append(n),t.append(l),e.target.closest(".form-content").appendChild(t),setTimeout((function(){t.style.display="none",e.target.closest("form").style.display="block"}),1500)}else e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.querySelectorAll("input").forEach((function(e){return e.style.border="2px solid green"})),a.textContent=l,setTimeout((function(){return e.target.querySelectorAll("input").forEach((function(e){return e.style.border="none"}))}),1500),document.getElementById("thanks").style.display="flex",document.body.addEventListener("click",(function(e){(e.target.closest(".close-form")||!e.target.closest(".form-wrapper")||e.target.matches(".close-btn"))&&(document.getElementById("thanks").style.display="none")}))})).catch((function(t){if(e.target.closest(".form-content")){e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.closest("form").style.display="none";var n=document.createElement("div"),o=document.createElement("img");n.style.cssText="display: block; color: #fff; margin: auto; margin-top: 50px; font-size: 1.5em; max-width: 200px;",o.src="./images/warning.svg",o.style.cssText="display: block; width: 100px; height: 100px; margin: auto; margin-bottom: 10px;",n.append(o),n.append(s),e.target.closest(".form-content").appendChild(n),setTimeout((function(){n.style.display="none",e.target.closest("form").style.display="block"}),1500)}else{e.target.querySelectorAll("input").forEach((function(e){return e.value=""})),e.target.querySelectorAll("input").forEach((function(e){return e.style.border="2px solid red"})),a.textContent=s,setTimeout((function(){return e.target.querySelectorAll("input").forEach((function(e){return e.style.border="none"}))}),1500);var r=document.createElement("h4"),i=document.createElement("p");r.textContent="Произошла ошибка!",i.innerHTML="Данные не получилось отправить.<br>Попробуйте ещё раз.",r.classList.add("error-message-head"),i.classList.add("error-message-content"),document.getElementById("thanks").querySelector("h4").style.display="none",document.getElementById("thanks").querySelector("p").style.display="none",document.getElementById("thanks").querySelector(".form-content").insertAdjacentElement("afterbegin",i),document.getElementById("thanks").querySelector(".form-content").insertAdjacentElement("afterbegin",r),document.getElementById("thanks").style.display="flex",document.body.addEventListener("click",(function(e){(e.target.closest(".close-form")||!e.target.closest(".form-wrapper")||e.target.matches(".close-btn"))&&(document.getElementById("thanks").style.display="none",r.remove(),i.remove(),document.getElementById("thanks").querySelector("h4").style.display="block",document.getElementById("thanks").querySelector("p").style.display="block")}))}console.error(t)})).finally((function(){e.target.querySelector('[type="checkbox"]')&&(e.target.querySelector('[type="checkbox"]').checked=!1),setTimeout((function(){a.textContent="",document.body.querySelectorAll(".popup").forEach((function(e){return e.style.display="none"}))}),1500)}))})),document.body.addEventListener("input",(function(e){var t=e.target;t.closest(".price-message")&&(t.value=t.value.replace(/[^0-9а-яё\- ]/gi,"")),t.matches('[name="name"]')&&!t.closest(".price-message")&&(t.value=t.value.replace(/[^а-яё\-\ ]/gi,"")),t.matches('[name="phone"]')&&(t.value.match(/^\+/)&&(t.value=t.value.substring(0,12)),t.value.match(/^(7|8)/)&&(t.value=t.value.substring(0,11)),t.value=t.value.replace(/[^\d\(\)\-\+]/,""))})),c=document.getElementById("gift"),d=document.querySelector(".fixed-gift"),document.getElementById("gift")&&document.body.addEventListener("click",(function(e){e.target.closest(".fixed-gift")?(c.style.display="block",d.style.display="none"):!e.target.closest(".close-form")&&e.target.closest(".form-wrapper")&&!e.target.matches(".close-btn")||e.target.closest("#card_order")||(c.style.display="none")})),u=document.querySelector(".main-slider").children,p=0,setInterval((function(){u[p].style.display="none",++p>=u.length&&(p=0),u[p].style.display="flex"}),3e3),new(function(){function o(e){var t=e.main,n=e.wrap,r=e.next,i=e.prev,s=e.infinity,l=void 0!==s&&s,a=e.position,c=void 0===a?0:a,d=e.slidesToShow,u=void 0===d?3:d,p=e.responsive,m=void 0===p?[]:p;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),t&&n||console.warn('Carousel-slider error: lost properties: "main" or "wrap"'),this.main=document.querySelector(t),this.wrap=document.querySelector(n),this.slides=document.querySelector(n).children,this.next=document.querySelector(r),this.prev=document.querySelector(i),this.slidesToShow=u,this.options={position:c,infinity:l,widthSlide:Math.floor(100/this.slidesToShow)},this.responsive=m}var r,i;return r=o,(i=[{key:"init",value:function(){this.addCarouselClass(),this.addStyles(),this.prev&&this.next||this.addArrow(),this.controlSlider(),this.responsive&&this.responseInit()}},{key:"addCarouselClass",value:function(){this.main.classList.add("carousel-slider"),this.wrap.classList.add("carousel-slider__wrap");var t,n=function(t,n){var o;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(o=e(t))){o&&(t=o);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,l=!0,a=!1;return{s:function(){o=t[Symbol.iterator]()},n:function(){var e=o.next();return l=e.done,e},e:function(e){a=!0,s=e},f:function(){try{l||null==o.return||o.return()}finally{if(a)throw s}}}}(this.slides);try{for(n.s();!(t=n.n()).done;)t.value.classList.add("carousel-slider__slide")}catch(e){n.e(e)}finally{n.f()}}},{key:"addStyles",value:function(){var e=document.getElementById("sliderCarousel-style");e||((e=document.createElement("style")).id="sliderCarousel-style"),e.textContent="\n\n                .carousel-slider {\n                    position: relative;\n                    overflow: hidden;\n                }\n\n                .carousel-slider__wrap {\n                    display: flex;\n                    transition: transform 0.5s;\n                    will-change: transform;\n                }\n\n                .carousel-slider__slide {\n                    flex: 0 0 ".concat(this.options.widthSlide,"%;\n                    margin: auto 0;\n                }\n\n            "),document.head.appendChild(e)}},{key:"controlSlider",value:function(){this.prev.addEventListener("click",this.prevSlider.bind(this)),this.next.addEventListener("click",this.nextSlider.bind(this))}},{key:"prevSlider",value:function(){(this.options.infinity||this.options.position>0)&&(--this.options.position,this.options.position<0&&(this.options.position=this.slides.length-this.slidesToShow),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"nextSlider",value:function(){(this.options.infinity||this.options.position<this.slides.length-this.slidesToShow)&&(++this.options.position,this.options.position>this.slides.length-this.slidesToShow&&(this.options.position=0),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"addArrow",value:function(){this.prev=document.createElement("button"),this.next=document.createElement("button"),this.prev.textContent="<",this.next.textContent=">",this.prev.style.cssText="position: absolute;\n                                    top: 0;\n                                    bottom: 0;\n                                    margin: auto 0;\n                                    left: 0;\n                                    display: block;\n                                    width: 35px;\n                                    height: 35px;\n                                    background-color: #ffd11a;\n                                    border-radius: 50px;\n                                    color: #000000;\n                                    border: none;\n                                    font-size: 20px;",this.next.style.cssText="position: absolute;\n                                    top: 0;\n                                    bottom: 0;\n                                    margin: auto 0;\n                                    right: 0;\n                                    display: block;\n                                    width: 35px;\n                                    height: 35px;\n                                    background-color: #ffd11a;\n                                    border-radius: 50px;\n                                    color: #000000;\n                                    border: none;\n                                    font-size: 20px;",this.prev.className="carousel-slider__prev",this.next.className="carousel-slider__next",this.main.appendChild(this.prev),this.main.appendChild(this.next)}},{key:"responseInit",value:function(){var n,o=this,r=this.slidesToShow,i=this.responsive.map((function(e){return e.breakpoint})),s=Math.max.apply(Math,function(e){if(Array.isArray(e))return t(e)}(n=i)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(n)||e(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=function(){var e=document.documentElement.clientWidth;if(e<s)for(var t=0;t<i.length;t++)e<i[t]&&(o.slidesToShow=o.responsive[t].slideToShow,o.options.widthSlide=Math.floor(100/o.slidesToShow),o.addStyles());else o.slidesToShow=r,o.options.widthSlide=Math.floor(100/o.slidesToShow),o.addStyles()};l(),window.addEventListener("resize",l)}}])&&n(r.prototype,i),o}())({main:"#services .wrapper",wrap:".services-slider",slidesToShow:4,infinity:!0,responsive:[{breakpoint:1024,slideToShow:3},{breakpoint:768,slideToShow:2},{breakpoint:576,slideToShow:1}]}).init(),function(){var e,t,n,o,r,i,s=document.querySelector(".gallery-bg .wrapper"),l=s.querySelector(".gallery-slider"),a=s.querySelectorAll(".slide"),c=0;(o=document.createElement("style")).id="photoSliderStyles",o.textContent="\n            \n            .gallery-slider {\n                position: relative;\n            }\n\n            .gallery-slider .slide {\n                display: none;\n            }\n\n            .gallery-slider .slide-active {\n                display: block;\n            }\n\n            .dot-container {\n                position: absolute;\n                bottom: 20px;\n                left: 0;\n                right: 0;\n                margin: auto;\n                display: flex;\n                flex-direction: row;\n                justify-content: center;\n            }\n\n            .arrow {\n                position: absolute;\n                margin: auto 0;\n                top: 0;\n                bottom: 0;\n                width: 30px;\n                height: 30px;\n                border: none;\n                border-radius: 30px;\n                background-color: #ffd11a;\n                font-size: 20px;\n            }\n\n            #leftArrow {\n                left: 40px;\n            }\n\n            #rightArrow {\n                right: 40px;\n            }\n\n            .dot {\n                width: 30px;\n                height: 10px;\n                background-color: #fff;\n                margin-right: 5px;\n                cursor: pointer;\n            }\n\n            .dot-active {\n                background-color: #ffd11a;\n            }\n\n        ",document.head.append(o),r=document.createElement("button"),i=document.createElement("button"),r.textContent="<",i.textContent=">",r.classList.add("arrow"),i.classList.add("arrow"),r.id="leftArrow",i.id="rightArrow",l.append(r),l.append(i),function(){t||((t=document.createElement("div")).classList.add("dot-container"),l.append(t));for(var e=0;e<a.length;e++){var o=document.createElement("div");o.classList.add("dot"),t.append(o)}(n=document.querySelectorAll(".dot"))[0].classList.add("dot-active"),a[0].classList.add("slide-active")}();var d=function(e,t,n){e[t].classList.remove(n)},u=function(e,t,n){e[t].classList.add(n)},p=function(){d(a,c,"slide-active"),d(n,c,"dot-active"),++c>=a.length&&(c=0),u(a,c,"slide-active"),u(n,c,"dot-active")},m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;e=setInterval(p,t)};l.addEventListener("click",(function(e){e.preventDefault();var t=e.target;t.matches(".arrow, .dot")&&(d(a,c,"slide-active"),d(n,c,"dot-active"),t.matches("#rightArrow")?c++:t.matches("#leftArrow")?c--:t.matches(".dot")&&n.forEach((function(e,n){e===t&&(c=n)})),c>=a.length&&(c=0),c<0&&(c=a.length-1),u(a,c,"slide-active"),u(n,c,"dot-active"))})),l.addEventListener("mouseover",(function(t){(t.target.matches(".arrow")||t.target.matches(".dot"))&&clearInterval(e)})),l.addEventListener("mouseout",(function(e){(e.target.matches(".arrow")||e.target.matches(".dot"))&&m(1500)})),m(1500)}(),m=document.getElementById("card_order"),y=function(){var e,t,n=document.querySelectorAll(".club"),o=m.querySelector(".time").querySelectorAll("input"),r=m.querySelector(".price-message"),i=document.getElementById("price-total"),s=r.querySelector("input"),l={mozaika:{1:2999,6:14990,9:21990,12:24990},schelkovo:{1:1999,6:9900,9:13900,12:19900}};o.forEach((function(t){return!!t.checked&&(e=t.value)})),n.forEach((function(e){return!!e.querySelector("input").checked&&(t=e.querySelector("input").value)})),"ТЕЛО2020"===s.value?i.textContent=Math.floor(+l[t][e]-.3*+l[t][e]):i.textContent=l[t][e]},m.addEventListener("input",(function(e){(e.target.matches('[name="card-type"]')||e.target.matches('[name="club-name"]'))&&document.querySelector("#card_order").querySelector(".club")&&y()})),m.querySelector(".price-message")&&m.querySelector(".price-message").querySelector("input").addEventListener("blur",y),h=document.querySelector(".top-menu .hidden-large"),document.addEventListener("resize",(function(){var e=document.documentElement.clientWidth;e<=768?h.style.display="block":e>768&&(h.style.display="none")})),function(){var e=document.querySelector(".top-menu"),t=document.querySelector(".top-menu .hidden-large");document.addEventListener("scroll",(function(){"block"===getComputedStyle(t).getPropertyValue("display")&&(pageYOffset>=240?e.style.position="fixed":pageYOffset<240&&(e.style.position="static"))}))}(),document.addEventListener("click",(function(e){e.target.closest(".top-menu .hidden-large")?document.querySelector(".popup-menu").style.display="flex":(e.target.closest(".scroll")||e.target.closest(".close-menu-btn"))&&(document.querySelector(".popup-menu").style.display="none")})),(f=document.getElementById("totop")).style.display="none",document.addEventListener("scroll",(function(){pageYOffset>=740?f.style.display="block":pageYOffset<740&&(f.style.display="none")})),document.body.addEventListener("click",(function(e){var t=e.target,n=e.target.closest("a");if(!(t.matches("button")||t.classList.contains("close-btn")||t.closest("form")||n&&"."===n.getAttribute("href")[0]))if(e.preventDefault(),n&&"#"===n.getAttribute("href")[0]&&n.getAttribute("href").length>2){var o=n.getAttribute("href").substring(1);document.getElementById(o).scrollIntoView({behavior:"smooth",block:"start"})}else n&&"totop"===n.id&&document.body.scrollIntoView({behavior:"smooth",block:"start"})}))})();