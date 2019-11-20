<template>
  <q-page padding>
    <FeathersVuexFind
      service="galleries"
      :query="{}"
      watch="query"
    >
      <div slot-scope="{ items: galleries }">
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
