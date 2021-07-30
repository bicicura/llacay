// Nota: Todo el contenido dinamico de la web se pone inserta en el elemento de html MAIN


// ============================================================
// ajax() trae el contenido de las vistas de distintos archivos
// ============================================================

const ajax = (metodo, url, elemento) => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', ev => {
        if(xhr.status == 200) {  
            //si entra aca es porque la petición fue un exito y pone el archivo correcto adentro del MAIN
            elemento.innerHTML = xhr.response
        }
        
    })

    xhr.open(metodo, url)

    xhr.send()

}



// =================================================
// Esperar a que cargue nuevo html y cargar nuevo js 
// =================================================

var waitUntil = function (fn, condition, interval) {
    interval = interval || 100;

    var shell = function () {
            var timer = setInterval(
                function () {
                    var check;

                    try { check = !!(condition()); } catch (e) { check = false; }

                    if (check) {
                        clearInterval(timer);
                        delete timer;
                        fn();
                    }
                },
                interval
            );
        };

    return shell;
};

// ============================================================
// Si el window no tiene una ruta, redirije a la home con ajax()
// ============================================================

const main = document.querySelector("main")
ajax('GET', 'home.html', main)

// ===============================================================================================================
// clasesLinks() hace que se le asigne al link correcto la clase activa (cuando navegas con clickeando el nav bar)
// ===============================================================================================================

const clasesLinks = link => {
    const links = link.parentNode.parentNode.children
    for (let i = 0; i < links.length; i++) {
        
        for (let j = 0; j < links[i].children.length; j++) {
        const el = links[i].children[j]
        el.classList.remove('active')      
        }
    }

    link.classList.add('active')
}



// =============================================================================================
// Esta iteracion de LINKS se dispara con el evento CLICK. Busca en la
// función AJAX la vista correcta y le asigna con clasesLinks() la clase activa al link adecuado
// =============================================================================================

const links = document.querySelectorAll('.nav-a')

links.forEach( link => {
    link.addEventListener('click', ev => {
        ev.stopPropagation()
        ev.preventDefault()

        // Este setTimeout es para las transiciones, no se borra la vista anterior al toque de entrar a una nueva, sino que deja que el fade out lo tape antes de borrarse
        setTimeout(() => {
            ajax('GET', ev.target.href, main)
                }, 1000);

        clasesLinks(ev.target)

        // PushState
        const estado = ev.target.getAttribute('data-menu')
        history.pushState(estado, null, estado)

        menuRestart()

        // Cheque en que vista está, para hacer las transiciones y traer el js que necesita
        checkInspiracion()
        checkGaleria()
        checkContacto()
        checkRecos()
    }) 

    
} )


// ===================================================================
// La funcion de abajo la declare para usarla en popStateActiveLink
// Hace que a todos los botones del NAV se le remueva la clase ACTIVA
// ===================================================================

function removeActive() {
    links.forEach( link => {
        link.classList.remove('active')  
} )
}


// =================================================================================
// La funcion de abajo hace que se le asigne la clase activa al menu que corresponde 
// (cuando navegas con los botones para atras o para adelante del navegador)
// =================================================================================

function popStateActiveLink() {
    
    for (i = 0; i < links.length; i++) {
        if (window.location.pathname.includes(links[i].getAttribute('data-menu'))) {
            removeActive()
            links[i].classList.add('active')
        }
    }    
}


// ===============================================================================================================
// La funcion de abajo hace que cuando toques el boton de ATRAS o ADELANTE del navegador, cargue la vista correcta
// ===============================================================================================================

window.addEventListener("popstate", ev => {

    const url = history.state+'.html'

    // Cheque en que vista está, para hacer las transiciones y traer el js que necesita
    checkContacto()
    checkInspiracion()
    checkGaleria()
    checkRecos()

    ajax("GET", url, main)
    popStateActiveLink()
})


// ===================================================================================
// Abajo se seleccionan de todos los items del header (para usar en futuras funciones)
// ===================================================================================

const logoContainer = document.querySelector('.logo-container')
const topLinesLeft = document.querySelector('.top-lines__left')
const topLinesRight = document.querySelector('.top-lines__right')
const bottomLineLeft = document.querySelector('.bottom-lines__left')
const bottomLineRight = document.querySelector('.bottom-lines__right')


// ====================================================================
// menuRestart() reinicia para que aparezcan las lineas del menu y logo
// ====================================================================

