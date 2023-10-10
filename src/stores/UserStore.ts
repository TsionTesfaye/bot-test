import { defineStore } from 'pinia';
import { User, users } from '../../db/users'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [] as User[],
        selectedCategory: 'all'
    }),

    actions: {
        getUsers() {
            this.users = users;
        },

        setSelectedCategory(category:string) {
            this.selectedCategory = category
        }
    }
})