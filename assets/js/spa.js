// Nota: Todo el contenido dinamico de la web se pone inserta en el elemento de html MAIN


// ===========================================================
// ajax() trae el contenido dinamico de los distintos archivos
// ===========================================================

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


// ============================================================
// Si el window no tiene una ruta, redirije al index con ajax()
// ============================================================

const main = document.querySelector("main")
ajax('GET', 'index-spa.html', main)


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


// =======================================================================================================
// Esta iteracion de LINKS se dispara con el evento CLICK. Busca en la
// función AJAX la vista correcta y le asigna con la función CLASES LINKS la clase activa al link adecuado
// =======================================================================================================

const links = document.querySelectorAll('.nav-a')

links.forEach( link => {
    link.addEventListener('click', ev => {
        ev.stopPropagation()
        ev.preventDefault()
        
        // ajax('GET', ev.target.href, main)

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
        if (window.location.pathname.includes(links[i].id)) {
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


// ======================================================================================
// inspiracionAnims() hace las transiciones una vez navegando la seccion de inspiraciones
// ======================================================================================

function inspiracionAnims() {
        setTimeout(() => {
        const inspiracionBg = document.querySelector('.inspiracion-bg')
        const bgMask = document.querySelector('.inspiracion-bg-mask')
        const inspiracionMainText = document.querySelector('.inspiracion-mainText__container')

        inspiracionBg.classList.add('fade-in')
        logoContainer.classList.add('fade-in')
    
        setTimeout(() => {
        inspiracionMainText.classList.add('fade-out')
        bgMask.classList.add('fade-out')
        logoContainer.classList.add('fade-in')
            }, 5000);
            }, 3000);
}


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

    setTimeout(() => {
        const gallery = document.querySelectorAll('.gallery-cols__container div div')

        

        for(i = 0; i < gallery.length; i++) {
            gallery[i].classList.remove('fade-out')
            gallery[i].classList.add('fade-in')
        }
            }, 100);
}


function linesAppear() {
    topLinesLeft.classList.add('fade-in')
    topLinesRight.classList.add('fade-in')
    bottomLineLeft.classList.add('fade-in')
    bottomLineRight.classList.add('fade-in')
}

function linesdisAppear() {
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
}



// ===========================================
// Transición de cualquier vista a INSPIRACION 
// ===========================================

const inspiracionBtn = document.querySelector('#inspiracion')
const inspiracionTransitionDiv = document.querySelector('.inspiracion-transition')


function inspiracionTransition() {
    inspiracionTransitionDiv.classList.add('fade-in')
    setTimeout(() => {inspiracionTransitionDiv.remove()}, 1200); 
    // Este remove va a tener que cambiarse ya que solo sirve para una unica vez, ya que lo borra completamente.
}

inspiracionBtn.addEventListener('click', () => {
    inspiracionTransition()
})


// =======================================
// Transición de cualquier vista a GALERIA 
// =======================================

const galeriaBtn = document.querySelector('#gallery-spa')
const galeriaTransitionDiv = document.querySelector('.galeria-transition')

function galeriaTransition() {
    galeriaTransitionDiv.classList.add('fade-in')
    setTimeout(() => {galeriaTransitionDiv.remove()}, 1200); 
}

galeriaBtn.addEventListener('click', () => {
    galeriaTransition()
})


// ===================================================================
// Para que carguen los JS de animaciones cuando se actualiza la vista
// ===================================================================

function checkGaleria() {
    
if (window.location.pathname.includes("galeria")) {
    setTimeout(() => {
        rowAppear()
        removeDisappear()
        }, 1000);

    }
}

function checkInspiracion() {
    if (window.location.pathname.includes("inspiracion")) {
        linesdisAppear()
        linesAppear()
        inspiracionAnims()
        }
}

function checkContacto() {
    setTimeout(() => {
        if (window.location.pathname.includes("contacto")) {
            $(".contact-main-container").ready(function() {
                inputsDinamicos()
            })
            
            }
    }, 2000); 
}

function checkRecos() {
    
    if (window.location.pathname.includes("recomendaciones")) {
        setTimeout(() => {
            $.getScript( "assets/js/recos.js")
            }, 1000);
    
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


// ==================
// Recomendaciones JS
// ==================




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
