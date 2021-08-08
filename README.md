# Bifröst

>### In Norse mythology, Bifröst is the bridge between the land of mortals, Midgard, and the >land of the gods, Asgard. The gods cross it every day to meet and decide things at >Urdarbrunn (Well of Urd) under the tree Yggdrasill. The bridge is a rainbow. It was built >by the Æsir and is guarded by the god Heimdall. 

---

## Purpose

Bifröst is a tiny (125kb, without Backgound Image) Homepage/Startpage Dashboard forked from [jeroenpardon/sui](https://github.com/jeroenpardon/sui) with some small modifications. I kept the original JSON configuration approach but added some Gulp Tasks, changed the javascript, added a notsosecret access control and the possibility to add more sections. 

Combined with docker you can host this dashboard with less than 5MB of space.

## Installation

- Clone this repository
- Rename and Edit public/data/apps.json.example to public/data/apps.json
- Rename and Edit public/data/links.json.example to public/data/links.json
- Update notsosecret in src/access.js
- Install Gulp and Depenencies
  ```bash
  npm install
- Create Production Files
  ```bash 
  npm run gulp
The production files are then located within the "dist" folder. Point your webroot there.

## Usage/Expand

### Greetings

You can edit the greetings within src/app.js
```javascript
  const strings = [
    'Gute Nacht, Simon!',
    'Guten Morgen, Simon!',
    'Guten Nachmittag, Simon!',
    'Guten Abend, Simon!'
  ]
```

### Sections

You can add more sections by creating them in the index.html file. Be shure to name the section the same as your .json File within the public/data folder.

### Background Image and Colors

Original Wallpaper by [TheAdamTaylor](https://www.deviantart.com/theadamtaylor/art/The-Bifrost-Wallpaper-866173189)

You can change the Background Image bg.jpg in the assets/img by simply replacing it with another Image woth the same name or change the name in the public/index.html file.

If you want a plain colored background simply remove the figure tag from public/index.html
You can define the colors within assets/css/styles.css by changing the root variables. You can also change the Font Colors as well.
```html
<figure class="background">
    <img src="assets/img/bg.jpg">    
</figure>
```

```css
:root{
	--color-background: #242B33;
	--color-text-pri: #EFFBFF;
	--color-text-acc: #7ae0ff;
}
```
## The "not so secret" Access Control

This Dashboard uses a not very secret simple method for access control. 
Basically you add the notsosecret String from src/access.js to your URL like in this example:

https://myawesomedash.com/?SECRET

You will only need to do this once per Browser you intend to use the Dashboard, since the notsosecret key will be stored in your localStorage for further comparison. I may update this medthod in the future. 

## Docker
If you want to host this Dashboard with Docker, build the project first and then expose "dist" to Docker:

docker run --rm -it -e 'ENABLE_COMPRESSION'='1' -e 'ENABLE_CACHE'='1' -p '1702:80/tcp' -v 'dist/':'/var/www':'ro' 'momar/web:latest' 

momar/webis (https://hub.docker.com/r/momar/web) a tiny (1.75mb) container for simply serving static files. Perfect for serving out tiny dashboard.

## Digitalocean App Platform

To host Bifröst with the DO App Plattform simply clone this repository first make all modifications to the json files and the notsosecret access.js then push these back to your forked repository. 

Instruct the DO App Platform to use dist/ as root folder and to run "npm run gulp" after the deployment.