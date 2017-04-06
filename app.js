'use strict';

const app = require('./index');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});