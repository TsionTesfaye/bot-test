<template>
  <div class="bg-[rgb(23,33,43)] mn-h-[100vh] text-white">
    <CategoryHeader />
    <div v-if="Array.isArray(users)">
      <PersonCard v-for="(user, i) in users" :key="i" :user="user" />
      {{ users }}

    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import PersonCard from "../components/PersonCard.vue";
import { useRoute } from "vue-router";
import CategoryHeader from "../components/CategoryHeader.vue";
import { useUserStore } from "../stores/UserStore";
import WebApp from "@twa-dev/sdk";

export default defineComponent({
  components: {
    PersonCard,
    CategoryHeader,
  },

  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    const id = route.params.id;
    const filteredApplicants = [];


    onMounted(async () => {
      await userStore.login(id)
      await userStore.getUsers(id);
    });

    const users: any = computed(() => {
      const users = userStore.users.jobs
      console.log(userStore.users);
      
      if (!Array.isArray(users)) {
        return []; // Return an empty array if users is not an array
      }

      let filteredApplicants: any = [];
      const selected = userStore.selectedCategory;
      console.log(users)
      if (selected == 'hired') {
        for (const job of users) {
          for (const app of job.applications) {
            if (app.hire_entry !== null) {
              filteredApplicants.push(app);

            }
          }
        }


      } else if (selected == 'shortlisted') {
        for (const job of users) {
          for (const app of job.applications) {
            if (app.shortlist_entry !== null) {
              filteredApplicants.push(app);

            }
          }
        }
      } else {
        for (const job of users) {
          for (const app of job.applications) {

            filteredApplicants.push(app);


          }
        }
        // filteredApplicants = users
      }


      return filteredApplicants
    });
    WebApp.MainButton.text = "contact";

    WebApp.MainButton.show();
    return {
      users,
    };
  },
});
</script>
