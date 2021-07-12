/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/


//const url = ("https://platzi-avo.vercel.app/api/avo")
const baseUrl = 'https://platzi-avo.vercel.app';

const insertHere = document.querySelector("#app");

const formatPrice = (price) => {
	//return price
	const newPrice = new window.Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN"
	}).format(price);

	return newPrice;
}
//web api
window
	//nos conectamos al servidor
	.fetch(`${baseUrl}/api/avo`)
	//procesar la respuesta y convertirla a JSON
	.then((respuesta) => respuesta.json())
	// JSON -> Data -> Renderizar info en el navegador
	.then(respuesta => {
		// mostramos la informacion en consola
		//console.log(respuesta)

		const itemsRespuesta = [] //despues de obtener los datos los agrupamos en un array
		respuesta.data.forEach(
			(item) => {
				//console.log(item.name);

				//imagen
				const imagen = document.createElement('img');
				imagen.src = `${baseUrl}${item.image}`;
				imagen.classList.add('mx-auto', 'rounded-full', 'border-solid', 'border-2', 'border-green-100', 'imagen');

				//titulo
				const title = document.createElement('h2');
				title.textContent = item.name;
				//title.style = "font-size: 2rem;" <-- puede ser asi ó
				//title.fontSize = "3rem" ////////// <-- Así ó
				title.className = "text-xl font-bold text-center uppercase text-green-700 pb-4"  /// noiiiiiice

				//sabor
				const description = document.createElement('p');
				description.classList.add('truncate', 'py-4', 'font-medium', 'text-green-800');
				description.textContent = item.attributes.description;


				//precio
				const price = document.createElement('div');
				price.className = "price px-5 w-1/2 text-center m-auto py-2 text-md shadow-sm text-cemter font-medium tracking-wider rounded-full"
				//price.textContent = item.price; // <-- de esta forma me trae el precio
				price.textContent = formatPrice(item.price); // <-- pero ahora lo agregamos dentro de una funcion para poder manipular la presentacion


				//contenedor
				const container = document.createElement('div');
				container.classList.add('bg-yellow-50', 'p-4', 'rounded-md');

				title.classList.add('header');
				//imagen.classList.add('created');
				price.classList.add('meta');

				/////  de esta forma agregaria cada elemento uno por uno /////
				//container.appendChild(imagen);
				//container.appendChild(title);
				//container.appendChild(price);

				///// este metodo resulta mas efectivo, pues en una sola operacion Agregas en lote varios elementos /////
				container.append(title, imagen, description, price);

				//document.body.appendChild(container);  <- en arrays largos puede ser pesado
				// es mejor asi:
				itemsRespuesta.push(container);
			}
		)

		insertHere.append(...itemsRespuesta)
	})