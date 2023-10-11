<template>
    <div class = "h-fit bg-[rgb(23,33,43)] relative">
        <NameTitle :user = "user"/>
        <CoverPortifolio :user = "user"/>

        <div v-if="user?.status != 'hired' && user?.status != 'rejected'" class = "  flex justify-center m-4  gap-24">
            <button class = "p-2 text-center bg-green-500 rounded-lg text-white"> {{ button1 }}</button>
            <button class = "p-2 text-center bg-red-500 rounded-lg text-white">{{ button2 }}</button>
        </div>
    </div>
</template>

<script lang = "ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import NameTitle from '@/components/NameTitle.vue';
import CoverPortifolio from '@/components/CoverPortifolio.vue';
import { User } from '../../db/users'

export default defineComponent({
    components: { NameTitle, CoverPortifolio},
    setup() {
        const route = useRoute()
        const userStore = useUserStore()

        const userId = ref<number>();
        const user = ref<User | undefined>();
        const button1 = ref<string>('')
        const button2 = ref<string>('')
        
        const updateButton = () => {
            if (user.value && user.value.status === "review") {
                button1.value = "Short List"
                button2.value= "Reject"
            }
            else if (user.value && user.value.status === "shortlisted") {
                button1.value = "Hire"
                button2.value = "Reject"
            }
        }
        const updateUser = () => {
            userId.value = Number(route.params.id)
            user.value = userStore.users.find(user => user.id == userId.value) || undefined ;  
        }
        onMounted(() => {
            userStore.getUsers()
            updateUser()
            updateButton()
        })

        // watch(user, () => {
        //     updateButton();
        //     console.log('Button 1:', user.value?.status);
        //     console.log('Button 2:', button2.value);
        // });
        
        return {user, button1, button2}
    }
})
</script>