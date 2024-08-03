document.addEventListener('click', (e) => {
  // not clicked on anchor tag
  const closestAnchor = e.target?.closest('a');
  if (!closestAnchor) {
    return;
  }
  // not clicked on alt or option key
  if (!e.altKey) {
    return;
  }

  // disable the "alt/option + click" download shortcut combo
  e.preventDefault();
  console.log(`Disabled "alt/option + click" download shortcut combo for link: ${closestAnchor.innerText}`);
});
