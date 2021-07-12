$(document).ready(function(){



let el = document.querySelector('.reco-texts__container')
let el2 = document.querySelector('.reco-texts__1')


function comentario_1 (){
    el.style.height = '21.875rem'
    // setTimeout(() => {el2.innerHTML = comentario_2() }, 15000);
    return `<div class="reco-texts__1">
    <p>Este pequeño presente tiene como objetivo agradecerles todo lo que hicieron (y aún siguen haciendo) por nuestro proyecto.</p>
    <p>Sinceramente desde la primera reunión y hasta ahora sentimos que todo lo que hicimos asociado a la casa ha sido espectacular, hemos “vivido” el proyecto de la forma en que los soñamos como un verdadero proyecto de vida. Y en ese sentimiento tienen mucho que ver ustedes y la forma en que trabajan.</p>
    <p>De nuevo, Muchas gracias!!!</p>
    <span><b>Juan José Sobrino</b></span>
    <div class="reco-texts__line"></div>
</div>` 
}

function comentario_2() {
    el.style.height = '11.25rem'
    // setTimeout(() => {el2.innerHTML = comentario_1() }, 15000);
    return `<div class="reco-texts__2">
    <p>Contratamos a Llacay Arquitectos para desarrollar el proyecto de nuestra casa. Quedamos plenamente satisfechos con el proceso y resultado. Lo recomendamos fuertemente a nuestros amigos...</p>
    <span><b>Marcelo Queijo</b></span>
    <div class="reco-texts__line"></div>
</div>`
}

function comentario_3() {
    el.style.height = '12.75rem'
    // setTimeout(() => {el2.innerHTML = comentario_1() }, 15000);
    return `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ea aperiam, nisi necessitatibus, non, possimus molestiae nihil rerum iure quaerat sed ipsam quam ad sit harum atque iusto. Dolores, consectetur!</p>
    <span><b>Ipsum Dolor</b></span><div class="reco-texts__line"></div>`
}



el2.innerHTML = comentario_1()
el.style.height = '21.875rem'

const debounce = (fn, delay) => {
    let timer
    return function(){
        clearTimeout(timer)
         timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

let manejoViewport = () => {
             
    var scroll = $(window).scrollTop();
    console.log(scroll);
    if (scroll <= 400) {
        el2.innerHTML = comentario_1()
    };
    
    if (scroll > 400) {
        el2.innerHTML = comentario_2()
    };

    if (scroll >= 800) {
        el2.innerHTML = comentario_3()
    };

};

manejoViewport = debounce(manejoViewport, 300)

window.addEventListener('scroll', manejoViewport)

})

