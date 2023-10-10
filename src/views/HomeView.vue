<template>
  <div class = "h-screen bg-[rgb(23,33,43)] ">
    <CategoryHeader />
    
    <PersonCard v-for = "user in viewUsers" :key=" user.id" :user = "user"/>
   
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import PersonCard from '../components/PersonCard.vue'
import CategoryHeader from '../components/CategoryHeader.vue'
import {useUserStore} from '../stores/UserStore'

export default defineComponent({
  
  components: {PersonCard, CategoryHeader
  },

  setup() {
    const userStore = useUserStore()
    
    const viewUsers = computed(() => {
      let viewUsers = userStore.users
      let cat = userStore.selectedCategory
      if (cat === 'all') {
        viewUsers = userStore.users
      }
      else if (cat === 'shortlisted' || cat === 'hired') {
        viewUsers = userStore.users.filter((user) =>user.status.includes(cat))
        
      }
      return viewUsers
    })

    onMounted(userStore.getUsers)

    return { viewUsers }
  }
});
</script>
