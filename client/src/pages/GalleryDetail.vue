<template>
  <q-page
    style="padding-top: 66px"
    v-if="gallery"
  >

    <FeathersVuexFind
      service="images"
      :query="{ galleryId: galleryid, $limit: limit, $skip: skip }"
      watch="query"
      :edit-scope="getPaginationInfo"
    >
      <div
        class="q-gutter-md q-pa-md row"
        slot-scope="{ items: images }"
      >
        <image-block
          v-for="image in images"
          :key="image._id"
          :image="image"
          style="width: 150px"
          @preview="openPreview"
          @toCart="toCart"
        />
      </div>
    </FeathersVuexFind>

    <right-drawer
      no-padding
      v-model="drawerRight"
      :width="$q.screen.width * 0.5"
    >

      <FeathersVuexFormWrapper
        :item="order"
        watch
      >
        <template v-slot="{ clone, save, reset, remove }">
          <div>
            <edit-order
              :order="clone"
              @close="drawerRight = false"
            />

            <q-dialog v-model="showCartAdd">
              <q-card
                v-if="selectedImage"
                style="width:50vw"
              >
                <q-card-section>
                  <div class="text-h6">Add / Edit Order for {{ selectedImage.name }}</div>
                </q-card-section>

                <q-card-section class="row">
                  <div class="col-6 q-pr-sm">
                    <div class="text-subtitle1">Sizes</div>
                    <div class="q-gutter-sm">
                      <div
                        class="row no-wrap items-center"
                        v-for="(size, index) in selectedImage.sizes"
                        :key="size.id"
                      >
                        <div class="col-6">{{ size.label }}</div>
                        <q-input
                          v-model="selectedImage.sizes[index].qty"
                          label="Qty"
                          filled
                          dense
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <q-img
                      :src="imageUri"
                      contain
                    />
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cancel"
                    color="secondary"
                    v-close-popup
                  />
                  <q-btn
                    flat
                    label="OK"
                    color="primary"
                    @click="clone.images.push(selectedImage)"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </template>
      </FeathersVuexFormWrapper>

      <image-upload
        v-if="$hasRoles(['superadmin'])"
        :galleryid="galleryid"
        :clientid="gallery.clientId"
      />

    </right-drawer>

    <q-dialog v-model="showPreview">
      <q-card
        flat
        class="preview-card"
      >

        <img
          v-if="previewImage"
          :src="previewImage.uri"
          contain
          style="height:calc(100% - 52px); width: auto"
        />

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky
      expand
      position="top"
    >
      <q-toolbar class="text-primary justify-between">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :direction-links="true"
        />
        <q-btn
          flat
          dense
          icon="shopping_cart"
          label="View Order"
          @click="drawerRight = true"
        />
      </q-toolbar>

    </q-page-sticky>

    <portal to="admin-menu">
      <q-btn
        v-if="$hasRoles(['superadmin'])"
        flat
        dense
        icon="add"
        label="Add Images"
        @click="drawerRight = true"
      />
    </portal>

  </q-page>
</template>

<script>
import ImageBlock from 'components/image'
import RightDrawer from 'components/RightDrawer'
import { models } from 'feathers-vuex'
import { extend } from 'quasar'

export default {
  name: 'GalleryDetail',
  props: ['galleryid'],
  components: {
    ImageBlock,
    RightDrawer,
    'image-upload': () => import('components/imageUpload'),
    'edit-order': () => import('components/editOrder')
  },
  data () {
    return {
      drawerRight: false,
      showPreview: false,
      showCartAdd: false,
      previewImage: null,
      selectedImage: null,
      total: 0,
      limit: 5,
      currentPage: 1,
      gallery: null,
      order: new models.api.Order({ galleryId: this.galleryid })
    }
  },
  computed: {
    skip () {
      return (this.currentPage - 1) * this.limit
    },
    totalPages () {
      return Math.ceil(this.total / this.limit)
    },
    printSizes () {
      return [
        {
          label: '6" x 4" Print',
          id: '6x4'
        },
        {
          label: '8" x 6" Print',
          id: '8x6'
        },
        {
          label: 'A4 Print',
          id: 'a4'
        }

      ]
    },
    imageUri () {
      return models.api.Upload.getFromStore(this.selectedImage.blobId).uri
    }
  },
  methods: {
    openPreview (image) {
      this.previewImage = image
      this.showPreview = true
    },
    getPaginationInfo (scope) {
      const { queryInfo, pageInfo } = scope

      this.total = queryInfo.total
      if (pageInfo && pageInfo.ids) {
        this.ids = pageInfo.ids
      }
    },
    toCart (image) {
      let orderImage = { sizes: [] }
      this.printSizes.forEach(size => {
        let imagesize = {
          label: size.label,
          id: size.id,
          qty: 0
        }
        orderImage.sizes.push(imagesize)
      })
      this.selectedImage = Object.assign(orderImage, image)
      this.showCartAdd = true
    }
  },
  async created () {
    let err, response
    [err, response] = await this.$to(models.api.Gallery.get(this.galleryid))
    if (!err) {
      this.gallery = response
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-card {
  max-width: 100%;
  // width: 80vw;
  height: 95vh;
}
</style>
