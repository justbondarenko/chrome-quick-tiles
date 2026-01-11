<template>
  <div class="flex flex-col gap-4 items-center pb-4">
    <div class="flex gap-2">
      <Button
        as="a"
        icon="fa-brands fa-instagram"
        severity="secondary"
        text
        rounded
        href="https://instagram.com/18.bondarenko"
        target="_blank"
        rel="noopener"
        aria-label="Instagram"
      />
      <Button
        as="a"
        icon="fa-brands fa-threads"
        severity="secondary"
        text
        rounded
        href="https://www.threads.com/@18.bondarenko"
        target="_blank"
        rel="noopener"
        aria-label="Threads"
      />
      <Button
        as="a"
        icon="fa-brands fa-github"
        severity="secondary"
        text
        rounded
        href="https://github.com/justbondarenko"
        target="_blank"
        rel="noopener"
        aria-label="GitHub"
      />
      <Button
        as="a"
        icon="fa-brands fa-linkedin"
        severity="secondary"
        text
        rounded
        href="https://www.linkedin.com/in/andrii-bondarenko-8974a3b0/"
        target="_blank"
        rel="noopener"
        aria-label="LinkedIn"
      />
      <Button
        as="a"
        icon="fa-solid fa-envelope"
        severity="secondary"
        text
        rounded
        href="mailto:just.bondarenko@gmail.com"
        target="_blank"
        rel="noopener"
        aria-label="Email"
      />
    </div>
    <a href="https://www.buymeacoffee.com/justbondarenko" target="_blank">
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style="height: 42px !important; width: 152px !important"
      />
    </a>
  </div>
</template>

<script setup>
import Button from 'primevue/button'

defineProps({
  settingsStore: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
