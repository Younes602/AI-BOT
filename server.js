const express = require('express');
const bodyParser = require('body-parser');
const say = require('say');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// مسار GET لتحميل واجهة المستخدم
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
});

// مسار POST لنطق النص
app.post('/speak', (req, res) => {
const text = req.body.text;

say.speak(text, null, 1.0, (err) => {
if (err) {
console.error(err);
return res.status(500).send('Error speaking text');
}
res.send('Speaking: ' + text);
});
});
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});