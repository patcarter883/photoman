<template>
  <FeathersVuexGet
    service="upload"
    :id="image.blobId"
    :queryWhen="!isImageLocal"
  >
    <div slot-scope="{ item: upload, isGetPending }">
      <div
        v-if="isGetPending"
        class="loading"
      > loading... </div>
      <q-img
        v-else
        :src="upload.uri"
        style="width: 100%"
      >
        <div class="absolute-bottom text-subtitle1 text-center">
          {{ image.name }}
        </div>
        <div
          class="absolute-top-right text-subtitle2"
          style="padding: 0; background: none"
        >
          <q-btn
            flat
            round
            size='sm'
            dense
            icon="pageview"
            @click="preview(upload)"
          />
        </div>
        <div
          class="absolute-top-left text-subtitle2"
          style="padding: 0; background: none"
        >
          <q-btn
            flat
            round
            size='sm'
            dense
            icon="add_shopping_cart"
            @click="addToCart()"
          />
        </div>
      </q-img>
    </div>
  </FeathersVuexGet>
</template>

<script>
export default {
  name: 'ImageBlock',
  props: ['image'],
  data () {
    return {}
  },
  computed: {
    isImageLocal () {
      return (Boolean)(this.$store.getters['upload/get'](this.image.blobId))
    }
  },
  methods: {
    preview (upload) {
      this.$emit('preview', { ...this.image, uri: upload.uri })
    },
    addToCart () {
      this.$emit('toCart', this.image)
    }
  }
}
</script>
