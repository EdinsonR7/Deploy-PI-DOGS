const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogsRouter = require('./DogsRouter/router.js')
const TemperamentsRouter = require('./TemperamentsRouter/router.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', DogsRouter)
router.use('/temperaments', TemperamentsRouter)


module.exports = router;
