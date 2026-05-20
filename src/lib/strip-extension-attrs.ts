/**
 * Runs before React hydrates (beforeInteractive).
 * Bitdefender / Honey / Grammarly inject attrs like bis_skin_checked on hidden
 * divs — including Next.js metadata markup — which triggers false hydration errors.
 */
export const STRIP_EXTENSION_ATTRS_SCRIPT = `
(function () {
  if (typeof document === "undefined") return;
  var PATTERN = /^(bis_|__processed|data-new-gr|his-skip|big-skin|cz-shortcut)/i;

  function stripNode(el) {
    if (!el || el.nodeType !== 1 || !el.attributes) return;
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      var name = el.attributes[i].name;
      if (PATTERN.test(name)) el.removeAttribute(name);
    }
  }

  function stripTree(root) {
    stripNode(root);
    if (root && root.querySelectorAll) {
      var list = root.querySelectorAll("*");
      for (var i = 0; i < list.length; i++) stripNode(list[i]);
    }
  }

  function stripAll() {
    stripTree(document.documentElement);
  }

  stripAll();

  var observer = new MutationObserver(function (records) {
    for (var r = 0; r < records.length; r++) {
      var rec = records[r];
      if (rec.type === "attributes") {
        stripNode(rec.target);
        continue;
      }
      for (var n = 0; n < rec.addedNodes.length; n++) {
        var node = rec.addedNodes[n];
        if (node.nodeType === 1) stripTree(node);
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
  });

  document.addEventListener("DOMContentLoaded", stripAll);
  window.addEventListener("load", stripAll);

  setTimeout(function () {
    stripAll();
    observer.disconnect();
  }, 8000);
})();
`.trim();
