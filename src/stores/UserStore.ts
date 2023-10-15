import { defineStore } from 'pinia';

import { gql } from 'apollo-boost';
import ApolloClient from 'apollo-boost';
export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [] ,
        selectedCategory: 'all',
        userDetail:{}
    }),
    getters: {
    
},
    actions: {
        async getUsers(id: any) {
            console.log(id,"id");
            
            const apolloClient = new ApolloClient({
                uri: 'http://afriworkapidev-env.eba-b34zspxx.eu-north-1.elasticbeanstalk.com:8080/v1/graphql',
                headers: {
                    "x-hasura-admin-secret": "freelance"
                }

            });

            // Fetch users data
                await  apolloClient
                            .query({
                                query: gql`
                    {
                        jobs(where:{id:{_eq:"${id}"}}){
                id
                applications{
                id
                initial_message
                
                job_seeker{
                    cv
                portfolio_links{
                    link
                }
                    user{
                    first_name
                    id
                    last_name
                    }
                }
                }
            
            }

                    }
                    `,
                            })
                            .then((response: any) => {
                                console.log(response);
                                this.users = response.data;
                            })
                            .catch((error: any) => {

                                console.error('Error fetching users:', error);
                            });

                    },

        setSelectedCategory(category:string) {
            this.selectedCategory= category
        },

        getApplicantDetail(userDetail: object) {
           this.userDetail = userDetail
        }

    },


})