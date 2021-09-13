//  IMPORTANTE
//  Detecta si el browser es mobile, sirve para asignar la altura correcta al contendor en dispositivos mobiles en recos. 
//  Tmb para asignar display none en mobile a las transiciones que no se usan, asi se evita q el user pueda scrollear a las transiciones

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
    };

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
// ajax('GET', 'home.html', main)

// if (window.location.pathname.includes('inspiracion')) {
//     ajax('GET', 'inspiracion.html', main)
// }

const links = document.querySelectorAll('.nav-a')

// ===========================================================================================================
// clasesLinks() hace que se le asigne al link correcto la clase activa (cuando navegas clickeando el nav bar)
// ===========================================================================================================

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



// ===========================================================================================================
// preventCambiarRapidoVista() hace que desde se clickea un link a otra vista, por los proximos 3s no se puede
// clickear otro. Esto previene que las transiciones se superpongan y se lageen
// ===========================================================================================================

function preventCambiarRapidoVista() {
    for (i = 0; i < links.length; i++) {
            links[i].style.pointerEvents = 'none'   
        }

    setTimeout(() => {
        for (i = 0; i < links.length; i++) {
            links[i].style.pointerEvents = 'all'   
        }
        }, 3000)
    }


   
// =============================================================================================
// Esta iteracion de LINKS se dispara con el evento CLICK. Busca en la
// función AJAX la vista correcta y le asigna con clasesLinks() la clase activa al link adecuado
// =============================================================================================

links.forEach( link => {
    link.addEventListener('click', ev => {
        ev.stopPropagation()
        ev.preventDefault()

        // Chequea que apretes un nav-a que no sea en el que ya estas. Para que no se repita la misma transicion seguida
        if (link.classList.contains('active')) {
            console.log('estas en la misma movida')
            return
        }

        preventCambiarRapidoVista()

        // Este setTimeout es para las transiciones, no se borra la vista anterior al toque de entrar a una nueva, sino que deja que el fade out lo tape antes de borrarse
        setTimeout(() => {
            ajax('GET', ev.target.href, main)
                }, 1000);

        clasesLinks(ev.target)

        // PushState
        const estado = ev.target.getAttribute('data-menu')
        history.pushState(estado, null, estado)

        menuRestart()

        if (window.mobileCheck()) {
            mobileIndexHideTransitions()
        }
        // Cheque en que vista está, para hacer las transiciones y traer el js que necesita
        checkGaleria()
        checkInspiracion()
        checkRecos()
        checkContacto()
        
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
    if (window.mobileCheck()) {
        mobileIndexHideTransitions()
    }
    checkContacto()
    checkInspiracion()
    checkGaleria()
    checkRecos()

    if (window.location.pathname === "/") {window.location.href="index.html";}

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
// el window.scrollTo(0, 0) es para q en mobile siempre q se entre a galeria vaya al principio tmb 
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

function addDisplayNoneTransitions() {
    if (!window.mobileCheck()) return
    // bgMaskTransition.classList.add('display-none')
    inspiracionBg.classList.add('display-none')
    recosBg.classList.add('display-none')
    // contactoBg.classList.add('display-none')
}

function removeDisplayNoneTransitions() {
    if (!window.mobileCheck()) return
    inspiracionBg.classList.remove('display-none')
    recosBg.classList.remove('display-none')

}



// ===========================================
// Transición de cualquier vista a INSPIRACION 
// ===========================================

const inspiracionBg = document.querySelector('.inspiracion-transition')

function inspiracionBgTransition() {
    if (window.location.pathname.includes("inspiracion")) {
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
            inspiracionAnimScroll()
        }, 2400)

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
    if (!window.mobileCheck()) {
            $(document).one('scroll', ev => {
                const inspiracionMainText = document.querySelector('.inspiracion-mainText__container')
                console.log('escroleaste!')
                inspiracionMainText.classList.add('fade-out')
                bgMaskTransition.classList.add('fade-out-scroll')
            })
        }
        else {
            $('main').one('touchend', function() {
                const inspiracionMainText = document.querySelector('.inspiracion-mainText__container')
                console.log('escroleaste en mobile!')
                inspiracionMainText.classList.add('fade-out')
                bgMaskTransition.classList.add('fade-out-scroll')
            })
        }
}



// ==========================================
// GALERIA dar color cuando entra al viewport 
// ==========================================


function galeriaColorEnViewport() {
    const faders = document.querySelectorAll('.appear-color');

    const appearOptions = {
        threshold: 0.90
        // rootMargin: "-100px 0px -200px 0px"
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

function lazyLoading() {
    const images = document.querySelectorAll("[data-src]")

    function preloadImage(img) {
        const src = img.getAttribute("data-src")
        if(!src) {
            return
        }

        img.src = src
    }

    const imgOptions = {
        threshold:0,
        margin: "0px 0px -500px 0px"
    }

    if (window.mobileCheck()) {
        if (window.location.pathname.includes("inspiracion")) {
            imgOptions.margin = "0px 0px -500px 0px"
            console.log(imgOptions.margin)
        }
        else if (window.location.pathname.includes("galeria")) {
            imgOptions.margin = "0px -500px 0px 0px"
            console.log(imgOptions.margin)
        }
    }

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            } else {
            preloadImage(entry.target)
            imgObserver.unobserve(entry.target)
        }
        })
    }, imgOptions)

    images.forEach(image => {
        imgObserver.observe(image)
    })
}



