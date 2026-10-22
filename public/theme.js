/* Runs before paint; content and controls hydrate independently of this attribute. */
;(function () {
  var preference = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  try {
    var saved = localStorage.getItem('kg-theme')
    if (saved === 'light' || saved === 'dark') preference = saved
  } catch {
    /* Storage is optional. */
  }
  document.documentElement.dataset.theme = preference
})()
