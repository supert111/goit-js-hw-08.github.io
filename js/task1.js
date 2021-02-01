import galleryItems from "./gallery-items.js"

//Разбей задание на несколько подзадач:
//1- Создание и рендер разметки по массиву данных
// и предоставленному шаблону.
const jsGalleryRef = document.querySelector('.js-gallery');
//let a = 0;

const liMarkup = (el => {
    const galleryItemRef = document.createElement('li');
    const gallerylinkRef = document.createElement('a');
    const galleryImageRef = document.createElement('img');
    
    galleryItemRef.classList.add('gallery__item');
    gallerylinkRef.classList.add('gallery__link');
    galleryImageRef.classList.add('gallery__image');
    
    gallerylinkRef.setAttribute('href', el.original);
    galleryImageRef.setAttribute('src', el.preview);
    galleryImageRef.setAttribute('data-source', el.original);
    //galleryImageRef.setAttribute('data-index', a);
    galleryImageRef.setAttribute('alt', el.description);
    //a +=1;
    galleryItemRef.append(gallerylinkRef);
    gallerylinkRef.append(galleryImageRef);
    
    return galleryItemRef;
});

const allGallery = galleryItems.map(element => {
    return liMarkup(element);   
});
   jsGalleryRef.append(...allGallery);
   
   
// 2- Реализация делегирования на галерее ul.js-gallery 
//и получение url большого изображения.

const lightboxRef = document.querySelector('.lightbox');
const lightboxCloseRef = document.querySelector('button[data-action="close-lightbox"]');
const ligtboxBigImageRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('div.lightbox__overlay')

jsGalleryRef.addEventListener('click', onTagsClick);
function onTagsClick(event) {
    event.preventDefault();
 
    if(event.target.nodeName !== 'IMG') {
        //console.log('Клик не по картинке, выходим.');
        return;
    }
     const nextActiveImage = event.target;
     //получение url большого изображения.
     const bigImage = nextActiveImage.dataset.source;
     //const bigImageIndex = nextActiveImage.dataset.index;
     //Подмена значения атрибута src элемента img.lightbox__image
     ligtboxBigImageRef.setAttribute('src', `${bigImage}`);
     //ligtboxBigImageRef.setAttribute('data-index', `${bigImageIndex}`);
     //let stepIndex = +ligtboxBigImageRef.dataset.index;
     
     //Открытие модального окна по клику на элементе галереи.
    if (nextActiveImage) {
        lightboxRef.classList.add('is-open'); 
        //Закрытие модального окна по клику на div.lightbox__overlay
        lightboxOverlayRef.addEventListener('click', closeModal);
        // jsGalleryRef.addEventListener('keydown', event => {
            
        //     if(event.code === 'ArrowRight') {
        //         ligtboxBigImageRef.setAttribute('src', ``);
               
        //         //console.log(stepIndex);
        //         //stepIndex +=1;
        //         stepImeg();
        //     }

        //     else if (event.code === 'ArrowLeft') {
                
        //         //stepIndex -=1;
        //         //console.log(stepIndex);
        //     }
        //     else {
        //         return;
        //     }
        // })
    }
    //Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
    if (lightboxCloseRef) {
        lightboxCloseRef.addEventListener('click', closeModal);
    }
    if (!lightboxOverlayRef) return; 
  
};   
function closeModal() {
    lightboxRef.classList.remove('is-open');
    lightboxCloseRef.removeEventListener('click', closeModal);
    lightboxOverlayRef.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', event);
    //Очистка значения атрибута src элемента img.lightbox__image. 
    //Это необходимо для того, чтобы при следующем открытии модального окна,
    // пока грузится изображение, мы не видели предыдущее.
    ligtboxBigImageRef.setAttribute('src', ``);
};
// function stepImeg() {
//    // console.log(ligtboxBigImageRef.dataset.index);
//     // if(ligtboxBigImageRef.hasAttribute('src')){
//     // ligtboxBigImageRef.setAttribute('src', `${bigImage}`);
//     // img.src = galleryItems[index + 1].original;
//     // console.log(img.src);
//     // }
// }

window.addEventListener('keydown', event => {
    //Закрытие модального окна по нажатию клавиши ESC
    if(event.code === 'Escape') {
        closeModal();
    }
});
  

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>