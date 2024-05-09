import WiderHeader from '../../src/components/WiderHeader.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/:namespace/:name', name: 'cronDetails', component: { template: '<div>CronDetails</div>' } },
    { path: '/:namespace/:cronjobName/pods', name: 'jobPodList', component: { template: '<div>JobPodList</div>' } }
  ]
})

describe('WiderHeader', () => {
  it('renders component', () => {
    const cronjob = {
      namespace: 'my-namespace',
      name: 'my-cronjob',
      jobs: [1, 2, 3]
    }
    const pods = [1, 2, 3, 4]

    cy.mount(WiderHeader, {
      props: {
        cronjob,
        pods
      },
      global: {
        plugins: [router]
      }
    })

    cy.get('.author').should('contain.text', 'my-namespace')
    cy.get('strong').should('contain.text', 'my-cronjob')
    cy.get('.js-profile-project-count').should('contain.text', '3')
    cy.get('.js-profile-repository-count').should('contain.text', '4')
  })
})
