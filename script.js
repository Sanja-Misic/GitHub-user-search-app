'use strict';

let username = 'octocat';

const userImg = document.querySelector('.user__image');
const userJoinedDate = document.querySelector('.user__joined-date');

const userName = document.querySelector('.user__name');
const userLogin = document.querySelector('.user__login');
const userBio = document.querySelector('.user__bio');

const repoNum = document.querySelector('.repoNum');
const followersNum = document.querySelector('.followersNum');
const followingNum = document.querySelector('.followingNum');

const locationLink = document.querySelector('.location');
const twitterLink = document.querySelector('.twitter');
const websiteLink = document.querySelector('.website');
const companyLink = document.querySelector('.company');

const searchButton = document.querySelector('.search__button');

////
async function getUserData() {
  const url = `https://api.github.com/users/${username}`;

  try {
    /// Catch data
    const response = await fetch(url);
    const userData = await response.json();
    console.log(userData);

    /// Set text content on DOM elements
    // name and login
    if (userData.name === '' || userData.name === null)
      userName.textContent = userData.login;
    else userName.textContent = userData.name;

    userLogin.textContent = `@${userData.login}`;

    //joined date
    const originalDate = userData.created_at;
    const dateObj = new Date(originalDate);

    var d = dateObj.getUTCDate();
    var m = dateObj.toLocaleString('default', { month: 'short' });
    var y = dateObj.getUTCFullYear();
    const formatedDate = `${d} ${m} ${y}`;

    userJoinedDate.textContent = formatedDate;

    //img
    userImg.src = userData.avatar_url;

    // bio
    if (userData.bio === null) userBio.textContent = 'This profile has no bio';
    else userBio.textContent = userData.bio;

    // info numbers
    repoNum.textContent = userData.public_repos;
    followersNum.textContent = userData.followers;
    followingNum.textContent = userData.following;

    // links
    const addLinksContent = (linkElement, linkData) => {
      if (linkData === null || linkData === '') {
        linkElement.textContent = 'Not Avilable';
        console.log(linkElement.parentElement);
        linkElement.parentElement.style.opacity = '50%';
        // linkElement.parentElement.classlist.add('not-avilable');
        linkElement.addEventListener('click', function (event) {
          event.preventDefault();
        });
      } else {
        linkElement.parentElement.style.opacity = '100%';
        linkElement.textContent = linkData;
        linkElement.href = linkData;
        if (userData.login === 'octocat') {
          linkElement.href = 'https://github.com/github';
        }
      }
    };

    addLinksContent(locationLink, userData.location);
    addLinksContent(twitterLink, userData.twitter_username);
    addLinksContent(websiteLink, userData.blog);
    addLinksContent(companyLink, userData.company);

    /// Catch error
  } catch (error) {
    console.log('Oops! There was a problem retrieving user information. ');
  }
}

getUserData();

searchButton.addEventListener('click', function (e) {
  const inputValue = document.querySelector('.search__input').value;
  e.preventDefault();
  username = inputValue;
  getUserData();
});
