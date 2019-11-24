<template>
  <q-page
    padding
    class="q-pt-none"
  >
    <q-toolbar class="text-primary">
      <q-btn
        flat
        dense
        icon="add"
        label="New Client"
        @click="selectedClient = new $FeathersVuex.api.Client({}); drawerRight = true"
      />
    </q-toolbar>
    <FeathersVuexFind
      service="clients"
      :query="{}"
      watch="query"
    >
      <template slot-scope="{ items: clients }">
        <q-list
          bordered
          separator
        >
          <q-item
            v-for="client in clients"
            :key="client._id"
            clickable
            v-ripple
            @click="selectedClient = client; drawerRight = true"
          >
            <q-item-section>{{ client.name }}</q-item-section>
          </q-item>
        </q-list>
      </template>
    </FeathersVuexFind>

    <right-drawer v-model="drawerRight">
      <FeathersVuexFormWrapper
        v-if="selectedClient"
        :item="selectedClient"
        watch
      >
        <template v-slot="{ clone, save, reset, remove }">
          <client
            :client="clone"
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

  </q-page>
</template>

<script>
import RightDrawer from 'components/RightDrawer'
import Client from 'components/client'

export default {
  name: 'Clients',
  components: {
    Client,
    RightDrawer
  },
  data () {
    return {
      drawerRight: false,
      selectedClient: null
    }
  }
}
</script>
