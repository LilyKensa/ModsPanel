const listDiv = document.querySelector("#list") as HTMLElement;

const uncapitalizedWords = [ 
  "a", "an", "the", "and", "but", "or", "nor", "for", "with", 
  "in", "on", "at", "by", "to", "of", "as", "if", "at", "from" 
];
let isUpperCaseAt = (str: string, i: number) => 65 <= str.codePointAt(i)! && str.codePointAt(i)! < 91;

function capitalize(str: string) {
  for (let i = str.length - 1; i > 0; --i)
    if (isUpperCaseAt(str, i) && !isUpperCaseAt(str, i - 1))
    	str = str.slice(0, i) + " " + str.slice(i);
  
  return str.split(" ").map(s => (
    s ? (
      uncapitalizedWords.includes(s.toLowerCase()) ? 
        s[0].toLowerCase() + s.slice(1) 
      : s[0].toUpperCase() + s.slice(1)
    ) : s
  )).join(" ");
}

const comparators = { 
  ">=": " &ge; ", 
  "<=": " &le; ", 
  ">" : " &gt; ", 
  "<" : " &gt; " 
}
function versionString(version: string | Array<string>) {
  if (version === "*") 
    return "";
  if (version instanceof Array) 
    return ` [ ${version.join(", ")} ]`;

  for (let k of Object.keys(comparators)) {
    if (version.startsWith(k))
      return comparators[k] + version.slice(k.length)
  }

  return version;
}

let list = (arr: Array<string>) => Object.keys(arr).map(k => `<code>${k}${versionString(arr[k])}</code>`).join(", ")

let template = ({ filename, id, version, name, description, author, depends, breaks }) => /* html */ `
  <div class="modslist-item position-relative">
    <div class="info">
      <code>${filename}</code>
      &nbsp;·&nbsp;
      <code>${author}</code>
      &nbsp;-&nbsp;
      <code>${id}@${version}</code>
    </div>
    <h2 class="my-3"><b>${capitalize(name)}</b></h2>
    <p>${description}</p>
    ${depends ? /* html */ `
    <p>
      Dependencies: ${list(depends)}
    </p>
    ` : ""}
    ${breaks ? /* html */ `
    <p>
      Incompatibilities: ${list(breaks)}
    </p>
    ` : ""}
    <div class="buttons d-flex">
      <label class="switch">
        <input type="checkbox" checked>
        <span class="slider"></span>
      </label>
      <div class="btn btn-outline-danger">
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  </div>
`;

fetch(`/get_modslist`, { method: "GET" }).then(response => response.json()).then(modsList => {
  listDiv.innerHTML = modsList.map(template).join("\n");
});

// back to top button
window.addEventListener("load", () => {
  let backToTopButton = document.querySelector("#back-to-top") as HTMLElement;

  backToTopButton.addEventListener("click", (ev) => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  });

  let hideOrShowBackToTopButton = () => {
    console.log(document.body.scrollTop);
  }
  document.body.addEventListener("scroll", hideOrShowBackToTopButton);
  hideOrShowBackToTopButton();
});