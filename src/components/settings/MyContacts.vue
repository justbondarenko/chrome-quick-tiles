<template>
  <div class="flex flex-col gap-4 items-center pb-4">
    <div class="flex gap-2">
      <Button
        icon="fa-brands fa-instagram"
        severity="secondary"
        text
        rounded
        @click="() => window.open('https://instagram.com/18.bondarenko', '_blank')"
        aria-label="Instagram"
      />
      <Button
        icon="fa-brands fa-github"
        severity="secondary"
        text
        rounded
        @click="() => window.open('https://github.com/justbondarenko', '_blank')"
        aria-label="GitHub"
      />
      <Button
        icon="fa-brands fa-linkedin"
        severity="secondary"
        text
        rounded
        @click="() => window.open('https://www.linkedin.com/in/andrii-bondarenko-8974a3b0/', '_blank')"
        aria-label="LinkedIn"
      />
      <Button
        icon="fa-solid fa-envelope"
        severity="secondary"
        text
        rounded
        @click="() => window.open('mailto:just.bondarenko@gmail.com', '_blank')"
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