function menuRestart() {
    topLinesLeft.classList.remove('fade-in')
    logoContainer.classList.remove('fade-in')
    topLinesRight.classList.remove('fade-in')
    bottomLineLeft.classList.remove('fade-in')
    bottomLineRight.classList.remove('fade-in')
}



// ============================================
// rowAppear() aparecen las imagenes de GALERIA 
// ============================================

function rowAppear() {
        const gallery = document.querySelectorAll('.gallery-cols__container div div')
        for(i = 0; i < gallery.length; i++) {
            gallery[i].classList.remove('fade-out')
            gallery[i].classList.add('fade-in')
        }
}


function linesAppear() {
    topLinesLeft.classList.add('fade-in')
    topLinesRight.classList.add('fade-in')
    bottomLineLeft.classList.add('fade-in')
    bottomLineRight.classList.add('fade-in')
    setTimeout(() => {
        logoContainer.classList.add('fade-in')
    }, 2000);
}

function linesdisAppear() {
    logoContainer.classList.add('disappear')
    topLinesLeft.classList.add('disappear')
    topLinesRight.classList.add('disappear')
    bottomLineLeft.classList.add('disappear')
    bottomLineRight.classList.add('disappear')
}

function removeDisappear() {
    topLinesLeft.classList.remove('disappear')
    topLinesRight.classList.remove('disappear')
    bottomLineLeft.classList.remove('disappear')
    bottomLineRight.classList.remove('disappear')
    logoContainer.classList.remove('disappear')
}

const bgMaskTransition = document.querySelector('.bg-mask-transition')


// ===================================================
// Cortina de transiciones (fadea lo anterior a negro) 
// ===================================================

const cortinaTransition = document.querySelector('.cortina')

function cortinaFadeIn() {
    cortinaTransition.classList.remove('fade-out')
    cortinaTransition.classList.add('fade-in')
    setTimeout(() => { window.scrollTo(0, 0) }, 800);
    
}

function cortinaFadeOut() {
    cortinaTransition.classList.remove('fade-in')
    cortinaTransition.classList.add('fade-out')
}



// ===========================================
// Transición de cualquier vista a INSPIRACION 
// ===========================================

const inspiracionBg = document.querySelector('.inspiracion-transition')

function inspiracionBgTransition() {
    if (window.location.pathname.includes("inspiracion-spa")) {
        cortinaFadeIn()

        setTimeout(() => {
            cortinaFadeOut()
            inspiracionBg.classList.remove('to-back')
            bgMaskTransition.classList.remove('to-back')
            bgMaskTransition.classList.remove('fade-out')
            inspiracionBg.classList.remove('fade-out')
            inspiracionBg.classList.add('fade-in')
            bgMaskTransition.classList.add('fade-in')
        }, 1400)

        setTimeout(() => {
            const inspiracionMainText = document.querySelector('.inspiracion-mainText__container')
            const bannerArrow = document.querySelector('.banner__arrow')
            inspiracionBg.classList.add('to-back')
            bgMaskTransition.classList.add('to-back')
            inspiracionMainText.classList.add('fade-in')
            bannerArrow.classList.add('fade-in')
            flechaScroll()
        }, 2400)

        inspiracionAnimScroll()
    }
}

function inspiracionBgTransitionReset() {
    bgMaskTransition.classList.remove('fade-out-scroll')
    bgMaskTransition.classList.remove('fade-in')
    inspiracionBg.classList.remove('fade-in')
    bgMaskTransition.classList.add('fade-out')
    inspiracionBg.classList.add('fade-out')
}

function flechaScroll() {
    $(".banner__arrow").click(function() {
        $('html,body').animate({
            scrollTop: $(".inspiracion-img-cont").offset().top},
            'slow');
      });
}

// ===================
// Transición Contacto
// ===================

const contactoBg = document.querySelector('.contacto-transition')

function contactoBgTransition() {
    if (window.location.pathname.includes("contacto")) {
        cortinaFadeIn()
        
        setTimeout(() => {
            cortinaFadeOut()
            contactoBg.classList.remove('to-back')
            bgMaskTransition.classList.remove('to-back')
            bgMaskTransition.classList.remove('fade-out')
            contactoBg.classList.remove('fade-out')
            contactoBg.classList.add('fade-in')
            bgMaskTransition.classList.add('fade-in')
        }, 1400)


        setTimeout(() => {
            contactoBg.classList.add('to-back')
            bgMaskTransition.classList.add('to-back')
            contactoFormAppear()
        }, 2400)
    }
}

