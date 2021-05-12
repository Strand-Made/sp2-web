import { createNav } from "../../components/navbar.js";
import messageBox from "../../components/messageBox.js";
import { url, saveToken, saveUser } from "../../api/data.js";

createNav();

const form = document.querySelector("#login-form");
const emailInp = document.querySelector("#user-email");
const passwordInp = document.querySelector("#user-password");
const errorContainer = document.querySelector("#form-error");

form.addEventListener("submit", adminLoginHandler);

function adminLoginHandler(event) {
  event.preventDefault();
  const passwordVal = passwordInp.value.trim();
  const emailVal = emailInp.value.trim();

  if (emailVal.length === 0 || passwordVal.length === 0) {
    return messageBox(errorContainer, "warning", "Please check your inputs");
  }

  loggedIn(emailVal, passwordVal);
}

async function loggedIn(username, password) {
  let newUrl = url + "/auth/local";
  const data = JSON.stringify({ identifier: username, password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(newUrl, options);
    const result = await response.json();
    console.log(result);
    if (result.user) {
      saveToken(result.jwt);
      saveUser(result.user);
      location.href = "dashboard.html";
    } else if (result.error) {
      return messageBox(
        errorContainer,
        "error",
        "Sorry, I can't seem to recognize these login details"
      );
    }
  } catch (error) {
    console.log(error);
    messageBox(
      errorContainer,
      "error",
      "An unexpected error has occured, please try again later"
    );
  }
}
