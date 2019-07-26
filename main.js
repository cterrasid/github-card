"use strict";

const URL = "https://api.github.com/orgs/Adalab/members?per_page=99";

const select = document.querySelector("select");

async function getAdalabMembers() {
  const response = await fetch(URL);
  const members = await response.json();
  const secondResponse = members.map(member =>
    fetch(member.url).then(res => res.json())
  );
  const adalabers = await Promise.all(secondResponse);

  adalabers
    .sort((a, b) => a.login - b.login)
    .map(adalaber => {
      //Create option and user
      const user = document.createTextNode(adalaber.login);
      const option = document.createElement("option");
      option.value = adalaber.login;
      //User inside option
      option.appendChild(user);
      //Option inside select
      select.appendChild(option);

      const name = adalaber.name;

      //escucho el cambio del select
      select.addEventListener("change", handleUserSelection);
    });
}
getAdalabMembers();

function handleUserSelection(e) {
  const { value } = e.currentTarget;
  
}
