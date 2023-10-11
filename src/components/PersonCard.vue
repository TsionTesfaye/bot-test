<template>
  <router-link :to = "'/' + user?.id">
   
    <div class = "flex items-center h-14 mb-2 pl-2">
        <div class = "">
        <div class = "rounded-full w-9 h-9 bg-blue-300 text-center flex justify-center items-center  text-white text-sm">
            {{ initials }}
        </div>
        </div>
        <p class = "ml-4 text-white overflow-hidden whitespace-nowrap overflow-ellipsis">{{ user?.name }}</p>
    </div>
   
    </router-link>
    
    
</template>

<script lang = "ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    props: {
        user: Object
    },

    setup(props) {
        
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
        return {initials}
    }
    })
</script>