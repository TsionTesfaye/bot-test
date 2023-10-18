import { defineStore } from "pinia";

import { gql } from "apollo-boost";
import ApolloClient from "apollo-boost";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as any,
    selectedCategory: "all",
    userDetail: {},
  }),
  getters: {},
  actions: {
    async getUsers(id: any) {
      console.log(id, "id");
    
      const apolloClient = new ApolloClient({
        uri: "http://afriworkapidev-env.eba-b34zspxx.eu-north-1.elasticbeanstalk.com:8080/v1/graphql",
        headers: {
          "x-hasura-admin-secret": "freelance",
        
        },
        
      });

      // Fetch users data
      await apolloClient
        .query({
          query: gql`
                    {
                        jobs(where:{id:{_eq:"${id}"}}){
                id
                applications{
                id
                initial_message
                hire_entry{created_at}
			shortlist_entry{created_at}
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
          console.error("Error fetching users:", error);
        });
    },

    async hire_application(applicationData: any) {
      const token =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MjQ1NWRjMy1jODlmLTQ3NTktYWZiMS05NDRmMmY5ZGQ3NWQiLCJmcmVlbGFuY2UiOnsieC1oYXN1cmEtdXNlci1pZCI6IjUyNDU1ZGMzLWM4OWYtNDc1OS1hZmIxLTk0NGYyZjlkZDc1ZCIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJqb2Jfc2Vla2VyIiwiZW50aXR5IiwiaW5oZXJpdGVkX3VzZXJfZW50aXR5IiwiYW5vbnltb3VzIl0sIngtaGFzdXJhLWpvYi1zZWVrZXItaWQiOiJkYmY1YzU2NC1mNWI5LTRjNTMtYWIzMy1hNmZmMzBjOWZhNjQiLCJ4LWhhc3VyYS1pcy1lbnRpdHktdXNlciI6InRydWUiLCJ4LWhhc3VyYS1lbnRpdGllcyI6IlwiOTY1MTAxM2ItNTZkMy00NWQxLWFhOGUtNDMyMDIzY2ZjNTYwXCIsXCI4OWQ1OWRkOC0zZWJiLTQwZjgtYmRmYi0zYjBiODEzYzJiYWZcIixcImM2ODRjNjBhLWU5ZDItNGFlZS04MDNmLWU0N2Q4ZTJlMDFjZFwiLFwiM2JiZTdhZTgtOWViZi00MGZiLWEwZTktOWFjNWUzYjEyMDdkXCIsXCI2MjQxMDE4Zi00ZTJlLTQwY2MtYjYwYy1kYmFjNmY1OTc3YzVcIiJ9LCJpYXQiOjE2OTc2MzQxMjIsImV4cCI6MTcwMDIyNjEyMn0.kaFaRXCeL7AzjHczfBH9c5lEWg2oRa27avHuyRqVeMs" as string;
   
      const apolloClient = new ApolloClient({
        uri: "http://afriworkapidev-env.eba-b34zspxx.eu-north-1.elasticbeanstalk.com:8080/v1/graphql",
        headers: {
          // "x-hasura-admin-secret": "freelance",
            "Authorization": token,
          "x-hasura-role":"user"
        },
      });
      try {
        const { data } = await apolloClient.mutate({
          mutation: gql`
            mutation {
          insert_hires(objects: { $application_id:uuid! , created_by: uuid! }) {
              reject_application(
                input: {
                  application_id: $application_id
                  custom_rejection_reason: $custom_rejection_reason
                }
              ) {
                application_id
              }
            }
          `,
          variables: {
            application_id: "ce822835-3024-4ab6-bdc4-a55caacf2356",
            custom_rejection_reason: "Reason for rejection of this application",
          },
        });

        // Handle the response data as needed
        console.log("Application rejected:", data.reject_application);
      } catch (error) {
        // Handle any errors that occur during the mutation
        console.error("Error rejecting application:", error);
      }
      
    },
    async short_application(applicationData: any) {
      const token =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MjQ1NWRjMy1jODlmLTQ3NTktYWZiMS05NDRmMmY5ZGQ3NWQiLCJmcmVlbGFuY2UiOnsieC1oYXN1cmEtdXNlci1pZCI6IjUyNDU1ZGMzLWM4OWYtNDc1OS1hZmIxLTk0NGYyZjlkZDc1ZCIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJqb2Jfc2Vla2VyIiwiZW50aXR5IiwiaW5oZXJpdGVkX3VzZXJfZW50aXR5IiwiYW5vbnltb3VzIl0sIngtaGFzdXJhLWpvYi1zZWVrZXItaWQiOiJkYmY1YzU2NC1mNWI5LTRjNTMtYWIzMy1hNmZmMzBjOWZhNjQiLCJ4LWhhc3VyYS1pcy1lbnRpdHktdXNlciI6InRydWUiLCJ4LWhhc3VyYS1lbnRpdGllcyI6IlwiOTY1MTAxM2ItNTZkMy00NWQxLWFhOGUtNDMyMDIzY2ZjNTYwXCIsXCI4OWQ1OWRkOC0zZWJiLTQwZjgtYmRmYi0zYjBiODEzYzJiYWZcIixcImM2ODRjNjBhLWU5ZDItNGFlZS04MDNmLWU0N2Q4ZTJlMDFjZFwiLFwiM2JiZTdhZTgtOWViZi00MGZiLWEwZTktOWFjNWUzYjEyMDdkXCIsXCI2MjQxMDE4Zi00ZTJlLTQwY2MtYjYwYy1kYmFjNmY1OTc3YzVcIiJ9LCJpYXQiOjE2OTc2MzQxMjIsImV4cCI6MTcwMDIyNjEyMn0.kaFaRXCeL7AzjHczfBH9c5lEWg2oRa27avHuyRqVeMs" as string;
   
      const apolloClient = new ApolloClient({
        uri: "http://afriworkapidev-env.eba-b34zspxx.eu-north-1.elasticbeanstalk.com:8080/v1/graphql",
        headers: {
          // "x-hasura-admin-secret": "freelance",
            "Authorization": token,
          "x-hasura-role":"user"
        },
      });
      try {
        const { data } = await apolloClient.mutate({
          mutation: gql`
             mutation{
          insert_shortlisted_applications(objects:{$application_id: uuid!, comment: string
          created_by:""
          }
          
          ) {
                application_id
              }
            }
          `,
          variables: {
            application_id: "ce822835-3024-4ab6-bdc4-a55caacf2356",
            custom_rejection_reason: "Reason for rejection of this application",
          },
        });

        // Handle the response data as needed
        console.log("Application rejected:", data.reject_application);
      } catch (error) {
        // Handle any errors that occur during the mutation
        console.error("Error rejecting application:", error);
      }
      
    },
    async login(userId: any) {
      console.log("inside login store");
      
  const apolloClient = new ApolloClient({
    uri: "http://afriworkapidev-env.eba-b34zspxx.eu-north-1.elasticbeanstalk.com:8080/v1/graphql",
    headers: {
          // "x-hasura-admin-secret": "freelance",
          "x-hasura-role":"user"
        },
        
  });
      
       try {
        const { data } = await apolloClient.mutate({
          mutation: gql`
            mutation login_bypass {
  	bypass_login(user_id:"52455dc3-c89f-4759-afb1-944f2f9dd75d"){
		token
	}
}
          `
        });
        //  console.log("Application rejected:", data.reject_application);
         localStorage.setItem("token", data.bypass_login.token)
         localStorage.setItem("userId",userId)
      } catch (error) {
        // Handle any errors that occur during the mutation
        console.error("Error rejecting application:", error);
      }
      
},

    async reject_application(applicationData: any) {
        const token =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MjQ1NWRjMy1jODlmLTQ3NTktYWZiMS05NDRmMmY5ZGQ3NWQiLCJmcmVlbGFuY2UiOnsieC1oYXN1cmEtdXNlci1pZCI6IjUyNDU1ZGMzLWM4OWYtNDc1OS1hZmIxLTk0NGYyZjlkZDc1ZCIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJqb2Jfc2Vla2VyIiwiZW50aXR5IiwiaW5oZXJpdGVkX3VzZXJfZW50aXR5IiwiYW5vbnltb3VzIl0sIngtaGFzdXJhLWpvYi1zZWVrZXItaWQiOiJkYmY1YzU2NC1mNWI5LTRjNTMtYWIzMy1hNmZmMzBjOWZhNjQiLCJ4LWhhc3VyYS1pcy1lbnRpdHktdXNlciI6InRydWUiLCJ4LWhhc3VyYS1lbnRpdGllcyI6IlwiOTY1MTAxM2ItNTZkMy00NWQxLWFhOGUtNDMyMDIzY2ZjNTYwXCIsXCI4OWQ1OWRkOC0zZWJiLTQwZjgtYmRmYi0zYjBiODEzYzJiYWZcIixcImM2ODRjNjBhLWU5ZDItNGFlZS04MDNmLWU0N2Q4ZTJlMDFjZFwiLFwiM2JiZTdhZTgtOWViZi00MGZiLWEwZTktOWFjNWUzYjEyMDdkXCIsXCI2MjQxMDE4Zi00ZTJlLTQwY2MtYjYwYy1kYmFjNmY1OTc3YzVcIiJ9LCJpYXQiOjE2OTc2MzQxMjIsImV4cCI6MTcwMDIyNjEyMn0.kaFaRXCeL7AzjHczfBH9c5lEWg2oRa27avHuyRqVeMs" as string;
   
      const apolloClient = new ApolloClient({
        uri: "http://afriworkapidev-env.eba-b34zspxx.eu-north-1.elasticbeanstalk.com:8080/v1/graphql",
        headers: {
          // "x-hasura-admin-secret": "freelance",
            "Authorization": token,
          "x-hasura-role":"user"
        },
      });
      try {
        const { data } = await apolloClient.mutate({
          mutation: gql`
            mutation RejectApplication(
              $application_id: uuid!
              $custom_rejection_reason: String!
            ) {
              reject_application(
                input: {
                  application_id: $application_id
                  custom_rejection_reason: $custom_rejection_reason
                }
              ) {
                application_id
              }
            }
          `,
          variables: {
            application_id: "ce822835-3024-4ab6-bdc4-a55caacf2356",
            custom_rejection_reason: "Reason for rejection of this application",
          },
        });

        // Handle the response data as needed
        console.log("Application rejected:", data.reject_application);
      } catch (error) {
        // Handle any errors that occur during the mutation
        console.error("Error rejecting application:", error);
      }
    },
   

    setSelectedCategory(category: string) {
      // console.log(this.users);
      // const filteredJobs = this.users.jobs.filter((job:any) => job.applications.some((app:any) => app.shortlist_entry === null));
      // console.log(filteredJobs,"newest one");

      this.selectedCategory = category;

      // console.log(filteredJobs,"check");

      //   if (category == "shortlisted") {
      //       for (const job of this.users.jobs) {
      //           for (const app of job.applications) {
      //               if (app.shortlist_entry !== null) {
      //                   filteredJobs.push(app);
      //                   break;
      //               }
      //           }
      //       }
      //     }
      //     if (category == "hired") {
      //       for (const job of this.users.jobs) {
      //         for (const app of job.applications) {
      //           if (app.hire_entry !== null) {
      //             filteredJobs.push(app);
      //             break;
      //           }
      //         }
      //       }
      //     }

      //     this.users = filteredJobs;
    },

    getApplicantDetail(userDetail: object) {
      this.userDetail = userDetail;
    },
  },
});
