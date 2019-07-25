"use strict";

const base = "https://api.github.com/";
const adalabMembers = "orgs/Adalab/members?per_page=98";
const URL = `${base}${adalabMembers}`;

const title = document.querySelector("title");
title.innerHTML = "Directorio de Adalabers en Github";

const body = document.querySelector("body");

//Create main
const main = document.createElement("main");
main.classList.add("main__container");

//Create card
const card = document.createElement("article");
card.classList.add("card__container");

//Create image
const image = document.createElement("img");

//Create label
const label = document.createElement("label");
label.for = "select-users";

//Create select
const select = document.createElement("select");
select.name = "select-users";
select.id = "select-users";

//Select inside label
label.appendChild(select);

async function getAdalabMembers() {
  const response = await fetch(URL);
  const members = await response.json();

  console.log(members);

  members.forEach(member => {
    //Create option and user
    const user = document.createTextNode(member.login);
    const option = document.createElement("option");
    option.value = member.login;

    //User inside option
    option.appendChild(user);
    //Option inside select
    select.appendChild(option);
    //Label inside Main
    main.appendChild(label);
    //Main inside Body
    body.appendChild(main);

    //add elements to card
    image.src = member.avatar_url;
    image.alt = member.login;

    //image inside card
    card.appendChild(image);
  });

  //card inside main
  main.appendChild(card);
}

getAdalabMembers();
