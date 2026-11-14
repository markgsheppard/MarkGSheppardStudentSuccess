/* Simple password overlay for the draft site. Not real security: it hides the page from casual visitors. */
(function () {
  var PASSWORD = "sheppard2026";
  try { sessionStorage.removeItem("mgs-draft-unlocked"); } catch (e) {}

  var style = document.createElement("style");
  style.textContent =
    "#app{filter:blur(7px);pointer-events:none;user-select:none}" +
    "html.gate-on,html.gate-on body{overflow:hidden}";
  document.head.appendChild(style);
  document.documentElement.classList.add("gate-on");

  function build() {
    var gate = document.createElement("div");
    gate.id = "gate";
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "gate-title");
    gate.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(43,38,34,0.72);display:flex;align-items:center;justify-content:center;padding:20px;font-family:'Inter','Helvetica Neue',Arial,sans-serif";
    gate.innerHTML =
      '<form id="gate-form" style="background:#fff;color:#2B2622;width:100%;max-width:440px;border-top:6px solid #1A4E8A;padding:32px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box">' +
        '<p style="margin:0;font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:#1A4E8A">Personal working page</p>' +
        '<h1 id="gate-title" style="margin:0;font-family:\'Inter\',\'Helvetica Neue\',Arial,sans-serif;font-size:26px;line-height:1.2">Mark G. Sheppard: Job Market &amp; Research Pathways</h1>' +
        '<p style="margin:0;font-size:16px;line-height:1.55;color:#4A433D">This page is maintained by <strong style="color:#333333">Mark G. Sheppard</strong> for his own use. It is not for public distribution or comment.</p>' +
        '<label for="gate-pw" style="font-size:15px;font-weight:700;margin-top:4px">Password</label>' +
        '<input id="gate-pw" type="password" autocomplete="off" style="font:inherit;font-size:16px;min-height:46px;padding:8px 12px;border:1px solid #B8ACA0;box-sizing:border-box;width:100%">' +
        '<p id="gate-err" role="alert" style="margin:0;min-height:20px;font-size:14px;color:#A32D2D"></p>' +
        '<button type="submit" style="font:inherit;font-size:16px;font-weight:700;min-height:48px;background:#1A4E8A;color:#fff;border:0;cursor:pointer">View the draft</button>' +
        '<p style="margin:0;font-size:13px;color:#5E564F">Questions? <a href="mailto:msheppard@gradcenter.cuny.edu" style="color:#1A4E8A">msheppard@gradcenter.cuny.edu</a></p>' +
      '</form>';
    document.body.appendChild(gate);
    var pw = document.getElementById("gate-pw");
    var err = document.getElementById("gate-err");
    pw.focus();
    pw.addEventListener("input", function () { err.textContent = ""; });
    document.getElementById("gate-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = pw.value.trim().toLowerCase();
      if (!v) { err.textContent = "Enter the password first."; return; }
      if (v !== PASSWORD) { err.textContent = "That password isn't right. Try again."; pw.select(); return; }
      gate.remove();
      style.remove();
      document.documentElement.classList.remove("gate-on");
    });
  }
  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
