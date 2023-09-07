<template>
  <button :class="style.button">
    <slot />
  </button>
</template>

<style lang="scss" module="style">
.button {
  padding: 0.6rem 1.25rem;
  background-color: #747bff;
  border: 0;

  &:hover {
    background-color: #535bf2;
  }
}
</style>
