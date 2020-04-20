export class UserApi{
    constructor() {
        this.url = 'https://jsonplaceholder.typicode.com/';
        this.section = this.creator('section', 'user-api-section');
        this.users = {};
        this.fullInfo = this.creator('table', 'user-api-table-fullinfo');
        this.fullInfoTbody = this.creator('tbody', 'user-api-table-tbody');
        this.usersContainer = this.creator('div', 'user-api-container-users');
        this.btnContainer = this.creator('div', 'user-api-btn-container');
        this.tableContainer = this.creator('div', 'user-api-table-container');
        this.postsContainer = this.creator('div', 'user-api-posts-container');
    }

    getContent(){
        this.section.innerHTML = '';
        this.usersContainer.innerHTML = '';
        this.getUsers();
        return this.section;
    }

    getUsers() {
        fetch(`${this.url}users`)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                data.map(e=>{
                    this.users = Object.assign({},this.users,{[e.id]:e});
                    let block = this.creator('div', 'user-api-userblock');
                    let blockTxt = this.creator('span', 'user-api-userblock-span');
                    blockTxt.textContent = e.name;
                    block.appendChild(blockTxt);
                    block.dataset.id = e.id;
                    blockTxt.dataset.id = e.id;
                    block.addEventListener('click', this.clickFullInfo.bind(this));
                    this.usersContainer.appendChild(block);
                });
                this.section.appendChild(this.usersContainer);
                this.section.appendChild(this.tableContainer);
                this.section.appendChild(this.btnContainer);
                this.section.appendChild(this.postsContainer);
            })
    }

    clickFullInfo(ev){
        let user = Object.assign({},this.users[ev.target.dataset.id]);
        this.fullInfoTbody.innerHTML = '';
        this.fullInfo.innerHTML = '';
        this.btnContainer.innerHTML = '';
        this.tableContainer.innerHTML = '';
        this.postsContainer.innerHTML = '';
        this.addRow(this.fullInfoTbody, 'Name', user.name, 0);
        this.addRow(this.fullInfoTbody, 'Username', user.username, 1);    
        this.addRow(this.fullInfoTbody, 'Address', `${user.address.city} ${user.address.street} ${user.address.suite}`, 2);
        this.addRow(this.fullInfoTbody, 'Email', user.email, 3);    
        this.addRow(this.fullInfoTbody, 'Phone', user.phone, 4);    
        this.addRow(this.fullInfoTbody, 'Website', user.website, 5);      
        let btn = this.creator('button', 'user-api-btn-showpost');
        btn.addEventListener('click', this.showPost.bind(this));
        btn.dataset.id = user.id;
        btn.textContent = 'Show posts';
        this.btnContainer.appendChild(btn);
        this.fullInfo.appendChild(this.fullInfoTbody);
        this.tableContainer.appendChild(this.fullInfo);
    }

    showPost(ev){
        this.postsContainer.innerHTML = '';
        fetch(`${this.url}posts?userId=${ev.target.dataset.id}`)
            .then(response => response.json())
            .then(data => {
                data.map(e=>{
                    let block = this.creator('div', 'user-api-postsblock');
                    let blockTitle = this.creator('h5', 'user-api-postsblock-title');
                    let blockBody = this.creator('p', 'user-api-postsblock-body');
                    blockTitle.textContent = e.title;
                    blockBody.textContent = e.body;
                    block.appendChild(blockTitle);
                    block.appendChild(blockBody);
                    this.postsContainer.appendChild(block);
                })});
    }

    addRow(body,name, txt, num){
        let row = body.insertRow(num);
        row.insertCell(0).innerText = name;
        row.insertCell(1).innerText = txt;
    }

    creator(name, cl){
        let el = document.createElement(name);
        el.classList.add(cl);
        return el;
    }
}