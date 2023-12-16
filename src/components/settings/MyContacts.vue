<template>
  <div class="contacts flex flex-col gap-4 items-center pb-4">
    
    <ul class="menu menu-horizontal bg-base-200 rounded-box">
      <li>
        <a href="https://instagram.com/18.bondarenko" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'instagram']" size="xl" />
        </a>
      </li>
      <li>
        <a href="https://x.com/ndr_ua" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'twitter']" size="xl" />
        </a>
      </li>
      <li>
        <a href="https://github.com/justbondarenko" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'github']" size="xl" />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/andrii-bondarenko-8974a3b0/" target="_blank">
          <FontAwesomeIcon :icon="['fab', 'linkedin']" size="xl" />
        </a>
      </li>
      <li>
        <a href="mailto:just.bondarenko@gmail.com" target="_blank">
          <FontAwesomeIcon :icon="['fas', 'envelope']" size="xl" />
        </a>
      </li>
    </ul>
    <a href="https://www.buymeacoffee.com/justbondarenko" target="_blank">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"
        style="height: 42px !important;width: 152px !important;">
    </a>
  </div>
</template>