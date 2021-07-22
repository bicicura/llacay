$(document).ready(function(){


let el = document.querySelector('.reco-texts__container')
let el2 = document.querySelector('.reco-texts__1')

let display1 = ''
let display2 = ''
let display3 = ''

setInterval(
    function () {
        if (display1) {
            console.log('pasaron 15 en reco1')
            comentario_2()    
        } else if (display2) {
            console.log('pasaron 15 en reco2')
            comentario_3()    
        }
        else if (display3) {
            console.log('pasaron 15 en reco3')
            comentario_1()    
        }
    }
    
    , 
    15000 // every 15 seconds
  );


function comentario_1 (){
    if (display1) return
    else {
    el.style.height = '21.875rem'
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
    if (display2) return
    else {
        el.style.height = '11.25rem'
        return [el2.innerHTML = `<div class="reco-texts__2">
        <p>Contratamos a Llacay Arquitectos para desarrollar el proyecto de nuestra casa. Quedamos plenamente satisfechos con el proceso y resultado. Lo recomendamos fuertemente a nuestros amigos...</p>
        <span><b>Marcelo Queijo</b></span>
        <div class="reco-texts__line"></div>
    </div>`, display1 = false, display3 = false, display2 = true]
    }
}

function comentario_3() {
    if (display3) return
    else {
        el.style.height = '12.75rem'
        return [el2.innerHTML = `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ea aperiam, nisi necessitatibus, non, possimus molestiae nihil rerum iure quaerat sed ipsam quam ad sit harum atque iusto. Dolores, consectetur!</p>
        <span><b>Ipsum Dolor</b></span><div class="reco-texts__line"></div>`, display3, display1 = false, display2 = false]
    }
}




comentario_1()
display1 = true

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
    if (scroll < 99) {
        comentario_1()
        display1 = true
        display2 = false
        display3 = false
        
    };
    
    if (scroll >= 100) {
        comentario_2()
        display1 = false
        display2 = true
        display3 = false
        
    };

    if (scroll >= 200) {
        comentario_3()
        display1 = false
        display2 = false
        display3 = true
        let comentario3 = comentario_3[1]
        console.log(comentario3)
    };

};

manejoViewport = debounce(manejoViewport, 300)

window.addEventListener('scroll', manejoViewport)
})

