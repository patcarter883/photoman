<template>
  <q-page>
    <q-toolbar class="text-primary">
      <q-btn
        flat
        dense
        icon="add"
        label="New Gallery"
      />
    </q-toolbar>
    <FeathersVuexFind
      service="galleries"
      :query="{}"
      watch="query"
    >
      <div
        class="q-gutter-md q-pa-md row"
        slot-scope="{ items: galleries }"
      >
        <gallery
          v-for="gallery in galleries"
          :key="gallery._id"
          :gallery="gallery"
        />
      </div>
    </FeathersVuexFind>
  </q-page>
</template>

<script>
import Gallery from 'components/gallery'

export default {
  name: 'GalleryIndex',
  components: {
    Gallery
  },
  created () {

  }
}
</script>
