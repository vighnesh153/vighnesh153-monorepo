function addCopyButtons() {
  document.querySelectorAll("li.CommitLog-item").forEach((listItem, index) => {
    const sha = listItem.querySelector("a.CommitLog-sha1");
    const shaLink = sha.href;
    const shaText = sha.textContent;

    const description = listItem.querySelectorAll("a")[1].innerText;

    const copyStr = `${description} ([${shaText}](${shaLink}))`;

    const copyEl = document.createElement("button");
    copyEl.innerText = "copy";
    copyEl.style.marginRight = "5px";
    copyEl.style.background = "transparent";
    copyEl.style.border = "none";
    copyEl.style.cursor = "pointer";
    copyEl.style.color = "blue";
    copyEl.style.textDecoration = "underline";
    listItem.insertBefore(copyEl, listItem.firstChild);

    copyEl.addEventListener("click", () => {
      navigator.clipboard.writeText(copyStr);
      Toastify({
        text: "Copied to clipboard!",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });
  });
}

function main() {
  console.log("Pikachu rocks!");
  setTimeout(addCopyButtons, 1000);
}

main();
