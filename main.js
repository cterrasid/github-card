"use strict";

const URL = "https://api.github.com/orgs/Adalab/members?per_page=99";

const select = document.querySelector(".select__user");
const cardContainer = document.querySelector(".card__container");
const cardImage = document.querySelector(".card__image");
const cardUsername = document.querySelector(".card__username");
const cardName = document.querySelector(".card__name");
const cardLocation = document.querySelector(".card__location");
const reposNumber = document.querySelector(".repos__number");
const reposTitle = document.querySelector(".repos__name");
const followersNumber = document.querySelector(".followers__number");
const followersTitle = document.querySelector(".followers__name");
const followingNumber = document.querySelector(".following__number");
const followingTitle = document.querySelector(".following__name");

let adalabMembers;
let memberData;

async function getAdalabMembers() {
  const response = await fetch(URL);
  const members = await response.json();
  const secondResponse = members.map(member =>
    fetch(member.url).then(res => res.json())
  );
  const users = await Promise.all(secondResponse);

  adalabMembers = users;

  adalabMembers
    .sort((a, b) => a.login - b.login)
    .map(adalabMember => {
      //Create option and user
      const user = document.createTextNode(adalabMember.login);
      const option = document.createElement("option");
      option.value = adalabMember.login;
      //User inside option
      option.appendChild(user);
      //Option inside select
      select.appendChild(option);
    });
}

getAdalabMembers();

function addElementToParent(value, parent) {
  const dataValue = document.createTextNode(value);
  parent.appendChild(dataValue);
}

function handleUserSelection(e) {
  const { value } = e.currentTarget;

  adalabMembers.forEach(adalabMember => {
    if (adalabMember.login === value) {
      memberData = {
        id: adalabMember.id,
        avatar: adalabMember.avatar_url,
        name: adalabMember.name || adalabMember.login,
        login: adalabMember.login,
        location: adalabMember.location || "",
        repos: adalabMember.public_repos,
        followers: adalabMember.followers,
        following: adalabMember.following,
        time: adalabMember.created_at
      };
    }
  });

  cardImage.src = memberData.avatar;
  cardImage.alt = `Imagen de perfil de ${memberData.name || memberData.login}`;
  addElementToParent(`@${memberData.login}`, cardUsername);
  addElementToParent(memberData.name, cardName);
  addElementToParent(memberData.location, cardLocation);
  addElementToParent(memberData.repos, reposNumber);
  addElementToParent("Repos", reposTitle);
  addElementToParent(memberData.followers, followersNumber);
  addElementToParent("Followers", followersTitle);
  addElementToParent(memberData.following, followingNumber);
  addElementToParent("Following", followingTitle);
}

select.addEventListener("change", handleUserSelection);
