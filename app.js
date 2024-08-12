
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

const hbs = exphbs.create({
  partialsDir: ['views/partials']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home', { title: 'Server-Side Calculator' });
});

app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  let result;

  switch (operation) {
    case 'add':
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case 'subtract':
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case 'multiply':
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case 'divide':
      result = parseFloat(num1) / parseFloat(num2);
      break;
    default:
      result = 'Invalid operation';
  }

  res.render('result', { result, num1, num2, operation });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});