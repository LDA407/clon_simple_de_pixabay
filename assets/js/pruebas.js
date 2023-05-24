// Objeto con las propiedades del elemento a crear
const newElement = {
    type: 'div',
    id: 'myDiv',
    classList: ['container', 'bg-primary', 'text-white'],
    textContent: 'Hello World!',
    attributes: {
        'data-id': 123,
        'data-name': 'John',
    },
    children: [
        {
            type: 'h1',
            textContent: 'Heading',
            style: {
                color: 'white',
                fontSize: '2rem',
            },
        },
        {
            type: 'p',
            textContent: 'Lorem ipsum dolor sit amet',
        },
    ],
};

// Función para crear un elemento HTML a partir de un objeto
function createElement(obj) {
    const element = document.createElement(obj.type);
    element.id = obj.id || '';
    element.classList.add(...obj.classList);
    element.textContent = obj.textContent || '';

    if (obj.attributes) {
        for (const key in obj.attributes) {
            element.setAttribute(key, obj.attributes[key]);
        }
    }

    if (obj.style) {
        Object.assign(element.style, obj.style);
    }

    if (obj.children) {
        obj.children.forEach(child => {
            const childElement = createElement(child);
            element.appendChild(childElement);
        });
    }

    return element;
}

// Llamamos a la función createElement y le pasamos como argumento el objeto newElement
const myElement = createElement(newElement);

// Agregamos el elemento creado al body del documento HTML
document.body.appendChild(myElement);



function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = '<h1>Mi header</h1><nav><ul><li><a href="#">Inicio</a></li><li><a href="#">Acerca de</a></li><li><a href="#">Contacto</a></li></ul></nav>';
    document.body.appendChild(header);
}



  // const figure = document.querySelector('figure');

  // figure.addEventListener('mouseover', () => {
  //   const figcaption = figure.querySelector('figcaption');
  //   figcaption.style.display = 'block';
  // });

  // figure.addEventListener('mouseout', () => {
  //   const figcaption = figure.querySelector('figcaption');
  //   figcaption.style.display = 'none';
  // });

  // let currentPage = 1;

  // const nextButton = document.getElementById("next-button");
  // nextButton.addEventListener("click", () => {
  //   currentPage++;
  //   consultarApi(currentPage);
  // });

  // const prevButton = document.getElementById("prev-button");
  // prevButton.addEventListener("click", () => {
  //   currentPage--;
  //   consultarApi(currentPage);
  // });

  // // Inicialmente, mostrar la primera página de imágenes
  // consultarApi(currentPage);



