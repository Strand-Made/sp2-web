export default function messageBox(container, tone, content) {
  if (tone === "error") {
    tone = "bg-red-500 text-red-50";
  } else if (tone === "success") {
    tone = "bg-yellow-300 text-yellow-900";
  } else if (tone === "warning") {
    tone = "bg-yellow-800 text-yellow-50 ";
  } else {
    throw "Please include error, success or warning in your message";
  }

  container.innerHTML = ` <div class="rounded text-center max-w-sm mx-auto text-sm p-2 ${tone}"
                            <p>${content}</p> 
                          </div>
    
    `;
}
