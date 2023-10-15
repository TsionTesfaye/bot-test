<template>
  <div class=" bg-[rgb(23,33,43)] mn-h-[100vh] text-white">
    <CategoryHeader />

    <PersonCard v-for="(user,i) in users.jobs" :key="i" :user="user" />
  {{ users }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import PersonCard from '../components/PersonCard.vue'
import { useRoute } from 'vue-router';
import CategoryHeader from '../components/CategoryHeader.vue'
import { useUserStore } from '../stores/UserStore'

export default defineComponent({

  components: {
    PersonCard, CategoryHeader
  },

  setup() {
    
    const userStore = useUserStore()
    const route = useRoute()
    const id  = route.params.id
    // const viewUsers = computed(() => {
    //   let viewUsers = userStore.users
    //   let cat = userStore.selectedCategory
    // //   if (cat === 'all') {
    // //     viewUsers = userStore.users
    // //   }
    // //   else if (cat === 'shortlisted' || cat === 'hired') {
    // //     viewUsers = userStore.users.filter((user) => user.status.includes(cat))

    // //   }
    // //   return viewUsers
    // // })

    onMounted(async () => {
      await userStore.getUsers(id)
    });

    const users:any = computed(() => {
     return userStore.users
    
}) 
    
    return {
      users
    }
  }
});
</script>
