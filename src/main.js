import { JsonPrettier } from "./JsonPrettier.js";
import { UserApi } from "./UserApi.js";

const pr = new JsonPrettier();
const tp = new UserApi();
const JSONFORMATTER = 'JSON FORMATTER';
const USERPOSTS = 'USER POSTS API';
const main = document.querySelector('main');
const nav = `<nav class='nav'><ul>
<li><a href="#" class="nav-formatter-link">${JSONFORMATTER}</a></li>
<li><a href="#" class="nav-user-api-link">${USERPOSTS}</a></li>
</ul></nav>`;
main.innerHTML = nav;
addLis();
function init(ev){
    main.innerHTML = `${nav}`;
    if(ev.target.innerHTML === JSONFORMATTER){
        main.appendChild(pr.getContent());
        pr.init();
    }
    if(ev.target.innerHTML === USERPOSTS){
        main.appendChild(tp.getContent());
    }
    addLis();
}

function addLis(){
    document.querySelector('.nav-formatter-link').addEventListener('click', init);
    document.querySelector('.nav-user-api-link').addEventListener('click', init);
}