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
const dateData = document.querySelector(".date__data");

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
    .sort((a, b) => a.name - b.name)
    .map(adalabMember => {
      //Create option and user
      const user = document.createTextNode(
        adalabMember.name || adalabMember.login
      );
      const option = document.createElement("option");
      option.value = adalabMember.login;
      option.appendChild(user);
      select.appendChild(option);
    });
}

getAdalabMembers();

function addDataToElement(data, el) {
  if (el.childNodes.length > 0) {
    el.removeChild(el.childNodes[0]);
  }
  const dataValue = document.createTextNode(data);
  el.appendChild(dataValue);
}

function handleSelectChange(e) {
  cardContainer.style.display = "flex";
  
  const { value } = e.currentTarget;

  adalabMembers.forEach(adalabMember => {
    if (adalabMember.login === value) {
      memberData = {
        avatar: adalabMember.avatar_url,
        name: adalabMember.name || adalabMember.login,
        login: adalabMember.login,
        location: adalabMember.location || "",
        repos: adalabMember.public_repos,
        followers: adalabMember.followers,
        following: adalabMember.following,
        date: adalabMember.created_at
      };
    }
  });

  cardImage.src = memberData.avatar;
  cardImage.alt = `Imagen de perfil de ${memberData.name || memberData.login}`;
  addDataToElement(`@${memberData.login}`, cardUsername);
  addDataToElement(memberData.name, cardName);
  addDataToElement(memberData.location, cardLocation);
  addDataToElement(memberData.repos, reposNumber);
  addDataToElement("Repos", reposTitle);
  addDataToElement(memberData.followers, followersNumber);
  addDataToElement("Followers", followersTitle);
  addDataToElement(memberData.following, followingNumber);
  addDataToElement("Following", followingTitle);
  addDataToElement(
    `Miembro desde ${new Date(memberData.date).getFullYear()}`,
    dateData
  );
}

select.addEventListener("change", handleSelectChange);
