window.addEventListener("DOMContentLoaded", () => {
  const doc = document
  const paginate = 50;
  const key = '30168629-808f009153f7d1202cdc3116e'
  const selectID = id => doc.getElementById(id)
  const clearGalery = () => selectID("galery").innerHTML = ""

  const hideSections = () => {

    const heroSection = selectID("hero")
    const categoriesSection = selectID("categoriesSection");

    heroSection.style.display = "none";
    categoriesSection.style.display = "none";
  }


  const tags = (data) => {
    const tags = []

    data.forEach(item => tags.push(item.tags.split(",")));
    selectID("settags").innerHTML = " "

    tags.flat().slice(0, 13).forEach((item) => {
      selectID("settags").innerHTML += `
        <button class="btn btn-outline-secondary shadow-sm p-1 px-3 m-1">
        	<span class="p-o m-auto">${item}</span>
        </button>`;
    })
  };
  

  const gallery = (data) => {
    tags(data.hits);
    console.log(data)
    data.hits.forEach((item, index) => {
      // insecure method
      selectID("galery").innerHTML += `
      <div class="col p-md-2 px-0 py-2 m-0" data-aos="fade-up" data-aos-delay="${index += 100}">
      <figure class="p-0 m-0">
        <img class="p-0 m-0" src="${item.previewURL}" alt=""/>
        <figcaption class="p-3">
			      <div class="d-flex gap-2">
              <button id="${item.id}" type="button" class="btn btn-outline-secondary viewBox" data-toggle="modal" data-target="#modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
        				  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path>
        				  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
        				</svg>
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        				  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        				</svg>
              </button>
              <button type="button" class="btn btn-outline-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
        				  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"></path>
        				</svg>
              </button>
            </div>
        </figcaption>
      </figure>
      </div>`;
    })
    s(data.hits)
    // console.log(selectID("galery").getElementsByTagName("figure"))
  };


  const s = (data)=>{
  	doc.querySelectorAll(".viewBox").forEach(item => {
  		item.addEventListener("click", function(){
  	  		let o = data.filter(i => i.id == item.id); d(o)
  	  	})
  	 })
  }


  const d = (o) => {
  	selectID("modalContent").innerHTML = `
  		<div class=""></div>
      <picture class="">
        <img class="p-0 m-0" src="${o[0].largeImageURL}" alt=""width="100%" height="auto">
      </picture>
  	`
  }

  let currentPage = 1;

  // const next = selectID("next");
  // nextButton.addEventListener("click", () => {
  //   currentPage++;
  //   consultarApi(currentPage);
  // });

  // const prev = selectID("prev");
  // prevButton.addEventListener("click", () => {
  //   currentPage--;
  //   consultarApi(currentPage);
  // });

  // Inicialmente, mostrar la primera página de imágenes
  // consultarApi(currentPage);


  fetch(`https://pixabay.com/api/?key=${key}&q="paisajes"&per_page=${paginate}`)
    .then(response => response.json())
    .then(data => gallery(data));

  selectID("buttonSearch").addEventListener("click", async function (e) {
    e.preventDefault();
    // hideSections()
    clearGalery()

    const title = selectID("title");
    const query_search = selectID("search").value;
    const data = await request(query_search);

    title.style.marginTop = "5rem"
    title.textContent = "";
    title.innerHTML = `${data.total} imágenes gratis de ${query_search}`;

    gallery(data);
  });


  const request = async (query_search) => {
    const response = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${query_search}&per_page=${paginate}`
    );
    const data = await response.json();
    return data;
  };


  const categories = [
    {
      name: "Home",
      icon: "bi bi-house-door-fill",
      icon2: "bi bi-house-heart-fill",
    },
    { name: "Fotos", icon: "bi bi-image" },
    { name: "Ilustraciones", icon: "bi bi-brush-fill" },
    { name: "Vectores", icon: "bi bi-vector-pen" },
    { name: "Videos", icon: "bi bi-camera-video-fill" },
    { name: "Música", icon: "bi bi-music-note-beamed" },
    { name: "Efectos de sonido", icon: "bi bi-soundwave" },
    { name: "GIF", icon: "bi bi-filetype-gif" },
  ];


  const categoriesList = selectID("categories_2344");
  const fragment = document.createDocumentFragment();


  categories.forEach((item) => {
  	// safe method
    const li = document.createElement("li");
    const i = document.createElement("i");
    const span = document.createElement("span");

    // li.setAttribute("onclick", getClicked())
    li.classList.add("py-2", "px-3", "mx-1", "rounded-pill", "bg-light", "d-flex");
    i.setAttribute("class", `${item.icon} pe-2`);
    span.textContent = item.name;

    li.appendChild(i);
    li.appendChild(span);
    fragment.appendChild(li);
  });

  // categoriesList.appendChild(fragment);
  // const arrayElementsLi = categoriesList.querySelectorAll('li');






  //   const header = document.getElementById('header');

  //   window.addEventListener('scroll', () => {
  //     const scrollPosition = window.pageYOffset;
  //     if (scrollPosition > header.offsetHeight) {
  //       header.classList.add('bg-white');
  //     } else {
  //       header.classList.remove('bg-white');
  //     }
  //   });
});


// const objeto = {
//   id: 'imagen-1',
//   src: 'ruta/imagen-1.jpg',
//   alt: 'Descripción de imagen 1',
//   title: 'Título de imagen 1',
//   dataAtributo: 'Valor de data-atributo de imagen 1'
// }




// function addAtributes(elemento, atributos) {
//   for (let atributo in atributos) {
//     elemento.setAttribute(atributo, atributos[atributo]);
//   }
// }

// const imagen = document.createElement('img');
// addAtributes(imagen, objeto);



let elemento = {
  nameTag: "button",
  nameElement: "en caso de ser un input",
  id: "loquesea_23",
  class: "btn btn-outline-dark",
}