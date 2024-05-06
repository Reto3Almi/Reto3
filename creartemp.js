const mongoose = require('mongoose');

// Definir el modelo de la temperatura
const temperaturaSchema = new mongoose.Schema({
    temp: Number
});

const Temperatura = mongoose.model('temperature', temperaturaSchema);

// Conexión a MongoDB
mongoose.connect('mongodb+srv://Almi123:Almi123@prueba.3sqjatf.mongodb.net/temperaturas?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');

        // Crear una nueva temperatura
        const nuevaTemperatura = new Temperatura({
            temp: 25 // Aquí especificas el valor de la nueva temperatura
        });

        // Guardar la nueva temperatura en la base de datos
        nuevaTemperatura.save()
            .then(() => console.log('Nueva temperatura creada:', nuevaTemperatura))
            .catch(error => console.error('Error al guardar la nueva temperatura:', error));
    })
    .catch(err => console.error('Error al conectar a MongoDB:', err));
