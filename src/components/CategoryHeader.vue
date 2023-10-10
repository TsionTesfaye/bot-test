<template>
    <div class = "px-2 h-12 border-b-[1px] border-gray-500  text-white">
        <ul class = "flex text-center h-[83%]">
            <li class = "category-list" @click = "setCategory('all')">All</li>
            <li class = "category-list" @click = "setCategory('shortlisted')">ShortListed</li>
            <li class = "category-list" @click = "setCategory('hired')">Hired</li>
           
        </ul>
    </div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/UserStore';

export default defineComponent({
    setup() {
        const userStore = useUserStore()
        const setCategory = (category:string) => {
            userStore.setSelectedCategory(category)
        }

        return {setCategory}
        
        }
    })
</script>

