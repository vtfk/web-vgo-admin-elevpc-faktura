<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
           <v-breadcrumbs divider=">">
              <v-breadcrumbs-item href="/help">Hjelp</v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">Spørsmål og svar</h3>
              </v-card-title>
              <v-card-text>
                <p>Nedenfor finner du ofte stilte spørsmål</p>
                <p>Feil, mangler og ønsker kan du sende til <a href="mailto:post.opplaring@t-fk.no" title="Send e-post til post.opplaring@t-fk.no" target="_blank">post.opplaring@t-fk.no</a></p>
                <h6 class="title">Trekke tilbake samtykke</h6>
                <br/>
                <p>Hvis du ønsker å trekke samtykket velg "avslå" <a href="/">her</a>, og ta kontakt med kontoret på skolen din. Bildene vil da bli slettet.</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>
<style scoped>
code {
  margin-right: 15px;
}
</style>
