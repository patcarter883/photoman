<template>
  <q-page>
    <q-toolbar class="text-primary">
      <q-btn
        flat
        dense
        icon="add"
        label="Add Images"
        @click="drawerRight = true"
      />
    </q-toolbar>
    <FeathersVuexFind
      service="images"
      :query="{}"
      watch="query"
    >
      <div
        class="q-gutter-md q-pa-md row"
        slot-scope="{ items: images }"
      >
        <image-block
          v-for="image in images"
          :key="image._id"
          :image="image"
        />
      </div>
    </FeathersVuexFind>

    <right-drawer
      no-padding
      v-model="drawerRight"
    >

      <image-upload />

    </right-drawer>

  </q-page>
</template>

<script>
import ImageBlock from 'components/image'
import RightDrawer from 'components/RightDrawer'

export default {
  name: 'GalleryDetail',
  components: {
    ImageBlock,
    RightDrawer,
    'image-upload': () => import('components/imageUpload')
  },
  data () {
    return {
      drawerRight: false
    }
  }
}
</script>
