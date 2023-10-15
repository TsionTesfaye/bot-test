<template>
  <router-view class = "min-h-[100vh]"/>
</template>


<script lang = "ts">
import { defineComponent } from 'vue';
import WebApp from '@twa-dev/sdk'

export default defineComponent({
  setup() {
    console.log( WebApp.initDataUnsafe )
  }
})
</script>

rgb(24,25,29) dark
rgb(23,33,43) normal
 