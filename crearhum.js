const mongoose = require('mongoose');

// Definir el esquema para los datos de temperatura y humedad
const temperaturaSchema = new mongoose.Schema({
    temp: Number,
    humedad: Number
});

// Modelo basado en el esquema
const Temperatura = mongoose.model('Temperatura', temperaturaSchema);

// Conexión a la base de datos
mongoose.connect('mongodb+srv://Almi123:Almi123@prueba.3sqjatf.mongodb.net/temperaturas?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conexión exitosa a MongoDB');
    // Llamar a la función para añadir datos de humedad
    agregarHumedad();
})
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Función para agregar datos de humedad a la base de datos
async function agregarHumedad() {
    try {
        // Crear un nuevo documento de temperatura con un valor aleatorio de humedad
        const nuevaTemperatura = new Temperatura({
            temp: obtenerTemperaturaAleatoria(),
            humedad: obtenerHumedadAleatoria()
        });

        // Guardar el documento en la base de datos
        await nuevaTemperatura.save();
        console.log('Humedad agregada correctamente:', nuevaTemperatura);
    } catch (error) {
        console.error('Error al agregar humedad:', error);
    }
}

// Función para generar un valor de temperatura aleatorio entre 20 y 40 grados Celsius
function obtenerTemperaturaAleatoria() {
    return Math.floor(Math.random() * (40 - 20 + 1)) + 20;
}

// Función para generar un valor de humedad aleatorio entre 40% y 80%
function obtenerHumedadAleatoria() {
    return Math.floor(Math.random() * (80 - 40 + 1)) + 40;
}
