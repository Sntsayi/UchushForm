"use strict";

const inputsTags = [...document.querySelectorAll("input")];
const submitBtn = document.querySelector("#submitBtn");
const errorFileMessage = document.querySelector("#errorMessage");
const inputCheckbox = document.querySelector("input[name = checkbox]");
const form = document.querySelector("form");
// for Email.js
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const phoneNum = document.getElementById("phoneNum");
const emailAddr = document.getElementById("emailAddr");
const exchanges = document.getElementById("exchanges");
const countries = document.getElementById("countries");
const userEnName = document.getElementById("userEnName");
const bankName = document.getElementById("bankName");
const cardNum = document.getElementById("cardNum");
const imgRecept = document.querySelector("input[name = imgRecept]");
// for Email.js

//logic of the checkBox
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
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //Reset custom validity for all inputs
  inputsTags.forEach((input) => {
    input.setCustomValidity("");
    input.style.borderColor = ""; // Reset border color
    input.style.borderWidth = ".1rem";
  });

  // Check validity of each input
  let isValid = true;
  inputsTags.forEach((input) => {
    if (input.validity.valueMissing) {
      input.setCustomValidity("این قسمت باید پر شود");
      input.style.borderColor = "red"; // Change border color for invalid input
      input.style.borderWidth = ".3rem";
      isValid = false;
    }
  });

  // Submit the form if all inputs are valid

  if (inputCheckbox.checked && isValid) {
    // Initialize EmailJS with your user ID
    emailjs.init("h1_UU4dvaaGsDaVFe");
    sendEmail();

    function sendEmail() {
      let parameters = {
        userFName: fName.value,
        userLName: lName.value,
        phone: phoneNum.value,
        email: emailAddr.value,
        exchange: exchanges.value,
        country: countries.value,
        englishName: userEnName.value,
        bankNameEn: bankName.value,
        cardNum: cardNum.value,
        recetionImg: imgRecept.value,
      };
      // Replace 'your_service_id' and 'your_template_id' with actual IDs
      emailjs.send("service_zzmgmwe", "template_ayhs2ek", parameters).then(
        function (response) {
          console.log("Email sent successfully:", response);
          document.location = `https://ex.uchush.com/?add-to-cart=${exchanges.value}&quantity=1`;
          alert("Email sent successfully!");
        },
        function (error) {
          console.error("Email sending failed:", error);
          alert("Email sending failed!");
        }
      );
    }

    // form.setAttribute(
    //   "action",
    //   `https://ex.uchush.com/?add-to-cart=${exchanges.value}&quantity=1`
    // );
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
