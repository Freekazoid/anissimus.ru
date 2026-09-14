export default async function (context) {
  const language = localStorage.getItem("language")
  localStorage.removeItem('name')
  localStorage.removeItem('contact')
  localStorage.removeItem('description')
  if(language)
    await context.store.dispatch('changeLanguage', language)
  return
}