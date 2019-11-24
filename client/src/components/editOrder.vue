<template>
  <q-layout
    view="lHh Lpr lFf"
    container
    style="height:100vh"
  >
    <q-header>
      <q-toolbar>
        <q-toolbar-title shrink>
          Current Order
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          color="secondary"
          icon="save"
          @click="$emit('save')"
        />
        <q-btn
          flat
          dense
          round
          icon="delete"
          color="negative"
          @click="remove()"
        />
        <q-space />
        <q-btn
          flat
          dense
          round
          icon="close"
          @click="$emit('close')"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding>
        <q-list>
          <q-item
            v-for="image in order.images"
            :key="image._id"
          >
            <q-item-section thumbnail>
              <img
                :src="imageUri(image)"
                style="height: 75px; width: auto;"
              >
            </q-item-section>
            <q-item-section>
              <div class="row">
                <div class="col-4">
                  {{ image.name }}
                </div>
                <div class="col-8">
                  <div
                    class="row no-wrap items-center"
                    v-for="size in image.sizes.filter(f => f.qty > 0)"
                    :key="size.id"
                  >
                    <div class="col-9">
                      {{ size.label }}
                    </div>
                    <div class="col-3">
                      {{ size.qty }}
                    </div>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { models } from 'feathers-vuex'

export default {
  name: 'EditOrder',
  props: ['order'],
  data () {
    return {}
  },
  methods: {
    imageUri (image) {
      return models.api.Upload.getFromStore(image.blobId).uri
    }
  }
}
</script>
