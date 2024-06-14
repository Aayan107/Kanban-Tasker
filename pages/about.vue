<script lang="ts" setup>
useSeoMeta({
  title: 'About',
  ogTitle: 'About',
})

const features = [
  { title: 'Responsive web design - Display the best layout according to the screen size of the device' },
  { title: 'View the hover status of all interactive elements on the page' },
  { title: 'Add, read, update, and delete boards and tasks' },
  { title: 'Display form validation information when adding and editing boards and tasks' },
  { title: 'Mark subtasks as completed and move tasks between columns' },
  { title: 'Hide or show the board sidebar' },
  { title: 'Toggle between light and dark mode' },
  {
    title: 'Allow users to drag and change data',
    list: [
      'Drag board icons to reorder them in the board sidebar',
      'Drag column names to reorder them within the board',
      'Drag tasks between columns to change status and reorder them',
      'Drag subtasks within task details to reorder them',
    ],
  },
  { title: 'Track changes, even after refreshing the page (using localStorage)' },
  { title: 'Display confirmation dialog before leaving the page when creating/editing boards and tasks' },
]

const built = [
  { name: 'Vue 3', desc: 'JavaScript framework', link: 'https://vuejs.org' },
  { name: 'Vue Router 4', desc: 'Official router for Vue.js', link: 'https://router.vuejs.org' },
  { name: 'Pinia 2', desc: 'State management library for Vue.js', link: 'https://pinia.vuejs.org' },
  { name: 'Nuxt 3', desc: 'Vue framework', link: 'https://nuxt.com' },
  { name: 'SCSS', desc: 'CSS extension language', link: 'https://sass-lang.com' },
  { name: 'VueUse', desc: 'Collection of composition APIs for Vue', link: 'https://vueuse.org' },
  { name: 'VueDraggablePlus', desc: 'Drag and drop components', link: 'https://alfred-skyblue.github.io/vue-draggable-plus' },
  { name: 'nuxt-svgo', desc: 'Nuxt module - SVG files', link: 'https://github.com/cpsoinos/nuxt-svgo' },
  { name: 'Nuxt Google Fonts', desc: 'Nuxt module - Google Fonts', link: 'https://google-fonts.nuxtjs.org/' },
  { name: '@antfu/eslint-config', desc: 'Code style configuration', link: 'https://github.com/antfu/eslint-config' },
]

const acknowledgments = [
  {
    title: 'Implement dark mode and light mode switching for web pages by Mark',
    link: 'https://blog.tarswork.com/post/implement-dark-mode-and-light-mode-for-web-pages',
  },
  {
    title: 'Dark Theme Switcher in Vue.js by yestellar',
    link: 'https://github.com/yestellar/vue_theme_switcher#dark-theme-switcher-in-vuejs',
  },
  {
    title: 'Best-README-Template by othneildrew',
    link: 'https://github.com/othneildrew/Best-README-Template',
  },
]

const design = [
  {
    title: 'Frontend Mentor challenge README',
    link: 'https://github.com/yuna9068/kanban-task-management/blob/main/docs/design/README.md',
  },
  {
    title: 'Desktop design',
    link: 'https://github.com/yuna9068/kanban-task-management/blob/main/docs/design/preview.jpg',
  },
  {
    title: 'Add Task',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/ehqvxlqbe1q4m22wwuvm.jpg',
  },
  {
    title: 'View Task',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/iv8e2bbeplbfs641jksi.jpg',
  },
  {
    title: 'Tablet design',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/zdp0qj2lisrfwomfbrxo.jpg',
  },
  {
    title: 'Mobile design',
    link: 'https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/uzyruyovh7rvfter09tp.jpg',
  },
]

const gitHub = [
  {
    title: 'Profile',
    link: 'https://github.com/yuna9068',
  },
  {
    title: 'Repository',
    link: 'https://github.com/yuna9068/kanban-task-management',
  },
  {
    title: 'README',
    link: 'https://github.com/yuna9068/kanban-task-management/blob/main/README.md',
  },
]
</script>

<template>
  <div class="about">
    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title sr-only">
          About
        </h3>
      </div>
      <div class="section-content">
        Based on
        <NuxtLink
          class="link"
          to="https://www.frontendmentor.io"
          target="_blank"
          external
        >
          Frontend Mentor
        </NuxtLink>
        website
        <NuxtLink
          class="link"
          to="https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB"
          target="_blank"
          external
        >
          Kanban task management web app
        </NuxtLink>
        challenge provided design
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Features
        </h3>
      </div>
      <div class="section-content">
        <ul
          v-for="feature in features"
          :key="feature.title"
          class="list"
        >
          <li>
            <p>{{ feature.title }}</p>
            <ul class="list">
              <li
                v-for="item in feature.list"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Built with
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in built"
            :key="item.name"
          >
            <template v-if="item.link">
              <NuxtLink
                class="link"
                :to="item.link"
                target="_blank"
                external
              >
                {{ item.name }}
              </NuxtLink>
              :&nbsp;{{ item.desc }}
            </template>
            <template v-else>
              {{ item.name }}
            </template>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Acknowledgments
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in acknowledgments"
            :key="item.title"
          >
            <NuxtLink
              class="link"
              :to="item.link"
              target="_blank"
              external
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          Design files
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in design"
            :key="item.title"
          >
            <NuxtLink
              class="link"
              :to="item.link"
              target="_blank"
              external
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h3 class="section-heading-title">
          GitHub
        </h3>
      </div>
      <div class="section-content">
        <ul class="list">
          <li
            v-for="item in gitHub"
            :key="item.title"
          >
            <NuxtLink
              class="link"
              :to="item.link"
              target="_blank"
              external
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about {
  margin: 0 auto;
  padding: 30px 10%;
  letter-spacing: 1.5px;
}

.section {
  margin-bottom: 20px;

  &-heading-title {
    color: var(--text-secondary-color);
    font-size: 18px;
    font-weight: 700;
    line-height: 2;
    text-align: center;
  }

  &-content {
    @include text-l;

    padding: 0 1em;
  }
}

.link {
  color: $primary;
  text-shadow: none;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: $primary-light;
  }
}

.list {
  padding-left: 1em;
  list-style: circle;
}
</style>