function contactoBgTransitionReset() {
    bgMaskTransition.classList.remove('fade-in')
    contactoBg.classList.remove('fade-in')
    bgMaskTransition.classList.add('fade-out')
    contactoBg.classList.add('fade-out')
}

function contactoFormAppear() {
    contactContainer = document.querySelector('.contact-container')
    contactTitle = contactContainer.children[1]
    contactText = contactContainer.children[0]
    contactSocial = contactText.children[3]
    contactForm = contactContainer.children[2]
    contactInputs = contactForm.children[1] 

    contactContainer.classList.add('fade-in')
    contactTitle.classList.add('fade-in')
    contactText.classList.add('fade-in')
    contactSocial.classList.add('fade-in')
    contactForm.classList.add('fade-in')
    
    for (i= 0; i < contactForm.children.length; i++) {
        contactForm.children[i].classList.add('fade-in')
    }
}

// ================
// Transición Recos
// ================



const recosBg = document.querySelector('.recos-transition')

function recosBgTransition() {
    if (window.location.pathname.includes("recomendaciones")) {
        cortinaFadeIn()

        setTimeout(() => {
            cortinaFadeOut()
            recosBg.classList.remove('to-back')
            bgMaskTransition.classList.remove('to-back')
            bgMaskTransition.classList.remove('fade-out')
            recosBg.classList.remove('fade-out')
            recosBg.classList.add('fade-in')
            bgMaskTransition.classList.add('fade-in')
        }, 1400)

        setTimeout(() => {   
            const recosContainer = document.querySelector('.reco-texts__container')
            recosContainer.classList.add('fade-in')
            recosBg.classList.add('to-back')
            bgMaskTransition.classList.add('to-back')

        }, 2400)
    }
}

function recosBgTransitionReset() {
    bgMaskTransition.classList.remove('fade-in')
    recosBg.classList.remove('fade-in')
    bgMaskTransition.classList.add('fade-out')
    recosBg.classList.add('fade-out')
}

// ======================================================================================
// inspiracionAnims() hace las transiciones una vez navegando la seccion de inspiraciones
// ======================================================================================

function inspiracionAnimScroll() {

    // Hace que el texto y la layer opaca se vayan y no se vuelva a repetir ese evento
    $(document).one('scroll', ev => {
        const inspiracionMainText = document.querySelector('.inspiracion-mainText__container')
        console.log('escroleaste!')
        inspiracionMainText.classList.add('fade-out')
        bgMaskTransition.classList.add('fade-out-scroll')        
    })
}



// ==========================================
// GALERIA dar color cuando entra al viewport 
// ==========================================


function galeriaColorEnViewport() {
    const faders = document.querySelectorAll('.appear-color');

    const appearOptions = {
        threshold: 0.30,
        rootMargin: "-100px 0px -200px 0px"
    }


    const appearColor = new IntersectionObserver(function(entries, appearColor) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.classList.remove('appear');
        return
        } else {
        entry.target.classList.add('appear');
        //    appearOnScroll.unobserve(entry.target);
        }
    })
    }, appearOptions);

    faders.forEach(fader => {
        appearColor.observe(fader);
    })

}



// =======================================
// Transición de cualquier vista a GALERIA 
// =======================================



function galeriaTransitionReset() {
    recosBg.classList.remove('fade-in')
    recosBg.classList.add('fade-out')
    inspiracionBg.classList.remove('fade-in')
    inspiracionBg.classList.add('fade-out')
    contactoBg.classList.remove('fade-in')
    contactoBg.classList.add('fade-out')
    bgMaskTransition.classList.remove('fade-out-scroll')
}

const galeriaBtn = document.querySelector('#gallery-spa')
const galeriaTransitionDiv = document.querySelector('.galeria-transition')

function galeriaDivFade() {
    galeriaTransitionDiv.classList.remove('fade-out')
    galeriaTransitionDiv.classList.add('fade-in')
}

function galeriaTransition() {
    galeriaDivFade()

    setTimeout(() => {
        galeriaTransitionDiv.classList.remove('fade-in')
        galeriaTransitionDiv.classList.add('fade-out')}, 1200); 
}

function galeriaBgTransitionReset() {
    bgMaskTransition.classList.remove('fade-in')
    bgMaskTransition.classList.add('fade-out')
}

