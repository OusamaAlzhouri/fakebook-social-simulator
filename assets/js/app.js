'use strict';

const postText = document.getElementById('post-text');
const postImage = document.getElementById('post-image');
const postButton = document.getElementById('post-btn');
const postsContainer = document.getElementById('posts'); 
const profilePic = document.getElementById('profile-pic');
const modal = document.getElementById('user-modal');
const closeModal = document.querySelector('.close');
const userInfo = document.getElementById('user-info');

const postsArray = [];

class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    get userName() {
        return this.#userName;
    }

    get email() {
        return this.#email;
    }

    getInfo() {
        return `Name: ${this.#name} (@${this.#userName})\nEmail: ${this.#email}`;
    }
}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    getInfo() {
        return `${super.getInfo()}\nPages: ${this.#pages.join(", ")}\nGroups: ${this.#groups.join(", ")}\nCan Monetize: ${this.#canMonetize}`;
    }
}

const user = new Subscriber(
    1,
    "Ousama Alzhouri",
    "OusamaAlzhouri",
    "ousama@example.com",
    ["Tech News", "Gaming"],
    ["Web Dev", "JavaScript Group"],
    true
);

profilePic.addEventListener('click', () => {
    userInfo.textContent = user.getInfo();
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; 
});

function createPost() {
    const text = postText.value.trim();
    const file = postImage.files[0];

    if (!text && !file) {
        alert("Please enter a message or select an image.");
        return;
    }

    const newPost = {
        author: user.name,
        text: text,
        image: file ? URL.createObjectURL(file) : null,
        date: new Date().toLocaleDateString()
    };

    postsArray.push(newPost);
    console.log("Posts array:", postsArray);

    displayPost(newPost);

    postText.value = "";
    postImage.type = ''; 
    postImage.type = 'file';
}

function displayPost(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    postHeader.innerHTML = `<strong>${post.author}</strong> - ${post.date}`;

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');

    const postText = document.createElement('p');
    postText.textContent = post.text;

    postContent.appendChild(postText);

    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.style.maxWidth = "100%";
        postContent.appendChild(img);
    }

    postDiv.appendChild(postHeader);
    postDiv.appendChild(postContent);
    postsContainer.appendChild(postDiv);
}

postButton.addEventListener('click', () => {
    console.log("Post button clicked!"); 
    createPost();
});

