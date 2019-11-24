<template>
  <q-card class="fit">
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
        @uploaded="uploaded"
        :form-fields="[{name: 'galleryId', value: galleryid}, {name: 'clientId', value: clientid}]"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: ['galleryid', 'clientid'],
  methods: {
    uploaded (info) {
      this.$refs.uploader.removeUploadedFiles()
    }
  }
}
</script>
