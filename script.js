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
const noResultsMessage = document.querySelector('.search__no-results');

////
async function getUserData() {
  const url = `https://api.github.com/users/${username}`;

  try {
    /// Catch data
    const response = await fetch(url);
    const userData = await response.json();
    console.log(userData);

    /// Set text content on DOM elements
    // Funcionality for not found user
    if (userData.message === 'Not Found') {
      noResultsMessage.classList.add('search__no-results-active');
      userContainer.classList.add('user__no-results');
    } else {
      noResultsMessage.classList.remove('search__no-results-active');
      userContainer.classList.remove('user__no-results');
    }

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
          linkElement.classList.add('user__links-link');
          linkElement.classList.remove('user__links-text');
        }
      }
    };

    //links style
    const linkFormat =
      /^(http(s)?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    const addLinksStyle = (linkElement, linkData) => {
      if (!linkFormat.test(linkData)) {
        linkElement.classList.add('user__links-text');
        linkElement.classList.remove('user__links-link');
        // linkElement.addEventListener('click', function (event) {
        //   event.preventDefault();
        // });
        console.log(`${linkData} is not a link`);
      } else {
        console.log(`${linkData} is a link`);
        linkElement.classList.add('user__links-link');
        linkElement.classList.remove('user__links-text');
      }
    };

    addLinksContent(locationLink, userData.location);
    addLinksStyle(locationLink, userData.location);
    addLinksContent(twitterLink, userData.twitter_username);
    addLinksStyle(twitterLink, userData.twitter_username);
    addLinksContent(websiteLink, userData.blog);
    addLinksStyle(websiteLink, userData.blog);
    addLinksStyle(companyLink, userData.company);
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

// SWITCH DARK/LIGHT MODE
const themesButton = document.querySelector('.header__themes');

const body = document.querySelector('body');
const logo = document.querySelector('.header__logo');
const themes = document.querySelector('.header__themes-text');
const searchContainer = document.querySelector('.search');
const userContainer = document.querySelector('.user');
const inputContainer = document.querySelector('.search__input');
const userJoied = document.querySelector('.user__joied');
const userInfo = document.querySelector('.user__info');
const userNum = document.querySelectorAll('.user__info-item-number');

const themesIcon = document.querySelector('.header__themes-icon');

themesButton.addEventListener('click', function () {
  body.classList.toggle('body-dark');
  logo.classList.toggle('header__logo-dark');
  themes.classList.toggle('header__themes-text-dark');
  searchContainer.classList.toggle('search-dark');
  userContainer.classList.toggle('user-dark');
  inputContainer.classList.toggle('search__input-dark');
  userName.classList.toggle('user__name-dark');
  userJoied.classList.toggle('user__joied-dark');
  userInfo.classList.toggle('user__info-dark');
  userNum.forEach(element => {
    element.classList.toggle('user__info-item-number-dark');
  });

  if (body.classList.contains('body-dark')) {
    themesIcon.src = './images/icon-sun.svg';
  } else themesIcon.src = './images/icon-moon.svg';
});
