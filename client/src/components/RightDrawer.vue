<template>
  <q-drawer
    side="right"
    :value="value"
    @input="$emit('input', $event)"
    overlay
    :width="$attrs.width || $q.platform.is.mobile ? $q.screen.width : $q.screen.width * 0.35"
    content-class="bg-grey-4"
    v-bind="$attrs"
    behavior="mobile"
    v-on="$listeners"
    no-swipe-close
    no-swipe-open
    no-swipe-background
  >
    <slot name="toolbar">

    </slot>

    <q-layout
      view="lHh Lpr lFf"
      container
      style="height:100vh"
      :class="{'q-pa-sm': !noPadding}"
    >
      <q-page-container>
        <q-page
          class="flex flex-center"
          style="padding-top: 52px"
        >
          <slot></slot>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-drawer>
</template>

<script>
export default {
  name: 'RightDrawer',
  props: {
    'value': Boolean,
    'noPadding': Boolean
  }
}
</script>
