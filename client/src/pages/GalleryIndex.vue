<template>
  <q-page
    padding
    class="q-pt-none"
  >
    <q-toolbar class="text-primary">

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
        <gallery-card
          v-for="gallery in galleries"
          :key="gallery._id"
          :gallery="gallery"
        />
      </div>
    </FeathersVuexFind>

    <right-drawer v-model="drawerRight">
      <FeathersVuexFormWrapper
        v-if="selectedGallery"
        :item="selectedGallery"
        watch
      >
        <template v-slot="{ clone, save, reset, remove }">
          <gallery
            :gallery="clone"
            @save="save().then(drawerRight = false)"
            @close="() => {
              drawerRight = false
              reset
            }"
            @remove="() => {
              drawerRight = false
              remove
            }"
          />
        </template>
      </FeathersVuexFormWrapper>

    </right-drawer>
    <portal to="admin-menu">
      <q-btn
        v-if="$hasRoles(['superadmin'])"
        flat
        dense
        icon="add"
        label="New Gallery"
        @click="selectedGallery = new $FeathersVuex.api.Gallery({}); drawerRight = true"
      />
    </portal>
  </q-page>
</template>

<script>
import GalleryCard from 'components/galleryCard'
import RightDrawer from 'components/RightDrawer'
import Gallery from 'components/gallery'

export default {
  name: 'GalleryIndex',
  components: {
    GalleryCard,
    RightDrawer,
    Gallery
  },
  data () {
    return {
      drawerRight: false,
      selectedGallery: null
    }
  }
}
</script>
