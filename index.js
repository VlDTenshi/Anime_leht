const app = require('express')();
const port = 8080;
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

app.get('/Animes', (req, res)=>{
    res.send(["Kiseiju Seino Kakurisu", "Kimi no todoke", "Akame ga Kilu", "Death note"])
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(port, () => {console.log(`API up at: http://localhost:${port}`)})