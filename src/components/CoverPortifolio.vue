<template>
    <div class = "mt-3 px-3  max-w-[500px] text-white">
        <p class = "pl-4 mb-2">Cover Letter</p>
        <div class = "bg-[rgb(24,25,29)] rounded-3xl px-4 py-2 ">
        <p class = " pt-2">{{ user?.cover }}</p>
        <div v-if="user?.portifolioLink?.length !==0" class = "flex flex-col">
            <div class = "w-[95%] h-[1px] mt-4 mb-4 p-0 place-self-center bg-gray-500"></div>
            <a v-for="(portifolio, index) in user?.portifolioLink" :key="index" class = "" :href="'https://' + portifolio" target="_blank"
             >
               Portifolio
            </a>
        </div>
    </div>
    <div @click="downloadCv" class = "mt-5 w-[250px] h-24 bg-[rgb(24,25,29)] rounded-3xl flex items-center">
        <img src="../assets/pictures/attach-file.png" class = "w-14 ml-4">
        <p class = "ml-6 mb-7">{{ user?.cv }}</p>
    </div>

    </div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';
import {User} from '../../db/users'


export default defineComponent({
    props: {
       user: {
            type: Object as () => User| undefined , 
            required: true,
        },

    },

    setup() {
       const  downloadCv = ()=> {
            const  pdfLink= require('../assets/cv/pdf.pdf')
            const link = document.createElement('a');
            link.href = pdfLink;
            link.download = 'pdf.pdf'; 
            link.click(); 
        }
        return { downloadCv }
    }
})
</script>