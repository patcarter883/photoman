<template>
  <q-card class="my-card">
    <q-card-section class="flex flex-center">
      {{ gallery.name }}
    </q-card-section>
    <q-card-actions align="around">
      <q-btn
        flat
        label="view"
        color="secondary"
        icon="remove_red_eye"
        :to="`/gallery/${gallery._id}`"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'Gallery',
  props: ['gallery'],
  data () {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
