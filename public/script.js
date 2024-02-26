var listDiv = document.querySelector("#list");
var uncapitalizedWords = [
    "a", "an", "the", "and", "but", "or", "nor", "for", "with",
    "in", "on", "at", "by", "to", "of", "as", "if", "at", "from"
];
var isUpperCaseAt = function (str, i) { return 65 <= str.codePointAt(i) && str.codePointAt(i) < 91; };
function capitalize(str) {
    for (var i = str.length - 1; i > 0; --i)
        if (isUpperCaseAt(str, i) && !isUpperCaseAt(str, i - 1))
            str = str.slice(0, i) + " " + str.slice(i);
    return str.split(" ").map(function (s) { return (s ? (uncapitalizedWords.includes(s.toLowerCase()) ?
        s[0].toLowerCase() + s.slice(1)
        : s[0].toUpperCase() + s.slice(1)) : s); }).join(" ");
}
var comparators = {
    ">=": " &ge; ",
    "<=": " &le; ",
    ">": " &gt; ",
    "<": " &gt; "
};
function versionString(version) {
    if (version === "*")
        return "";
    if (version instanceof Array)
        return " [ " + version.join(", ") + " ]";
    for (var _i = 0, _a = Object.keys(comparators); _i < _a.length; _i++) {
        var k = _a[_i];
        if (version.startsWith(k))
            return comparators[k] + version.slice(k.length);
    }
    return version;
}
var list = function (arr) { return Object.keys(arr).map(function (k) { return "<code>" + k + versionString(arr[k]) + "</code>"; }).join(", "); };
var template = function (_a) {
    var id = _a.id, version = _a.version, name = _a.name, description = _a.description, depends = _a.depends, breaks = _a.breaks;
    return "\n  <div class=\"modslist-item position-relative\">\n    <code>" + id + "@" + version + "</code>\n    <h2 class=\"my-3\">" + capitalize(name) + "</h2>\n    <p>" + description + "</p>\n    " + (depends ? /* html */ "\n    <p>\n      Dependencies: " + list(depends) + "\n    </p>\n    " : "") + "\n    " + (breaks ? /* html */ "\n    <p>\n      Incompatibilities: " + list(breaks) + "\n    </p>\n    " : "") + "\n  </div>\n";
};
fetch("/get_modslist", { method: "GET" }).then(function (response) { return response.json(); }).then(function (modsList) {
    // console.log(modsList);
    listDiv.innerHTML = modsList.map(template).join("\n");
});
