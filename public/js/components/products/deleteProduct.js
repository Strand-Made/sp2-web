import { url, getToken } from "../../api/data.js";
import messageBox from "../../components/messageBox.js";

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
            return messageBox(
              errorContainer,
              "bg-yellow-400 text-yellow-900 rounded p-3 mx-2",
              "Delete Successful"
            );
          }
          if (result.error) {
            return messageBox(
              errorContainer,
              "bg-red-400 text-red-900 rounded p-3 mx-2",
              "Unauthorized action. Please contact your admin"
            );
          }
        } catch (error) {
          messageBox(
            errorContainer,
            "bg-red-400 text-red-900 rounded p-3 mx-2",
            "An error has occured when trying to delete"
          );
        }
      }
    })();
  }
}
