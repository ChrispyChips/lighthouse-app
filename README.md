# Webpack multiple page build - Lighthouse Performance Web App
This is a page builder to easily generate a multiple page static website. Out of the box pages built by this framework score a 100% in all google lighthouse metrics.

Link below is the built but ugly and mostly unstyled framework example built entirely with this framework and hosted right here on github, feel free to run lighthouse on it:

https://chrispychips.github.io/lighthouse-app/

## Introduction
1. **npm install** - install all packages
2. **npm run start** - serves localhost
3. **npm run build** - Builds work files into static compiled production files

## Instructions
You can choose to build pages in two ways, after cloning the repo and installing node modules with **npm install**:

### Method 1
**With static content you will manually be updating inside your HTML**

  1. Create the following file: src/styles/testPage.scss - This is your style sheet, you can import multiple other sheets into this sheet if you want, or just style in here.
  2. Create the following file: src/scripts/testPage.js - Inside it require('../styles/testPage.scss'); to add the styles page to Webpack bundler. This is your main js file for the testPage
  3. Create the following file: src/templates/testPage.hbs - This is your main html file which will automatically be converted into testPage.html
  4. In your command line run: **npm run start**
  5. When your browser opens up navigate to your new page usually on http://localhost:8080/testPage.html (the localhost :8080 stuff might be different for you just go to your new page /testPage.html)
  6. Adjust the src/manifest.json file to be more inline with your website / app. This is related to the service workers and Progressive Web App functionality.
  7. Once finished developing your styles / functionality; In your command line run: **npm run build** which will output all files for you as to host anywhere you like. The files are found in /docs by default or can be change to /dist or any other output folder by editing the webpack.common.js file and webpack.prod.js file replacing all instances of /docs with /dist.

### Method 2
**With a JSON file to be used in the html as a content source after API call. Leveraging handlebars / helpers for layout building using the content source.**

  1. Notice the package.json "npm run getData" command, this will run the file getData.js. It's purpose is to write files to src/data for each page. It writes one .json file per page I have. So when you clone this repo by default it has index.json and test.json. Both have corresponding .hbs template file (this is html written in html as usual with other benefits) and .scss files as described in method 1 above.
  2. Change your getData file to do the same based on your own API data.
  3. Make the relative .hbs, .scss and .js file for each page you have (src/templates/{examplePage}.hbs) and (src/styles/{examplePage}.hbs) and (src/scripts/{examplePage}.js)
  4. Notice how I require SCSS files inside the JS file example src/scripts/index.js, you should do the same for your pages
  5. In your command line run: **npm run getData** this will run your api call in getData.js as well as clean the current src/data folder out, then run the localhost instance of built pages
  6. UNTESTED ADVICE: If you are smart you can probably build the .js, .hbs and .scss files dynamically in getData.js based off your json structure
  7. Adjust the src/manifest.json file to be more inline with your website / app. This is related to the service workers and Progressive Web App functionality.
  8. Once finished developing your styles / functionality; In your command line run: **npm run build** which will output all files for you as to host anywhere you like. The files are found in /docs by default or can be change to /dist or any other output folder by editing the webpack.common.js file and webpack.prod.js file replacing all instances of /docs with /dist.


## Technologies
> Webpack / SCSS / Bootstrap / Handlebars / JS ES6 / AJAX / HTML / CSS

## Technologies you need to know to use this framework
> HTML / SCSS or CSS / JS
