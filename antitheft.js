// Disable right click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});
// Disable F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+S, Ctrl+P
document.onkeydown = function(e) {
  // F12
  if(e.keyCode === 123) return false;
  // Ctrl+Shift+I/C/U/C/P/S
  if(e.ctrlKey && (e.shiftKey && (
    e.keyCode === 73 || // I
    e.keyCode === 67    // C
  ))) return false;
  if(e.ctrlKey && (
    e.keyCode === 85 || // U
    e.keyCode === 83 || // S
    e.keyCode === 80    // P
  )) return false;
};
// Prevent selecting text (just in case)
document.body.style.userSelect = 'none';
// Remove copy/cut
document.addEventListener('copy', function(e) { e.preventDefault(); });
document.addEventListener('cut', function(e) { e.preventDefault(); });
// Remove drag
document.addEventListener('dragstart', function(e) { e.preventDefault(); });
