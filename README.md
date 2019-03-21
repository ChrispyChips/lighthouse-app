# Webpack multiple page build - Lighthouse Performance Web App
This is a page builder to easily generate a multiple page static website. Out of the box pages built by this framework score a 100% in all google lighthouse metrics.

https://chrispychips.github.io/lighthouse-app/

## Introduction
By feeding the framework with a JSON file (or not), (perhaps from your favourite headless CMS?) this JSON file / files, are then dynamically added to handlebars for pre-compiled usage (In node therefore not read and replaced front end with JS client side). The idea is that to update some content in your statically generate site you can just go update your headless cms and save all content changes. CICD will eventually in future versions then trigger your content changes on website automatically without developer influence

## Instructions
> **clone out / download repo**

> **npm install**

> **npm run getData** : This does 2 things. First it runs a file in node, then it runs *npm run start*. The first part is most important this file getData.js will be where you make your api call to your data endpoint. In the example its a link to a local file I run with the chrome web server. Either way your endpoint needs to replace this "http://127.0.0.1:8887/initialData.json" in the getData.js file . The data src itself needs to be in a very specific format; one root object called pages which is an array containing all your page object data. This object where for example, "page": "index", is then referencable through handlebars during precompile time!

> If you want to use dynamic partials then when this runs you want to make sure your src/data folder contains all the project data files as unique files
> src/data
> - index.json
> - test.json

> because this matches your page / script structure
> src/scripts test.js & index.js
> src/templates : index.hbs & test.hbs

> **npm run start** : Since the ./src/data folder will now show your new json file / files in a developer server localhost instance that opens your browser to view the root directory. Which is set to /docs for github pages but can easily be changed in the "output" object to /dist or anything else in the webpack.common.js and webpack.dev.js files.

## Introduction
Example: You want to build a 2 (can be 1 or can be more) page web site / web app I follow Instructions above. Each page needs 2 things: 1 Template file in src/template as a .hbs file, and 1 script as script.js file in src/scripts. These 2 files must have the same name, and as read above if you want a build with handlebars json data then have one object in your JSON endpoint for this page with same name as the .hbs and .js file.
You can of course just build the pages without dynamic json and mange content yourself in your repo files.

1. go to src/templates and style index.hbs as you wish. Notice the use of how a global partial is used to include common <head> items. Anything that needs to be included at the end of body can simply be required into the reletive script file for index
2. go to src/scripts index.js and include any SCSS with require() format. Example in index.js you can use require('../styles/index.scss'); Including styles should be automatic, don't include them manually in your .hbs template
3. Run *npm run getData* once to build your json. Make sure your data has pulled through to src/data if not check in getData.js file in root as to why it did not.
4. After the getdata command has run it should automatically start the dev server and browsersynching / hotswapping on saves during dev.
5. If you have already run getData at least once then you can start using *npm run start* instead this skips the call to your api endpoint and just using the files referenced in data

## Technologies
> webpack / sass / bootstrap / handlebars / es6 / ajax
