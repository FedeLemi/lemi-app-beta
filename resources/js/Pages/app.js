import { createApp, h } from "vue"
import { createInertiaApp } from "@inertiajs/vue3"
import { createPinia } from "pinia"
import i18n from "./i18n"
import "../css/app.css"

const appName = "Lemi Finance"

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.vue", { eager: true })
    return pages[`./Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(createPinia())
      .use(i18n)

    return app.mount(el)
  },
  progress: {
    color: "#7c3aed",
  },
})
