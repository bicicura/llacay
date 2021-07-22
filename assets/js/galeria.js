console.log('cargado!')

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

rowAppear()