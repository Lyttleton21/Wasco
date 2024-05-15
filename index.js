const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const phrace = require('./routes/phrace');
app.use('/api/phrace', phrace);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`listening on port ${port}...`));