// ======================================
// MENU MOBILE se cierra al apretar un li 
// ======================================

$('.nav-a').click(function(ev) {
    if (!window.mobileCheck()) return
    else {
        $('#menuToggle input').trigger('click')
    }
})



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


// ACA ARRANCA PARA HACER TAPAR EN MOBILE EN INDEX Y CONTACTO LAS TRANSICIONES DE ABAJO

function mobileIndexHideTransitions() {
    if (!window.mobileCheck()) return
    else{
        if (!window.location.pathname.includes("inspiracion") &&
        !window.location.pathname.includes("contacto") &&
        !window.location.pathname.includes("galeria") &&
        !window.location.pathname.includes("recomendaciones")
        ) {
                bgMaskTransition.classList.add('display-none')
                inspiracionBg.classList.add('display-none')
                recosBg.classList.add('display-none')
                contactoBg.classList.add('display-none')
            } else {
                bgMaskTransition.classList.remove('display-none')
                inspiracionBg.classList.remove('display-none')
                recosBg.classList.remove('display-none')
                contactoBg.classList.remove('display-none')
            } 
        }
    }


mobileIndexHideTransitions()


// ===================================================
// Para que se fadea el footer correcto segun la vista
// ===================================================

function bottomBarFade(){
    $(".bottom-lines__dashed-recos").addClass('fade-out')
    $(".bottom-lines__active").removeClass('fade-out')
    $(".bottom-lines__active").addClass('fade-in')
    $(".bottom-lines__left, .bottom-lines__right").removeClass('fade-out')
    $(".bottom-lines__left, .bottom-lines__right").addClass('fade-in')
}

function recosBottomBarFade() {

    setTimeout(() => {
        $(".bottom-lines__left, .bottom-lines__right").removeClass('fade-in')
        $(".bottom-lines__left, .bottom-lines__right").addClass('fade-out')
        $(".bottom-lines__active").removeClass('fade-in')
        $(".bottom-lines__active").addClass('fade-out')
        $(".bottom-lines__dashed-recos").removeClass('fade-out')
        $(".bottom-lines__dashed-recos").addClass('fade-in')
    }, 1000);  


}


