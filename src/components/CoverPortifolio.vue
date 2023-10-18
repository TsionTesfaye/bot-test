<template>
    <div class="mt-3 px-3  max-w-[500px] text-white">
        <p class="pl-4 mb-2">Cover Letter</p>
        <div class="bg-[rgb(24,25,29)] rounded-3xl px-4 py-2 ">
            <p class=" pt-2">{{ user?.initial_message }}</p>
            <div v-if="user?.portifolio_links?.length !== 0" class="flex flex-col">
                <div class="w-[95%] h-[1px] mt-4 mb-4 p-0 place-self-center bg-gray-500"></div>
                <a v-for="(portifolio, index) in user?.portifolioLink" :key="index" class=""
                    :href="'https://' + portifolio.link" target="_blank">
                    Portifolio link 1
                </a>
                <!-- {{ user }} -->
            </div>
        </div>
        <div  class="mt-5 w-[250px] h-24 bg-[rgb(24,25,29)] rounded-3xl flex items-center">
            <a :href="'http://afriworkapidev-env.eba-b34zspxx.eu-north-1.elasticbeanstalk.com:8090/file/uploads/' + user.job_seeker?.cv"  target="_blank"></a>
            <img src="../assets/pictures/attach-file.png" class="w-14 ml-4">
            <p class="ml-6 mb-7">{{ user?.cv }}</p>
        </div>

    </div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';



export default defineComponent({
    props: {
        user: {
            type: Object as () => any,
            required: true,
        },

    },

    setup() {
        const downloadCv = () => {
            const pdfLink = require('../assets/cv/pdf.pdf')
            const link = document.createElement('a');
            link.href = pdfLink;
            link.download = 'pdf.pdf';
            link.click();
        }
        return { downloadCv }
    }
})
</script>