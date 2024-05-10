
/* ici c'est mon fichier js contenant les fonctions qui vont animer mon front (c'est un fichier js spécifique au front
  donc il va falloir le linker à mon twig sur la vue main.twig, comme qd on link le js au html).
  Remarque:
  JE N'AI PAS BESOIN DE LINKER LES AUTRES FICHER JS du portfolio à ma vue , car ce sont des fichers js spécifiques au back, 
  donc pas visibles par le clients (donc pas besoin de les rendre visible en les liant aux fichiers main.twig) */

 
  //-------------------------------------FONCTIONS RELATIVES AU CAROUSSEL:

  let slideIndex = 0;
  // variable pour activer/désactiver le défilement automatique:
  let autoSlide = true; 
  
  showSlides();
  
  //fonction pour slides automatiques:
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
   
    if (autoSlide) {
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
  
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
  
      slides[slideIndex - 1].style.display = "block";
      // Change image ttes les 3 secondes
      setTimeout(showSlides, 3000); 
    }
  }
  
  // Fonction pour passer en mode manuel en désactivant le slide automatique et en appellant la fonction permettant de slider manuellement:
  function manualSlideMode(n) {
    // Désactivation:
    autoSlide= false;
    //Appelle de la fonction 
    manualSlides(slideIndex += n);
    console.log("ca marche");
  }
  
  // Fonction pour définir la diapositive actuelle
  function currentSlide(n) {
    // Désactive le défilement automatique lorsque l'utilisateur sélectionne une diapositive:
    manualSlides(slideIndex = n);    //manualSlides prend en arg la diapo à l'index "n" comme point de départ (c'est à dire la diapo en cours)
    autoSlide = false; 
  }
  //function pour slider manuellement
  function manualSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    // Masque toutes les diapositives
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    // Affiche la diapositive actuelle
    slides[slideIndex-1].style.display = "block";
  }



 
// ----------------------------FONCTION POUR FAIRE APPARAITRE/DISPARAITRE LA NAV AU SCROLL:

document.addEventListener("DOMContentLoaded", function() {
const header=document.querySelector("header")
let startScroll=0;
window.addEventListener("scroll",()=>{
  console.log(window.scrollY);
if (window.scrollY>startScroll){
  header.style.top="-90px";
}else{ header.style.top="0px";}
startScroll=scrollY;
})
});




//-----------------------------------AU CLICK , AJOUTER/RETIRER UNE CLASSE ACTIVE  (via toggle) 

//méthode toggle qui ajoute une classe "active" sur l'element "nav" s'il elle n'existe pas , et la retire si elle existe,
//ceci afin d'appliquer le css permettant de basculer ou non en menu burger quand la classe active est présente
icons.addEventListener("click", () =>{
  nav.classList.toggle("active");
})

const navLinks=document.querySelectorAll("nav li");

navLinks.forEach((navLink)=>{navLink.addEventListener("click",()=>{
nav.classList.remove("active")
})
})



//---------------------------------OUVRIR LE CV DANS ONGET AU CLICK:--------------------------------------

// ouvre le fichier pdf cv dans un nouvel onglet sans remplacer l'onglet où est affiché mon portfolio ,(grâce à "blank)" 
cv_button.addEventListener("click",()=>{
  window.open("../cv-ElodieGibson.pdf", "_blank")
})

motivation_button.addEventListener("click",()=>{
  window.open("../façon-Indeed.pdf", "_blank")
})


// -------------------------------GESTION DE L'ANIMATION SCINTILLATE (pour qu'elle s'execute après l'animation fade-in appliquée au bouton)---------- :
document.getElementById('motivation_button').addEventListener('animationend', function() {
  this.classList.add('scintillate');
});