// ===================================================================
// Para que carguen los JS de animaciones cuando se actualiza la vista
// ===================================================================

function checkGaleria() {
    if (window.location.pathname.includes("gallery-spa")) {
        removeDisappear()
        cortinaFadeIn()
        galeriaTransition()
        galeriaTransitionReset()
        $('.bottom-lines__active').css({'transform':'translateX(100%)'})

        setTimeout(() => {
            waitUntil(
                function () {
                  // the code you want to run here...
                  cortinaFadeOut()
                  rowAppear()
                  galeriaColorEnViewport()
                },
                function() {
                  // the code that tests here... (return true if test passes; false otherwise)
                  return !!(document.getElementById('img-fadea1').innerHTML !== '');
                },
                50 // amout to wait between checks
              )();
            }, 1500);
            
    }

    
}

function checkInspiracion() {
    if (window.location.pathname.includes("inspiracion-spa")) {
        removeDisappear()
        contactoBgTransitionReset()
        recosBgTransitionReset()
        inspiracionBgTransition()
        $('.bottom-lines__active').css({'transform':'translateX(200%)'})
    }
}

function checkRecos() {
    
    if (window.location.pathname.includes("recomendaciones")) {
        removeDisappear()
        contactoBgTransitionReset()
        inspiracionBgTransitionReset()
        recosBgTransition()
        setTimeout(() => {
            recomendacionesLogica()
            }, 1500);
            $('.bottom-lines__active').css({'transform':'translateX(300%)'})
        }
       
    }

function checkContacto() {
    if (window.location.pathname.includes("contacto-spa")) {
        // window.scrollTo(0, 0)
        removeDisappear()
        recosBgTransitionReset()
        inspiracionBgTransitionReset()
        contactoBgTransition()
        setTimeout(() => {
            $(".contact-main-container").ready(function() {
                inputsDinamicos()
            })
        }, 2000);     
            
    $('.bottom-lines__active').css({'transform':'translateX(400%)'})

            }
}

// ==================
// Inputs de CONTACTO
// ==================

function inputsDinamicos() {
    $('.inputes').focusin(function(){
        $("label[for="+$(this).attr("id")+"]").css({'transform':'scale(1) translate(0)','color':'white'})
    })

    $('.inputes').focusout(function(){
        if($(this).val()==""){
        $("label[for="+$(this).attr("id")+"]").css({'transform':'translate(20% , 160%) scale(1.4)','color':'white'})
        } 
    })
}


// ==============
// CAROUSEL INDEX
// ==============

