/* Static-host fallback: preserve query parameters and the fragment when adding /en/. */
;(function () {
  var link = document.getElementById('language-redirect')
  if (!link) return
  var target = new URL(link.href)
  if (target.origin !== location.origin) return
  target.search = location.search
  target.hash = location.hash
  location.replace(target.href)
})()
