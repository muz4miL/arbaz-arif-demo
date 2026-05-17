/**
 * Inline script run before React hydrates.
 * Removes attributes injected by Bitdefender, Honey, Grammarly, etc.
 * that cause false-positive hydration mismatches in dev.
 */
export const STRIP_EXTENSION_ATTRS_SCRIPT = `
(function () {
  var PATTERN = /^(bis_|__processed|data-new-gr|his-skip|big-skin)/i;
  function strip(root) {
    var nodes = root ? [root] : [document.documentElement];
    if (root && root.querySelectorAll) {
      nodes = [root].concat(Array.prototype.slice.call(root.querySelectorAll("*")));
    } else if (!root) {
      nodes = [document.documentElement].concat(
        Array.prototype.slice.call(document.querySelectorAll("*"))
      );
    }
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.nodeType !== 1 || !el.attributes) continue;
      for (var j = el.attributes.length - 1; j >= 0; j--) {
        var name = el.attributes[j].name;
        if (PATTERN.test(name)) el.removeAttribute(name);
      }
    }
  }
  strip();
  requestAnimationFrame(function () { strip(); });
})();
`.trim();
