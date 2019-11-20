<template>
  <q-page
    padding
    class="flex flex-center"
  >
    <q-card class="my-card bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          v-model="user"
          label="User"
          filled
          dark
        />

        <q-input
          v-model="password"
          label="Password"
          filled
          :type="isPwd ? 'password' : 'text'"
          dark
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn
          flat
          @click="login"
        >Login</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: '',
      isPwd: true
    }
  },
  methods: {
    async login () {
      let err, response
      [err, response] = await this.$to(this.$store.dispatch('auth/authenticate', {
        strategy: 'local',
        email: this.user,
        password: this.password
      }))

      if (err) {
        this.$q.notify({
          message: err.message
        })
      } else {
        this.$router.push('/gallery')
      }
    }

  }
}
</script>
