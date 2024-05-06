const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://Almi123:Almi123@prueba.3sqjatf.mongodb.net/temperaturas?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

const datosSchema = new mongoose.Schema({
  temp: Number,
  humedad: Number
});

const Datos = mongoose.model('Datos', datosSchema);

app.get('/datos', async (req, res) => {
  try {
      const datos = await Datos.findOne().sort({ _id: -1 });
      if (datos) {
          res.json({ temperatura: datos.temp, humedad: datos.humedad });
      } else {
          res.status(404).json({ error: 'No hay datos disponibles' });
      }
  } catch (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'Home.html'));
});

app.get('/temperaturas', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Temperaturas.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
