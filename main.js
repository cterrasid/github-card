"use strict";

const URL = "https://api.github.com/orgs/Adalab/members?per_page=100";

async function getAdalabMembers() {
  const response = await fetch(URL);
  const members = await response.json();
  console.log(members);
  
}

getAdalabMembers();
