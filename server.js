const express = require('express');
const faker = require('faker');

const app = express();
const port = process.env.PORT || 3000;

// Массив для хранения данных о судах
let ships = [];

// Генерация случайных данных о судах
function generateShipData() {
    const ship = {
        id: faker.datatype.uuid(),
        name: faker.company.companyName(),
        location: {
            latitude: parseFloat((Math.random() * (90 - (-90)) + (-90)).toFixed(6)),
            longitude: parseFloat((Math.random() * (180 - (-180)) + (-180)).toFixed(6)),
        },
        cargoStatus: faker.random.arrayElement(['Full', 'Partially Full', 'Empty']),
        lastUpdated: new Date().toISOString(),
    };
    return ship;
}

// Инициализация списка судов
for (let i = 0; i < 10; i++) {
    ships.push(generateShipData());
}

// Эндпоинт для получения списка всех судов
app.get('/api/ships', (req, res) => {
    res.json(ships);
});

// Эндпоинт для получения информации о судне по ID
app.get('/api/ships/:id', (req, res) => {
    const ship = ships.find(s => s.id === req.params.id);
    if (ship) {
        res.json(ship);
    } else {
        res.status(404).json({ error: 'Ship not found' });
    }
});

// Эндпоинт для обновления данных о судне
app.post('/api/ships/:id', (req, res) => {
    const shipIndex = ships.findIndex(s => s.id === req.params.id);
    if (shipIndex !== -1) {
        ships[shipIndex] = { ...ships[shipIndex], ...generateShipData() };
        res.json(ships[shipIndex]);
    } else {
        res.status(404).json({ error: 'Ship not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});