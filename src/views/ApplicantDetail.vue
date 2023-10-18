<template>
    <div v-if="userDetail && userDetail.job_seeker && userDetail.job_seeker.user" class=" bg-[rgb(23,33,43)] text-white">
        
        <NameTitle :user="userDetail.job_seeker?.user" />
        <CoverPortifolio :user="userDetail" />
        {{ userDetail }}

        <div v-if="userDetail.rejected_at == null && userDetail.hire_entry == null " class="  flex justify-center mt-3  gap-24">
            <button @click = "manageButton()" class="p-2 text-center bg-green-500 rounded-lg text-white"> {{ button1 }}</button>
            <button @click = "rejectButton()"  class="p-2 text-center bg-red-500 rounded-lg text-white">{{ button2 }}</button>
        </div>
    </div>
</template>

<script lang = "ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import NameTitle from '@/components/NameTitle.vue';
import CoverPortifolio from '@/components/CoverPortifolio.vue';



export default defineComponent({
    components: { NameTitle, CoverPortifolio },
    props: {

    },
    setup() {

        const route = useRoute()
        const userStore = useUserStore()
        const userDetail:any = userStore.userDetail
        const userId = ref<number>();
       
        const button1 = ref<string>('')
        const button2 = ref<string>('')

        const updateButton = () => {
            if (userDetail && userDetail.hire_entry ==null && userDetail.shortlist_entry == null ) {
                button1.value = "Short List"
                button2.value = "Reject"
            }
            else if (userDetail && userDetail.shortlist_entry != null) {
                button1.value = "Hire"
                button2.value = "Reject"
            }
        }

        const manageButton = () => {
            if (button1.value == 'Short List') {
                console.log("i")
            } else if (button1.value == 'Hire') {
                console.log("im")
            } 
        }
        const rejectButton = () => {
            userStore.reject_application({ id: "e277e08b-199a-494c-a949-628aa482d489" })
        }
        // const updateUser = () => {
        //     userId.value = Number(route.params.id)
        //     user.value = userStore.users.find(user => user.id == userId.value) || undefined;
        // }
        onMounted(() => {
            updateButton()
        })

        // watch(user, () => {
        //     updateButton();
        //     console.log('Button 1:', user.value?.status);
        //     console.log('Button 2:', button2.value);
        // });


        return {
            button1, button2, userDetail, updateButton, manageButton, rejectButton
        }
    }
})
</script>