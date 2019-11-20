<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Photo Ordering Manager
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item
          clickable
          v-ripple
          to="/gallery"
        >
          <q-item-section avatar>
            <q-icon name="photo_album" />
          </q-item-section>

          <q-item-section>Galleries</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to="/order"
        >
          <q-item-section avatar>
            <q-icon name="attach_money" />
          </q-item-section>

          <q-item-section>Orders</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
