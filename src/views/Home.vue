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
                <h3 class="headline">Samtykke til bruk av bilder</h3>
              </v-card-title>
              <v-card-text class="grey--text">
                <h4>Vil du tillate at vi bruker bilder og filmer av deg som blir tatt på vegne av Telemark fylkeskommune?</h4><br/>
                <p>Ved å godta godtar du at fylkeskommunen kan ta bilder og filmer av deg i skolesammenheng mens du er elev ved skolen.</p>
                <p>Du godtar også at bildene vi tar av deg kan publiseres i sammenhenger som har med videregående opplæring å gjøre.<br/>
                Eksempler på bruk av bildene er på skolenes og fylkeskommunens hjemmesider, i sosiale medier, i presentasjoner eller i materiell som for eksempel brosjyrer.</p>
                <p>Bildene kan bli brukt i sammenhenger som har med videregående opplæring å gjøre, etter at du ikke lenger er elev ved skolen.</p>
                <p>Det er fylkeskommunen som har ansvaret for de offentlige videregående skolene i fylket.</p>
                <h3>Alle rettigheter</h3>
                <p>Telemark fylkeskommune har alle rettigheter til bildematerialet, inkludert rett til publisering av bildene.</p>
                <p>Samtykket overtas av den sammenslåtte Vestfold og Telemark fylkeskommune fra 1. januar 2020.</p>
                <h3>Du kan alltid trekke tilbake samtykket!</h3>
                <p>Samtykket gjelder til det blir trukket tilbake. Hvis du ønsker å trekke samtykket tar du kontakt med kontoret på skolen din. Bildene vil da bli slettet.</p>
                <h3>Har du spørsmål?</h3>
                <p>Ta kontakt med administrasjonen på din skole hvis du lurer på noe.</p>
                <v-switch
                  v-if="loaded"
                  v-model="samtykke1"
                  :label="samtykke1 ? 'Godtatt' : 'Avslått'"
                  v-on:change="updateSamtykke"
                ></v-switch>
                <v-progress-circular
                  v-else
                  value="0"
                  size="24"
                  indeterminate
                ></v-progress-circular>
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
    samtykke1: false,
    loaded: false,
    snackbar: {
      active: false,
      message: false,
      type: false
    }
  }),
  methods: {
    notification (msg, type = 'info') {
      this.snackbar.message = msg
      this.snackbar.type = type
      this.snackbar.active = true
    },
    async updateSamtykke (val) {
      try {
        await this.$http.put(config.studentsApiUrl, { state: val }, this.accessToken)
        this.notification('Lagret data')
        this.loaded = true
      } catch (error) {
        this.notification(`Fikk ikke lagret data: ${error.message}`, 'error')
      }
    }
  },
  async created () {
    try {
      console.log(this.accessToken)
      const { data } = await this.$http.get(config.studentsApiUrl, this.accessToken)
      this.samtykke1 = data.length !== 0
      this.loaded = true
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
</style>
