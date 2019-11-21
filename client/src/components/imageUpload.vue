<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Upload Images</div>
    </q-card-section>
    <q-card-section class="flex flex-center">
      <q-uploader
        url="http://localhost:3030/upload"
        no-thumbnails
        buttonClass="bg-green-7 radius04 text-white"
        ref="uploader"
        multiple
        :accept="$attrs.accept || 'image/*'"
        flat
        color="primary"
        text-color="white"
        field-name='uri'
        :headers="[{name: 'Authorization', value: `Bearer ${$store.state.auth.accessToken}`}]"
      />
    </q-card-section>
    <q-card-actions align="around">
      <q-btn
        flat
        label="Upload"
        color="secondary"
        icon="cloud_upload"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import ImageTools from 'src/functions/ImageTools'

export default {
  name: 'ImageUpload',
  computed: {
    canWebP () {
      return !this.$q.platform.is.safari && !this.$q.platform.is.ie
    }
  },
  data () {
    return {
      imgTools: null,
      images: []
    }
  },
  methods: {
    async encodeFile (files) {
      files.forEach(async file => {
        let src = await this.imgTools.resize(file, { width: 1280, height: 1280 })
        let reader = new FileReader()
        reader.addEventListener('load', e => {
          let [, base64] = e.target.result.split(',')
          let filename = this.canWebP ? file.name + '.webp' : file.name
          this.images.push({
            size: src.size,
            type: src.type,
            name: filename,
            base64: base64
          })
        })

        reader.readAsDataURL(src)
      })
    },
    removeFile (files) {
      files.forEach(file => {
        var removeIndex = this.images.map(function (item) { return item.name }).indexOf(file.name)

        if (removeIndex > -1) {
          this.images.splice(removeIndex, 1)
        }
      })
    },
    onError (err) {
      console.log(err)
    },
    upload () {

    }
  },
  mounted () {
    this.imgTools = this.canWebP ? new ImageTools('image/webp') : new ImageTools()
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
