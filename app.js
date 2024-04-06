"use strict";

const inputsTags = [...document.querySelectorAll("input")];
const submitBtn = document.querySelector("#submitBtn");
const imgRecept = document.querySelector("input[name = imgRecept]");
const errorFileMessage = document.querySelector("#errorMessage");
const inputCheckbox = document.querySelector("input[name = checkbox]");

const exchanges = document.querySelector("#exchanges");
const form = document.querySelector("form");

inputCheckbox.addEventListener("change", function () {
  if (this.checked) {
    submitBtn.style.cursor = "pointer";
    submitBtn.removeAttribute("disabled");
    console.log("checked");
  } else {
    submitBtn.style.cursor = "not-allowed";
    submitBtn.setAttribute("disabled", "");
  }
});

//logic of submit of form
submitBtn.addEventListener("click", () => {
  //   e.preventDefault();
  inputsTags.forEach((input) => {
    input.addEventListener("invalid", (item) => {
      if (input.validity.valueMissing || input.validity.tooShort) {
        item.target.setCustomValidity(". این قسمت نیز باید پر شود  ");
        // Change border-color to red for invalid input
        item.target.style.borderColor = "red";
      } else {
        // Reset border-color
        item.target.style.borderColor = "";
      }
    });
  });
  if (inputCheckbox.checked) {
    form.setAttribute(
      "action",
      `https://ex.uchush.com/?add-to-cart=${exchanges.value}&quantity=1`
    );
  }
});

// https://ex.uchush.com/?add-to-cart=778&quantity=3

// add js for img size
imgRecept.addEventListener("change", (event) => {
  let input = event.target;
  let maxFileSize = 3 * 1024 * 1024; // Set the maximum file size to 3MB
  let errorMessage = document.getElementById("errorMessage");

  for (let i = 0; i < input.files.length; i++) {
    let file = input.files[i];
    if (file.size > maxFileSize) {
      errorFileMessage.style.display = "inline-block";
      input.value = ""; // Clear selected files
      return; // Exit the loop
    }
  }
  errorMessage.style.display = "none";
});
