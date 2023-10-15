<template>
    <div v-for="(userList, i) in user?.applications" :key="i" @click="goTodetail(userList)">

        <div class="flex items-center h-14 mb-2 pl-2">
            <div class="">
                <div
                    class="rounded-full w-9 h-9 bg-blue-300 text-center flex justify-center items-center  text-white text-sm">
                    {{ initials }}

                </div>
            </div>

            <p class="ml-4 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">{{
                userList?.job_seeker.user.first_name + " " + userList?.job_seeker.user.last_name }}</p>
        </div>
        <div class="mt-30">
           
        </div>
    </div>
</template>

<script lang = "ts">
import { computed, defineComponent } from 'vue';
import { useUserStore } from '../stores/UserStore'
import { useRouter } from 'vue-router';
export default defineComponent({
    props: {
        user: Object
    },

    setup(props) {
        const useStore = useUserStore()
        const router = useRouter()
        const goTodetail = (user: any) => {
            console.log(user)
            useStore.getApplicantDetail(user);
            router.push("/applicantDetail/" + user.id)
        }
        const initials = computed(() => {
            if (props && props.user && props.user.name) {
                const fullName = props.user.name.trim();
                const [firstName, lastName] = fullName.split(' ');
                const firstInitial = firstName ? firstName[0] : '';
                const lastInitial = lastName ? lastName[0] : '';
                return firstInitial + lastInitial;
            } else {
                return '';
            }

        });
        return { initials, goTodetail }
    }
})
</script>