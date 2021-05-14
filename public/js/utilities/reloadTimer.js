// reload window after 3 seconds
export function updateWindow(message) {
  message;
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
