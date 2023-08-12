const express = require('express')
const path = require("path");
const app = express()

const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
    console.log(`Unhandled error: ${err}`);
    res.status(500).render('404');
});

app.use('*', (req, res) => {
    res.status(404).render('404');
})


app.listen(PORT, () => {
    console.log(`App now Listening on ${PORT}`)
})