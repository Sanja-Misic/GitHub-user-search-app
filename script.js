'use strict';

let username = 'octocat';

async function getUserData() {
  const url = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(url);
    console.log(response.json());
  } catch (error) {
    console.log('greska');
  }
}

getUserData();
