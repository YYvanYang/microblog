## Tools

* node: v7.10.0
* npm: 4.2.0
* express: 4.15.2
* pug: 2.0.0-beta11

## Create Project

Use the application generator tool, [express-generator][1], to quickly create an application skeleton. 

```javascript
 express --view=pug microblog
```

Then install dependencies:

```
$ cd microblog
$ npm install
```

On MacOS or Linux, run the app with this command:
```
$ DEBUG=microblog:* npm start
```

On Windows, use this command:
```
> set DEBUG=microblog:* & npm start
```

Then load http://localhost:3000/ in your browser to access the app.

## Using template engines with Express

A `template engine` enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.

To render template files, set the following [application setting properties][2], set in app.js in the default app created by the generator:

* `views`, the directory where the template files are located. Eg: `app.set('views', './views')`. This defaults to the views directory in the application root directory.
* `view engine`, the template engine to use. For example, to use the Pug template engine: `app.set('view engine', 'pug')`.

```javascript
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

```pug
html
  head
    title= title
  body
    h1= message
```

```javascript
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```




[1]: http://expressjs.com/en/starter/generator.html
[2]: https://expressjs.com/en/4x/api.html#app.set

