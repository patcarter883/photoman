<template>
  <q-layout
    view="lHh Lpr lFf"
    container
    style="height:100vh"
  >
    <q-header>
      <q-toolbar>
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
        <div class="q-gutter-sm">
          <q-input
            v-model="gallery.name"
            label="Gallery Name"
            filled
          />
          <q-select
            filled
            v-model="gallery.client"
            :options="clients"
            label="Client"
            option-value="_id"
            option-label="name"
            emit-value
            map-options
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

export default {
  name: 'Gallery',
  mixins: [makeFindMixin({ service: 'clients' })],
  props: ['gallery'],
  computed: {
    clientsParams () {
      return { query: {} }
    }
  },
  data () {
    return {}
  },
  methods: {
    remove () {
      this.$q.dialog({
        title: 'Confirm Delete',
        message: 'Are you sure you wish to delete this?',
        cancel: {
          label: 'Cancel'
        },
        ok: {
          label: 'Delete',
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.$emit('remove')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>
