export default function messageBox(container, style, content) {
  container.innerHTML = ` <div class="${style}"><p>${content}</p> </div>
    
    `;
}
