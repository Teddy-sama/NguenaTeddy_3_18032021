// On récupère le conteneur principal du diaporama
const diaporama = document.querySelector(".diaporama")

// On récupère le conteneur de tous les éléments
diapos = document.querySelector(".diapos")

// On récupère un tableau contenant la liste des diapos
slides = Array.from(diapos.children)

// On récupère les deux flèches
let next = document.querySelector("#nav-droite")
let prev = document.querySelector("#nav-gauche")

// Variables globales
let compteur = 0 // Compteur qui permettra de savoir sur quelle slide nous sommes
let timer, diapos, slides, slideWidth

// On calcule la largeur visible du diaporama
slideWidth = diaporama.getBoundingClientRect().width

// On met en place les écouteurs d'évènements sur les flèches
next.addEventListener("click", slideNext)
prev.addEventListener("click", slidePrev)




/**
 * Cette fonction fait défiler le diaporama vers la droite
 */
function slideNext(){
    // On incrémente le compteur
    compteur++

    // Si on dépasse la fin du diaporama, on "rembobine"
    if(compteur == slides.length){
        compteur = 0
    }

    // On calcule la valeur du décalage
    let decal = -slideWidth * compteur
    diapos.style.transform = `translateX(${decal}px)`
}

/**
 * Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev(){
    // On décrémente le compteur
    compteur--

    // Si on dépasse le début du diaporama, on repart à la fin
    if(compteur < 0){
        compteur = slides.length - 1
    }

    // On calcule la valeur du décalage
    let decal = -slideWidth * compteur
    diapos.style.transform = `translateX(${decal}px)`
}


// Automatiser le diaporama
timer = setInterval(slideNext, 4000)


// Gérer le survol de la souris
diaporama.addEventListener("mouseover", stopTimer)
diaporama.addEventListener("mouseout", startTimer)

/**
 * On stoppe le défilement
 */
function stopTimer(){
    clearInterval(timer)
}

/**
 * On redémarre le défilement
 */
function startTimer(){
    timer = setInterval(slideNext, 4000)
}


// Mise en oeuvre du "responsive"
window.addEventListener("resize", () => {
    slideWidth = diaporama.getBoundingClientRect().width
    slideNext()
})