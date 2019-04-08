<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex>
            <v-breadcrumbs divider=">">
              <v-breadcrumbs-item href="/">Hjem</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">Administrasjon - fakturagrunnlag til elev-pc</h3>
              </v-card-title>
              <v-card-text class="grey--text">
                <p>En vakker, beskrivende tekst. Kanskje noen blomster?</p>
                <p>Det er <b>{{newDataLength}} faktura{{newDataLength === 1 ? '' : 'er'}}</b> til nedlasting.</p>
                <v-btn
                  color="accent"
                  class="white--text"
                  :disabled="newDataLength === 0"
                  @click="downloadBatch"
                >
                  Last ned {{newDataLength}} faktura{{newDataLength === 1 ? '' : 'er'}}
                  <v-icon right dark>cloud_download</v-icon>
                </v-btn>
                <br />
                <br />
                <h3>Historikk</h3>
                <div v-for="(data, i) in historicalData" :key="i">
                  <ul>
                    <li @click="downloadBatch(data.batchId)">{{ new Date(data.batchCreated).toLocaleString() }}</li>
                  </ul>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-snackbar v-model="snackbar.active" :color="snackbar.type === 'error' ? 'error' : 'primary'" :bottom="true">
            {{snackbar.message}}
          </v-snackbar>
          </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import config from '../../config'

export default {
  props: {
    accessToken: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    snackbar: {
      active: false,
      message: false,
      type: false
    },
    newDataLength: 0,
    historicalData: []
  }),
  methods: {
    notification (msg, type = 'info') {
      this.snackbar.message = msg
      this.snackbar.type = type
      this.snackbar.active = true
    },
    downloadBatch: async function (batchId) {
      try {
        const batchUrlPath = batchId ? `/batches/${batchId}/download` : '/batches/download'
        const options = {
          url: config.dataApiUrl + batchUrlPath,
          ...this.accessToken,
          responseType: 'blob'
        }
        console.log(options)
        const response = await this.$http(options)
        console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `fakturagrunnlag-${new Date().toISOString()}.csv`)
        document.body.appendChild(link)
        link.click()
        link.remove()
      } catch (error) {
        this.notification(error.message, 'error')
      }
    }
  },
  async created () {
    try {
      const { data: newDataLength } = await this.$http.get(config.dataApiUrl + '/new', this.accessToken)
      this.newDataLength = newDataLength
      const { data: historicalData } = await this.$http.get(config.dataApiUrl + '/batches', this.accessToken)
      this.historicalData = historicalData
      console.log(historicalData)
    } catch (error) {
      this.notification(error.message, 'error')
    }
  }
}
</script>

<style>
.grey--text {
  font-size: 18px;
}
ul li {
  cursor: pointer;
}
</style>
