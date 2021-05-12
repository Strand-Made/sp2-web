import { url, getToken } from "../../api/data.js";
import messageBox from "../../utilities/messageBox.js";

export async function deleteProduct(id) {
  const deleteButton = document.querySelector("#delete-button");
  deleteButton.addEventListener("click", handleDelete);
  const errorContainer = document.querySelector("#form-error");

  function handleDelete() {
    (async function () {
      const willDelete = confirm(
        "Deleting this product wil permanently remove it from the api. Proceed?"
      );

      if (willDelete) {
        let newUrl = url + "/products/" + id;
        const token = getToken();

        const options = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await fetch(newUrl, options);
          const result = await response.json();
          console.log(result);
          if (result.title) {
            return messageBox(errorContainer, "success", "Delete Successful");
          }
          if (result.error) {
            return messageBox(
              errorContainer,
              "error",
              "Unauthorized action. Please contact your admin"
            );
          }
        } catch (error) {
          messageBox(
            errorContainer,
            "error",
            "An error has occured when trying to delete"
          );
        }
      }
    })();
  }
}
