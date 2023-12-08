"use strict";
import data from "./data.js";

const cards = document.querySelector(".cards");
const sortingBtns = document.querySelector(".sorting-btns");
const sortingBtnsWrapper = document.querySelector(".sorting-btns__wrapper");
console.log(data);

let filters = [];

window.addEventListener("load", loadData);

function loadData() {
  const adds = data
    .map((add) => {
      return ` <article class="card show ${add.featured ? "green-border" : ""}">
          <div class="card-left">
            <img src="${add.logo}" alt="" />
            <div class="card-left__info">
              <div class="info-add flex">
                <p class="text-green text-bold">${add.company}</p>
                ${
                  add.new
                    ? `<button class=" btn accent-btn-green">New!</button>`
                    : ""
                }
                ${
                  add.featured
                    ? `<button class="btn accent-btn-black">Featured</button>`
                    : ""
                }
              </div>
              <h2 class="text-bold">${add.position}</h2>
              <ul class="info flex">
                <li>${add.postedAt}</li>
                <li> ${add.contract}</li>
                <li>${add.location}</li>
              </ul>
            </div>
          </div>
          <div class="card-right flex">
          <button class="btn filter-btn ${add.role}">${add.role}</button>
          <button class="btn filter-btn ${add.level}">${add.level}</button>
          ${add.languages
            .map(
              (lang) =>
                `<button class="btn filter-btn ${lang}">${lang}</button>`
            )
            .join("")}
          ${add.tools
            .map(
              (tool) =>
                `<button class="btn filter-btn ${tool}">${tool}</button>`
            )
            .join("")}
          </div>
        </article>`;
    })
    .join("");
  cards.innerHTML = adds;
  const card = document.querySelectorAll(".card");

  cards.addEventListener("click", (e) => {
    let currEl = e.target;
    let currElContent = e.target.textContent;
    if (currEl.classList.contains("filter-btn")) {
      filters.push(currElContent);
      sortingBtnsWrapper.innerHTML = updateFilters([...new Set(filters)]);
      updateCards();
    }
    const closeBtn = document.querySelectorAll(".close-btn");
    closeBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let tag = e.currentTarget.previousElementSibling.textContent;
        filters = filters.filter((el) => el !== tag);
        e.currentTarget.parentElement.remove();
        updateFilters(filters);
        updateCards();
      });
    });
  });
  const clearBtn = document.querySelector(".clear-btn");
  clearBtn.addEventListener("click", () => {
    filters = [];
    sortingBtnsWrapper.innerHTML = updateFilters(filters);
    updateCards();
  });
}

function updateCards() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    const btns = card.querySelectorAll("button");
    let check = [];
    for (let btn of btns) {
      check.push(btn.textContent);
    }

    let filterExists = true;
    for (let filter of filters) {
      if (!check.includes(filter)) {
        filterExists = false;
      }
    }
    if (!filterExists) {
      card.classList.remove("show");
    } else {
      card.classList.add("show");
    }
  });
}

function updateFilters(arr) {
  if (!arr.length) {
    sortingBtns.classList.add("hidden");
  } else {
    sortingBtns.classList.remove("hidden");
  }
  return arr
    .map((item) => {
      return `<div class="btns-container flex">
          <div class="btn-wrapper flex">
            <button class="btn flex">${item}</button>
            <button class="close-btn">
              <img src="assets/images/icon-remove.svg" alt="remove element" />
            </button>
          </div>
          `;
    })
    .join("");
}
