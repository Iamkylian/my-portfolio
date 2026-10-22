import { languageFromPath, localizedPath } from '#shared/languages'

export default defineNuxtRouteMiddleware((to) => {
  if (!languageFromPath(to.path)) {
    return navigateTo(localizedPath(to.fullPath), { redirectCode: 301 })
  }
})
