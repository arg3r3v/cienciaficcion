window.onload = function () {

    const IMAGENES_CARRUSEL = [
        'img/odisea.jpg',
        'img/blade.jpg',
        'img/interestelar.jpg',
        'img/matrix.jpg',
        'img/quintoelemento.png',
        'img/starwars.jpg'
    ];
    const IMAGENES_GALERIA = [
        'img/babel.jpg',
        'img/xenomorfo.jpg',
        'img/darktowr.webp',
        'img/neuro.webp',
        'img/donato.webp'
    ];
    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;
    let posicionActualCarrusel = 0;
    let $botonRetroceder = document.querySelector('#retroceder');
    let $botonAvanzar = document.querySelector('#avanzar');
    let $imagenCarrusel = document.querySelector('#imagen');
    let $botonPlay = document.querySelector('#play');
    let $botonStop = document.querySelector('#stop');
    let intervaloCarrusel;
    let $galeria = document.querySelector('.gallery');
    let $imagenGrande = document.getElementById('imagenGrande');

    function pasarFotoCarrusel() {
        if (posicionActualCarrusel >= IMAGENES_CARRUSEL.length - 1) {
            posicionActualCarrusel = 0;
        } else {
            posicionActualCarrusel++;
        }
        renderizarImagenCarrusel();
    }

    function retrocederFotoCarrusel() {
        if (posicionActualCarrusel <= 0) {
            posicionActualCarrusel = IMAGENES_CARRUSEL.length - 1;
        } else {
            posicionActualCarrusel--;
        }
        renderizarImagenCarrusel();
    }

    function renderizarImagenCarrusel() {
        $imagenCarrusel.style.backgroundImage = `url(${IMAGENES_CARRUSEL[posicionActualCarrusel]})`;
    }

    function playIntervaloCarrusel() {
        intervaloCarrusel = setInterval(pasarFotoCarrusel, TIEMPO_INTERVALO_MILESIMAS_SEG);
        $botonAvanzar.setAttribute('disabled', true);
        $botonRetroceder.setAttribute('disabled', true);
        $botonPlay.setAttribute('disabled', true);
        $botonStop.removeAttribute('disabled');
    }

    function stopIntervaloCarrusel() {
        clearInterval(intervaloCarrusel);
        $botonAvanzar.removeAttribute('disabled');
        $botonRetroceder.removeAttribute('disabled');
        $botonPlay.removeAttribute('disabled');
        $botonStop.setAttribute('disabled', true);
    }

    function mostrarImagenGrande(src) {
        $imagenGrande.innerHTML = '';
        let imagen = document.createElement('img');
        imagen.src = src;
        $imagenGrande.appendChild(imagen);
        $imagenGrande.style.display = 'block';
    }

    $botonAvanzar.addEventListener('click', pasarFotoCarrusel);
    $botonRetroceder.addEventListener('click', retrocederFotoCarrusel);
    $botonPlay.addEventListener('click', playIntervaloCarrusel);
    $botonStop.addEventListener('click', stopIntervaloCarrusel);

    IMAGENES_GALERIA.forEach(function (src, index) {
        let imagen = document.createElement('img');
        imagen.src = src;
        imagen.classList.add('gallery-image');
        imagen.addEventListener('click', function () {
            posicionActualCarrusel = index;
            renderizarImagenCarrusel();
            mostrarImagenGrande(src);
            document.querySelectorAll('.gallery-image').forEach(function (img) {
                img.classList.remove('selected');
            });
            imagen.classList.add('selected');
        });
        $galeria.appendChild(imagen);
    });

    renderizarImagenCarrusel();
};