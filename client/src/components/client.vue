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
        <q-input
          v-model="client.name"
          label="Client Name"
          filled
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Client',
  props: ['client'],
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
