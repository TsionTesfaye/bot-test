<template>
    <div  class = "bg-[rgb(24,25,29)] h-28 flex flex-col justify-center pl-3">
        <p class = " text-xl text-white font-semibold capitalize">{{ user?.name }}</p>
        <p class = "text-gray-400">{{ user?.title }}</p>
       
    </div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';
import {User} from '../../db/users'

export default defineComponent({
    props: {
       user: {
            type: Object as () => User | undefined , // Assuming User is the correct type
            required: true,
        },
    }
})

</script>