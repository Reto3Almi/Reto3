async function obtenerYMostrarDatos() {
  try {
      const respuesta = await fetch('/datos');
      const data = await respuesta.json();

      if (data.hasOwnProperty('temperatura') && data.hasOwnProperty('humedad')) {
          document.getElementById('temperatura').innerText = data.temperatura + 'ºC';
          document.getElementById('humedad').innerText = data.humedad + '%';
      } else {
          console.error('No se encontraron los datos necesarios en la respuesta:', data);
          document.getElementById('temperatura').innerText = 'No hay datos disponibles';
          document.getElementById('humedad').innerText = 'No hay datos disponibles';
      }
  } catch (error) {
      console.error('Error al obtener los datos:', error);
      document.getElementById('temperatura').innerText = 'Error al obtener los datos';
      document.getElementById('humedad').innerText = 'Error al obtener los datos';
  }
}

obtenerYMostrarDatos();

setInterval(obtenerYMostrarDatos, 5000);
