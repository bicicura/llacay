   // ANIM

   function appearFunc() {
    const faders = document.querySelectorAll('.fade-in');
    const sliders = document.querySelectorAll('.slide-in');
const appearOptions = {
threshold: 0,
rootMargin: "0px 0px 0px 0px"
}


const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
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
appearOnScroll.observe(fader);
})

sliders.forEach(slider => {
appearOnScroll.observe(slider)
})
}

// HTML DINAMICO

let soyContacto = document.getElementById("soyContacto")
let soyRecos = document.getElementById("soyRecos")
let movidaDinamica = document.getElementById("movidaDinamica")

soyContacto.addEventListener('click', (ev) => {
    movidaDinamica.innerHTML = vista_contacto()
    appearFunc()
} )

soyRecos.addEventListener('click', (ev) => {
    movidaDinamica.innerHTML = vista_recomendaciones()
    appearFunc()
} )

function vista_contacto (titulo){
    return `<link rel="stylesheet" href="/assets/css/contact.css"><main class="main-container flex col fade-in from-left">
    <div class="contact-bg"></div>

    <div class="top-lines__cont">
        <div class="top-lines__left"></div>
        <div class="top-text__center flex">
            <div class="logo-container">
                <div class="logo"></div>
                <h2 class="logo-text">LLACAY ARQ</h2>
            </div>
        </div>
        <div class="top-lines__right"></div>
    </div>

    <div class="center-container split container">

        <div class="center-menu__container">
            <nav>
                <ul class="nav-list">
                    <li>GALERIA DE FOTOS</li>
                    <li>LO QUE NOS INSPIRA</li>
                    <li>RECOMENDACIONES</li>
                    <li>CONTACTO</li>
                </ul>
            </nav>
        </div>

        <div class="center-title__container">
            <div class="contact-container split">
                
                <div class="contact-text">
                    <p class="contact-text-small">Queremos saber en qu?? podemos ayudarte</p>
                    <p>llacay@gmail.com</p>
                    <p>+54 911 5584 6274</p>
                    <div class="contact-socialicon__container">
                        <i class="social-icon"><svg aria-hidden="true" focusable="false" style="width:20px" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></i>
                        <i class="social-icon"><svg aria-hidden="true" focusable="false" style="width:20px" data-prefix="fab" data-icon="facebook-square" class="svg-inline--fa fa-facebook-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path></svg></i>
                    </div></div>

                <h2 class="contact-title">Contact??nos</h2>

                <form class="contact-form flex col" action="">
                    <div class="contact-input__cont">
                        <input class="contact-input" type=""><label class="contact-label" for="">Nombre y apellido</label>
                    </div>
                    <div class="contact-input__cont">
                        <input class="contact-input" type=""><label class="contact-label" for="">Nombre y apellido</label>
                    </div>
                    <div class="contact-input__cont">
                        <input class="contact-input" type=""><label class="contact-label" for="">Nombre y apellido</label>
                    </div>
                        <div class="contact-btn__container"><button>Env??ar consulta</button></div>
                    </div>
                </form>
            </div>

        </div>

    </div>


    <div class="bottom-lines__cont"></div>
</main>`
}

function vista_recomendaciones(titulo2) {
    return `    <link rel="stylesheet" href="assets/css/recos.css">   <main class="main-container flex col fade-in from-bottom">

    <div class="top-lines__cont">
        <div class="top-lines__left"></div>
        <div class="top-text__center flex">
            <div class="logo-container">
                <div class="logo"></div>
                <h2 class="logo-text">LLACAY ARQ</h2>
            </div>
        </div>
        <div class="top-lines__right"></div>
    </div>

    <div class="center-container split container">

        <div class="center-menu__container">
            <nav>
                <ul class="nav-list">
                    <li>GALERIA DE FOTOS</li>
                    <li>LO QUE NOS INSPIRA</li>
                    <li>RECOMENDACIONES</li>
                    <li>CONTACTO</li>
                </ul>
            </nav>
        </div>

        <div class="center-title__container">
            <div class="reco-texts__container">
                <div class="reco-texts__1">
                    <p>Este peque??o presente tiene como objetivo agradecerles todo lo que hicieron (y a??n siguen haciendo) por nuestro proyecto.</p>
                    <p>Sinceramente desde la primera reuni??n y hasta ahora sentimos que todo lo que hicimos asociado a la casa ha sido espectacular, hemos ???vivido??? el proyecto de la forma en que los so??amos como un verdadero proyecto de vida. Y en ese sentimiento tienen mucho que ver ustedes y la forma en que trabajan.</p>
                    <p>De nuevo, Muchas gracias!!!</p>
                    <span><b>Juan Jos?? Sobrino</b></span>
                </div>
            </div>
        </div>

        <div class="center-social-container flex col">
            <i class="social-icon"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></i>
            <i class="social-icon"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" class="svg-inline--fa fa-facebook-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path></svg></i>
        </div>

    </div>


    <div class="bottom-lines__cont"></div>
</main>`
}

// OWL Carousel INDEX
        $('.owl-carousel').owlCarousel({
    loop:true,
    animateOut: 'fadeOut',
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