require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

logger.info('Server starting...');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/', (req, res) => {
    res.send({ message: 'WMS API is running' });
});

// Error middleware
app.use(errorHandler);

// DB connect & server listen
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
});
