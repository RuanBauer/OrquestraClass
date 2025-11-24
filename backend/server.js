require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const turmaRoutes = require('./routes/turmas');
const aulaRoutes = require('./routes/aulas');
const materialRoutes = require('./routes/materiais');
const aulaParticularesRoutes = require('./routes/aulaParticulares');
const alunosRoutes = require('./routes/alunos');

const app = express();
app.use(express.json());

// Connect DB
const MONGODB_URI = process.env.MONGODB_URI;
console.log('URI LIDA:', MONGODB_URI ? MONGODB_URI.replace(/:(.*)@/, ':*****@') : 'undefined');
connectDB(MONGODB_URI);

// Seed admin (creates admin if not exists)
seedAdmin();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/aulas', aulaRoutes);
app.use('/api/materiais', materialRoutes);
app.use('/api/aulas-particulares', aulaParticularesRoutes);
app.use('/api/alunos', alunosRoutes);

// simple root
app.get('/', (req, res) => res.send('OrquestraClass API rodando'));

// Mudar porta para 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