function carouselIndex() {
    $('.owl-carousel').owlCarousel({
        loop:true,
        // animateOut: 'fadeOut',
        slideSpeed: 500,
        margin:0,
        autoplay: true,
        autoplayTimeout:5000,
        nav:false,
        dots: false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
}

setTimeout(() => {
    carouselIndex()
}, 1000); 

// ==================
// Recomendaciones JS
// ==================

function recomendacionesLogica() {

    let el = document.querySelector('.reco-texts__container')
    let el2 = document.querySelector('.reco-texts__1')
    let display1 = ''
    let display2 = ''
    let display3 = ''
    let intervalID = null;

    //  ===========================================================
    //  Acá arrancan el timer cada 15 segundos cambia el comentario
    //  ===========================================================
    
    function intervalManager(flag, animate, time) {
       if(flag)
         intervalID =  setInterval(animate, time);
       else
         clearInterval(intervalID);
    }
    
    function cada15sCambio() {
        if (display1) {
            console.log('pasaron 15 en reco1')
            comentario_2 ()
        } else if (display2) {
            console.log('pasaron 15 en reco2')
            comentario_3 ()
        }
        else {
            console.log('pasaron 15 en reco3')
            comentario_1 ()
        }
    }
    

//  ===========================================================================================================
//  Detecta si el browser es mobile, sirve para asignar la altura correcta al contendor en dispositivos mobiles
//  ===========================================================================================================

    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };


//  ==============================================
//  Acá arrancan la declaracion de cada comentario
//  ==============================================
    
    function comentario_1 (){ 
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
        }

        if (display1) return
        else {
            if (window.mobileCheck()) {
                el.style.height = '30.5rem'
                } 
            else {
                el.style.height = '21.875rem'
                }
        return [el2.innerHTML = `<div class="reco-texts__1">
            <p>Este pequeño presente tiene como objetivo agradecerles todo lo que hicieron (y aún siguen haciendo) por nuestro proyecto.</p>
            <p>Sinceramente desde la primera reunión y hasta ahora sentimos que todo lo que hicimos asociado a la casa ha sido espectacular, hemos “vivido” el proyecto de la forma en que los soñamos como un verdadero proyecto de vida. Y en ese sentimiento tienen mucho que ver ustedes y la forma en que trabajan.</p>
            <p>De nuevo, Muchas gracias!!!</p>
            <span><b>Juan José Sobrino</b></span>
            <div class="reco-texts__line"></div>
            </div>`, display1 = true, display3 = false, display2 = false]
    }
    }
    
    function comentario_2() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
        }

        if (display2) return
        else {
            if (window.mobileCheck()) {
                el.style.height = '16.2rem'
              } 
            else {
                el.style.height = '11.25rem'
             }
        return [el2.innerHTML = `<div class="reco-texts__2">
            <p>Contratamos a Llacay Arquitectos para desarrollar el proyecto de nuestra casa. Quedamos plenamente satisfechos con el proceso y resultado. Lo recomendamos fuertemente a nuestros amigos...</p>
            <span><b>Marcelo Queijo</b></span>
            <div class="reco-texts__line"></div>
            </div>`, display1 = false, display3 = false, display2 = true]
        }
    }
    
    function comentario_3() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
        }

        if (display3) return
        else {
            if (window.mobileCheck()) {
                el.style.height = '17.5rem'
              } 
            else {
                el.style.height = '12.75rem'
            }
        return [el2.innerHTML = `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ea aperiam, nisi necessitatibus, non, possimus molestiae nihil rerum iure quaerat sed ipsam quam ad sit harum atque iusto. Dolores, consectetur!</p>
            <span><b>Ipsum Dolor</b></span><div class="reco-texts__line"></div>`, display3, display1 = false, display2 = false]
        }
    }


    //  ==============================================================
    //  changer() hace que cuando la var counter llegue a 14, 
    //  se cambia el comentario al llamar a la funcion cada15sCambio()
    //  ==============================================================
    var counter = 0;
    
    function changer(){
      if (counter >= 14){
        console.log('cambia de comentario')
        cada15sCambio()
        counter = 0;
        };
    
      counter++;
      console.log(counter + 's')
    
    };
    
    var myTimer = setInterval(changer, 1000);
    
    // Se para el timer y la barra de progreso en mouse over
    el.addEventListener("mouseover", function(){
        intervalManager(false)
        clearInterval(myTimer)
        let lineaTimer = document.querySelector('.reco-texts__line')
        lineaTimer.classList.add('pause')
    }); 
    
    // Se reanuda la barra y timer en mouse out 
    el.addEventListener("mouseout", function(){
        myTimer = setInterval(changer, 1000);
        let lineaTimer = document.querySelector('.reco-texts__line')
        lineaTimer.classList.remove('pause')
    });
    
    
    
    //  ====================================================
    //  Cuando se carga la vista, carga el primer comentario
    //  ====================================================
    comentario_1()
    display1 = true
    

    //  ============================================================
    //  Para que no se llame muchas veces al pepe a manejoViewport()
    //  ============================================================
    
    const debounce = (fn, delay) => {
        let timer
        return function(){
            clearTimeout(timer)
             timer = setTimeout(() => {
                fn()
            }, delay)
        }
    }
    
    
    
    //  ==================================
    //  Cambio de comentario con el scroll
    //  ==================================
    
    let manejoViewport = () => {

                 
        var scroll = $(window).scrollTop();
        console.log(scroll);
        if (scroll < 99) {
            clearInterval(myTimer)
            counter = 0
            myTimer = setInterval(changer, 1000);
            comentario_1()
            display1 = true
            display2 = false
            display3 = false
            
        };
        
        if (scroll >= 100) {
            clearInterval(myTimer)
            counter = 0
            myTimer = setInterval(changer, 1000);
            comentario_2()
            display1 = false
            display2 = true
            display3 = false
            
        };
    
        if (scroll >= 200) {
            clearInterval(myTimer)
            counter = 0
            myTimer = setInterval(changer, 1000);
            comentario_3()
            display1 = false
            display2 = false
            display3 = true
        };
    
    };
    
    manejoViewport = debounce(manejoViewport, 300)
    
    window.addEventListener('scroll', manejoViewport)

}


