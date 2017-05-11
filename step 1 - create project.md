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

[1]: http://expressjs.com/en/starter/generator.html