// ===================================================================
// Para que carguen los JS de animaciones cuando se actualiza la vista
// ===================================================================

    function galeriaCentrar() {
        let galeriaConteiner = document.body.querySelector('.gallery-content-container')
        console.log(galeriaConteiner.offsetLeft)
    }

    function checkGaleria() {
    if (window.location.pathname.includes("galeria")) {
        if (window.mobileCheck()) {
            removeDisplayNoneTransitions()
            bgMaskTransition.classList.add('display-none')
            inspiracionBg.classList.add('display-none')
            recosBg.classList.add('display-none')
            contactoBg.classList.add('display-none')
        }
        bottomBarFade()
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
                  galeriaCentrar()
                  rowAppear()
                  lazyLoading()
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
    
    if (!window.location.pathname.includes("inspiracion")) return 

    else {
        if (window.mobileCheck()) {
            removeDisplayNoneTransitions()
        }
        bottomBarFade()
        removeDisappear()
        contactoBgTransitionReset()
        recosBgTransitionReset()
        inspiracionBgTransition()
        $('.bottom-lines__active').css({'transform':'translateX(200%)'})

        setTimeout(() => {
            waitUntil(
                function () {
                  // the code you want to run here...
                  lazyLoading()
                },
                function() {
                  // the code that tests here... (return true if test passes; false otherwise)
                  return !!(document.getElementById('img-test-inspiracion').innerHTML !== '');
                },
                50 // amout to wait between checks
              )();
            }, 1500);
            
    
    }
}

function checkRecos() {
    if (!window.location.pathname.includes("recomendaciones")) return
    else {
        if (window.mobileCheck()) {
            removeDisplayNoneTransitions()
        }
        $('.bottom-lines__active').css({'transform':'translateX(300%)'})
        recosBottomBarFade()
        removeDisappear()
        contactoBgTransitionReset()
        inspiracionBgTransitionReset()
        recosBgTransition()
        setTimeout(() => {
            waitUntil(
                function () {
                  // the code you want to run here...
                  recomendacionesLogica()
                },
                function() {
                  // the code that tests here... (return true if test passes; false otherwise)
                  return !!(document.getElementById('texts_holder').innerHTML !== '');
                },
                50 // amout to wait between checks
              )();            
            }, 1500);
        }
       
    }



function checkContacto() {
    if (!window.location.pathname.includes("contacto")) return
    else {
        if (window.mobileCheck()) {
            removeDisplayNoneTransitions()
        }
        bottomBarFade()
        $(".bottom-lines__dashed-recos").addClass('fade-out')
        // window.scrollTo(0, 0)
        removeDisappear()
        recosBgTransitionReset()
        inspiracionBgTransitionReset()
        contactoBgTransition()
        setTimeout(() => {
            $(".contact-main-container").ready(function() {
                inputsDinamicos()
                if(window.mobileCheck()) {
                    addDisplayNoneTransitions()
                }
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
        $("label[for="+$(this).attr("id")+"]").css({'transform':'scale(1) translate(0, 9px)','color':'white'})
    })

    $('.inputes').focusout(function(){
        if($(this).val()==""){
        $("label[for="+$(this).attr("id")+"]").css({'transform':'translate(20% , 160%) scale(1.4)','color':'white'})
        } 
    })
}



// ==================
// Recomendaciones JS
// ==================

function recomendacionesLogica() {

    if (!window.location.pathname.includes('recomendaciones')) return

    let el = document.querySelector('.reco-texts__container')
    let el2 = document.querySelector('.reco-texts__1')
    let display1 = null
    let display2 = null
    let display3 = null
    let display4 = null
    let display5 = null
    let display6 = null
    let display7 = null
    let display8 = null
    let display9 = null
    let scrollUp = null
    let scrollDown = null

    //  ================================================================================
    //  Para que no se llame muchas veces al pedo a manejoViewport() en el evento scroll
    //  ================================================================================

    function throttle (callback, limit) {
        var waiting = false;                      
        return function () {                      
            if (!waiting) {                       
                callback.apply(this, arguments);  
                waiting = true;                   
                setTimeout(function () {          
                    waiting = false;         
                }, limit);
            }
        }
    }

    //  =============================================
    //  runScrollDown() Cambia los comentarios en el 
    //  orden correcto cuando se scrollear para abajo 
    //  o cuando pasan solos, por tiempo
    //  =============================================
    
    function runScrollDown() {
        if (display1 || display1 && scrollDown) {
            // console.log('pasaron 15 en reco1')
            comentario_2 ()
            return
        } else if (display2 || display2 && scrollDown) {
            // console.log('pasaron 15 en reco2')
            comentario_3 ()
            return
        }
        else if (display3 || display3 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_4()
            return
        }
        else if (display4 || display4 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_5()
            return
        }
        else if (display5 || display5 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_6()
            return
        }
        else if (display6 || display6 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_7()
            return
        }
        else if (display7 || display7 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_8()
            return
        }
        else if (display8 || display8 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_9()
            return
        }
        else if (display9 || display9 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_10()
            return
        }
        else if (display10 || display10 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_11()
            return
        }
        else if (display11 || display11 && scrollDown) {
            // console.log('pasaron 15 en reco3')
            comentario_1()
            return
        }
    }

    //  =============================================
    //  runScrollUp() Cambia los comentarios en el 
    //  orden correcto cuando se scrollear para arriba
    //  =============================================

    function runScrollUp() {
        if (display1 && scrollUp) {
            comentario_11() 
            return
        }
        else if (display11 && scrollUp) {
            comentario_10() 
            return
        }
        else if (display10 && scrollUp) {
            comentario_9() 
            return
        }
        else if (display9 && scrollUp) {
            comentario_8() 
            return
        }
        else if (display8 && scrollUp) {
            comentario_7() 
            return
        }
        else if (display7 && scrollUp) {
            comentario_6() 
            return
        }
        else if (display6 && scrollUp) {
            comentario_5() 
            return
        }
        else if (display5 && scrollUp) {
            comentario_4()
            return
        }
        else if (display4 && scrollUp) {
            comentario_3()
            return
        }
        else if (display3 && scrollUp) {
            comentario_2()
            return
        }
        else if (display2 && scrollUp) {
            comentario_1()
            return
        }
        
    }

    //  =========================================================
    //  arribaOabajo() llama a la funcion runScrollUp()
    //  o runScrollDown() segun si se scroleo para arriba o abajo
    //  =========================================================

    function arribaOabajo() {
            let lasScrollTop = window.pageYOffset || document.documentElement.scrollTop
            $(window).one('scroll', function() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop
                if (scrollTop > lasScrollTop) {
                    console.log('fuiste abajo')
                    scrollUp = false
                    scrollDown = true
                    runScrollDown()
                } else {
                    console.log('fuiste arriba')
                    scrollUp = true
                    scrollDown = false
                    runScrollUp()
                }
                lasScrollTop = scrollTop
            })
    }  



    //  ==============================================================
    //  changer() hace que cuando la var counter llegue a 14, 
    //  se cambia el comentario al llamar a la funcion runScrollDown()
    //  ==============================================================
    
    var counter = 0;
    
    function changer(){
        if (!window.location.pathname.includes('recomendaciones')) {
            clearInterval(myTimer)
            return
        }
        else {
            if (counter >= 14){
                console.log('cambia de comentario')
                runScrollDown()
                counter = 0;
                };
            
              counter++;
              console.log(counter + 's')
        }
    
    };
    
    var myTimer = setInterval(changer, 1000);
    


    //  ==============================================
    //  Acá arrancan la declaracion de cada comentario
    //  ==============================================

    // dashRemoveFade le saca la clase fade in a todas las lineas de abajo asi dp se le asigna a la correcta
    function dashRemoveFade() {
        let dash = document.querySelector('.bottom-lines__dashed-recos')

        for (let i = 0; i < dash.children.length; i++) {
            dash.children[i].classList.remove('fade-in')
        }
    }
    
    function comentario_1() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display1) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_1').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '16.2rem'
              } 
            else {
                el.style.height = '11.25rem'
             }
        return [el2.innerHTML = `<div class="reco-texts__2">
            <p class="no-select">Contratamos a Llacay Arquitectos para desarrollar el proyecto de nuestra casa. Quedamos plenamente satisfechos con el proceso y resultado. Lo recomendamos fuertemente a nuestros amigos...</p>
            <span class="no-select"><b>Marcelo Queijo</b></span>
            <div class="reco-texts__line"></div>
            </div>`, display1 = true, display2 = false, display3 = false, display4 = false, display5 = false, display6 = false, display7 = false, display8 = false, display9 = false, display11 = false, display10 = false]
        }
    }

    function comentario_2 (){ 
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display2) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_2').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '28rem'
                } 
            else {
                el.style.height = '18.5rem'
                }
        return [el2.innerHTML = `<div class="reco-texts__1">
            <p class="no-select">“Estas palabras tienen como objetivo agradecerles todo lo que hicieron (y aún siguen haciendo) por nuestro proyecto.</p>
            <p class="no-select">Sinceramente desde la primera reunión y hasta ahora sentimos que todo lo que hicimos asociado a la casa ha sido espectacular, hemos “vivido” el proyecto de la forma en que los soñamos como un verdadero proyecto de vida. Y en ese sentimiento tienen mucho que ver ustedes y la forma en que trabajan. Muchas gracias!”</p>
            <span class="no-select"><b>Juanjo y Gaby Sobrino</b></span>
            <div class="reco-texts__line"></div>
            </div>`, display2 = true, display3 = false, display1 = false, display6 = false, display7 = false, display8 = false, display9 = false, display10 = false, display4 = false, display11 = false, display5 = false]
    }
    }
    
    function comentario_3() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display3) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_3').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '12.5rem'
              } 
            else {
                el.style.height = '9.5rem'
            }
        return [el2.innerHTML = `<p class="no-select">"Excelente arquitecto: Profesional riguroso y dedicado. Siempre en la búsqueda de la mejor solución y el detalle más simple y estudiado.”</p>
            <span class="no-select"><b>Leonardo Tózzola</b></span><div class="reco-texts__line"></div>`, display6 = false, display9 = false, display8 = false, display3 = true, display10 = false, display1 = false, display7 = false, display2 = false, display4 = false, display11 = false, display5 = false]
        }
    }

    function comentario_4() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display4) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_4').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '17.5rem'
              } 
            else {
                el.style.height = '12.75rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Construí mi primera casa con Jorge, en la que aún vivo. No sólocumplió con los plazos y los presupuestos acordados, sino quedel plano estrictamente laboral y profesional pasamos a unplano de amistad que continúa el día de hoy.”</p>
            <span class="no-select"><b>Andrés Geringer</b></span><div class="reco-texts__line"></div>`, display6 = false, display9 = false, display8  = false, display10 = false, display4 = true, display7 = false, display5 = false, display3 = false, display1 = false, display11 = false, display2 = false]
        }
    }

    function comentario_5() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display5) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_5').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '20.5rem'
              } 
            else {
                el.style.height = '16.5rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Ante todo Jorge es un amigo. Y fue con el con quien construimos nuestra primer casa en el año 1998 y no dudamos en volver a elegirlo para nuestra actual casa en el año 2006. Diseño, profesionalismo, honestidad y largos años de experiencia, nos permiten recomendar a Jorge Llacay como de los mejores en su área.”</p>
            <span class="no-select"><b>Mariana Fabello</b></span><div class="reco-texts__line"></div>`, display4 = false, display9 = false, display8 = false, display10 = false, display3 = false, display7 = false, display1 = false, display2 = false, display6 = false, display11 = false, display5 = true]
        }
    }

    function comentario_6() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display6) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_6').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '16rem'
              } 
            else {
                el.style.height = '13rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Jorge is a very talented professional who handles a variety of projects with creativity and an eye to meeting client objectives. His unflappable demeanor is invaluable in conquering the inevitable snags and keeping projects on track.”</p>
            <span class="no-select"><b>Barbara Lanning</b></span><div class="reco-texts__line"></div>`, display4 = false, display9 = false, display3 = false, display1 = false, display10 = false, display2 = false, display5 = false, display7 = false, display8 = false, display11 = false, display6 = true]
        }
    }

    function comentario_7() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display7) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_7').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '20.5rem'
              } 
            else {
                el.style.height = '14.5rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Jorge es un excelente profesional, ingenioso y con experiencia liderando múltiples proyectos y equipo. Es parte de una nueva generación de profesionales con capacidades especiales, dedicado a ofrecer alta calidad de servicio. Es proactivo y con importantes capacidades para hacer lo difícil mas fácil...”</p>
            <span class="no-select"><b>Germán Caino Sola</b></span><div class="reco-texts__line"></div>`, display4 = false, display9 = false, display3 = false, display1 = false, display2 = false, display5 = false, display6 = false, display10 = false, display8 = false, display11 = false, display7 = true]
        }
    }

    function comentario_8() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display8) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_8').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '28.5rem'
              } 
            else {
                el.style.height = '20.5rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Envío estas líneas para hacerles llegar una forma de felicitación por el trabajo que hicieron en la construcción de nuestra casa en Campo Grande.<br>Desde el diseño simple y práctico, que ha recogido elogios de todas nuestras visitas, hasta el responsable cumplimiento de los plazos de entrega, ha sido una satisfacción para nosotros confirmar que acertamos con Ustedes para elegirlos como constructores. Les deseo mucha suerte y que sigan convocando admiradores entre los clientes...”</p>
            <span class="no-select"><b>Agustín Colombo</b></span><div class="reco-texts__line"></div>`, display4 = false, display3 = false, display1 = false, display2 = false, display5 = false, display6 = false, display7 = false, display9 = false, display11 = false, display10 = false, display8 = true]
        }
    }

    function comentario_9() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display9) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_9').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '14.5rem'
              } 
            else {
                el.style.height = '11.5rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Les deseo un muy feliz año a todos Ustedes y familia. También les agradezco la dedicación que pusieron en la obra y el trato cordial que siempre me brindaron en este proceso.”</p>
            <span class="no-select"><b>Abel Dozo Moreno</b></span><div class="reco-texts__line"></div>`, display1 = false, display2 = false, display3 = false, display4 = false, display5 = false, display6 = false, display7 = false, display8 = false, display11 = false, display9 = true, display10 = false]
        }
    }

    function comentario_10() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display10) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_10').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '25.5rem'
              } 
            else {
                el.style.height = '17.3rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Jorge es un excelente, creativo y talentoso profesional, orientado a los detalles y siempre dispuesto a superar loas expectativas de los clientes. Mantiene los proyectos en tiempo completando correctamente los objetivos y llevando el proyecto en forma eficiente. Es verdaderamente alguien en quien uno puede depositar la confianza cuando se necesita construir lo que se llama hogar. Lo recomiendo fuertemente...”</p>
            <span class="no-select"><b>Julio Daina</b></span><div class="reco-texts__line"></div>`, display1 = false, display2 = false, display3 = false, display4 = false, display5 = false, display6 = false, display7 = false, display8 = false, display9 = false, display11 = false, display10 = true]
        }
    }

    function comentario_11() {
        if (!window.location.pathname.includes("recomendaciones")) {
            clearTimeout(myTimer)
            return
        }

        if (display11) return
        else {
            dashRemoveFade()
            $('.bottom-lines__dashed_11').addClass('fade-in')
            if (window.mobileCheck()) {
                el.style.height = '23.5rem'
              } 
            else {
                el.style.height = '15.5rem'
            }
        return [el2.innerHTML = `<p class="no-select">“Jorge es un excelente profesional de una gran honestidad y calidad humana. Lo conocí a partir del emprendimiento que desarrollaron en San Isidro, complejo Stay Martinez, fui inversor en ese complejo y han finalizado un producto de primer nivel, con exquisitos detalles de buen gusto. Espero muy pronto volver a trabajar con Jorge y acompañarlo en cualquier otro proyecto que encare.”</p>
            <span class="no-select"><b>José Luis Neve</b></span><div class="reco-texts__line"></div>`, display1 = false, display2 = false, display3 = false, display4 = false, display5 = false, display6 = false, display7 = false, display8 = false, display9 = false, display10 = false, display11 = true]
        }
    }



    //  ============================================
    //  Pausar o reanudar comentario actual en hover
    //  ============================================

    function pausarEnHover() {
        clearInterval(myTimer)
        let lineaTimer = document.querySelector('.reco-texts__line')
        lineaTimer.classList.add('pause')
    }

    function reanudarEnHoverOut() {
        myTimer = setInterval(changer, 1000);
        let lineaTimer = document.querySelector('.reco-texts__line')
        lineaTimer.classList.remove('pause')
    }

    if (!window.mobileCheck()) {
        // VERSION DESKTOP
        el.addEventListener("mouseover", function(){
            pausarEnHover()
        });

        el.addEventListener("mouseout", function(){
            reanudarEnHoverOut()
        });

    } else {
        // VERSION MOBILE
        el.addEventListener("touchstart", function(ev){
            ev.stopPropagation()
            pausarEnHover()
        });

        el.addEventListener("ontouchmove", function(ev){
            ev.stopPropagation()
            pausarEnHover()
        });

        el.addEventListener("touchend", function(ev){
            ev.stopPropagation()
            reanudarEnHoverOut()
        });
    }
    
    
    //  ==========================================================
    //  Cuando se carga la vista RECOS, carga el primer comentario
    //  ==========================================================

    comentario_1()
    display1 = true
        


    //  ========================================
    //  llama a arribaOabajo() y setea counter 0 
    //  ========================================

    function prueba() {
        arribaOabajo()
        counter = 0
    }
    


    //  ==============================================
    //  Cambio de comentario con el scroll de viewport
    //  ==============================================
    
    let manejoViewport = () => {
        if (!window.location.pathname.includes('recomendaciones')) {
            clearInterval(myTimer)
            return
        }
    
    throttle(prueba(), 1000)

    };

    let manejoViewportMobile = () => {
        if (!window.location.pathname.includes('recomendaciones')) {
            clearInterval(myTimer)
            return
        }
        
    throttle(prueba(), 200)

    };



    //  ==========================================================================================
    //  El uso de throttle previene que se llame muchas veces el cambio de comentario en el scroll
    //  ==========================================================================================

    let centreDiv = document.querySelector('.center-title__container')
    
    manejoViewport = throttle(manejoViewport, 650)
    manejoViewportMobile = throttle(manejoViewportMobile, 300)

    if (!window.mobileCheck()) {
        window.addEventListener('scroll', manejoViewport)
    } else {
        centreDiv.addEventListener('touchmove', function(ev) {
            // esto es para que no se pueda cambiar de coment mientras se esta apretando la caja del comentario, tienen el mismo evento!
            if( ev.target !== this ) {
                return;
         }
         manejoViewportMobile()
        })
    }

    //  ========================================================================================
    //  cuando llegas al fondo de la pagina, te scrollea a la mitad, asi el scroll es "infinito"
    //  ========================================================================================

    window.onscroll = function(ev) {
        if (!window.location.pathname.includes('recomendaciones')) {
            return
        } else {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            window.scrollTo(0, 600)
        }
        }
    };

}


