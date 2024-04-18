describe('Home Test', () => {
    it('visits the homepage', () => {
        cy.visit('https://sk8l-ui:8001/')
        // cy.reload(true)
        // cy.contains('It looks like no cronjobs exist for this namespace')
        // cy.screenshot('my-screenshot')
        // cy.screenshot('home-test', {
        //     log: true,
        //     onAfterScreenshot($el, props) {
        //         console.log('here', props);
        //     }
        // });
        cy.contains('Cronjob Overview')
        cy.contains('Overview')
        cy.contains('Dashboard')
        cy.contains('sk8l / download-report-files')
        cy.contains('sk8l / process-csv-files')
        cy.contains('sk8l / process-videos')
        cy.contains('Cronjob activity')
        cy.contains('33%')
        cy.contains('Latest completions')
    })

    it('visits a cronjob', () => {
        cy.visit('https://sk8l-ui:8001/cronjob/sk8l/download-report-files')
        cy.contains('Overview')
        cy.contains('Success')
        cy.contains('Active')
        cy.contains('Failed')
        cy.contains('Total jobs')
        cy.contains('Successful Jobs')
        cy.contains('Active Jobs')
        cy.contains('Failed Jobs')
        cy.contains('Current Duration')
        cy.contains('Last Duration')
        cy.contains('Avg. Duration')
        cy.contains('Last Successful')

        cy.contains('Schedule')
        cy.contains('Every minute')
        cy.contains('Container Commands')
        cy.contains('Spec')
        cy.contains('Completions 1')
        cy.contains('Parallelism 1')
        cy.contains('concurrencyPolicy Allow')
        cy.contains('startingDeadlineSeconds 200')
        cy.contains('suspend false')
        cy.contains('successfulJobsHistoryLimit 20')
        cy.contains('failedJobsHistoryLimit 20')
    })

    it("visits a cronjob's pods", () => {
        cy.visit('https://sk8l-ui:8001/cronjob/sk8l/process-videos/pods/')
        cy.contains('Node:')
        cy.contains('Host:')
        cy.contains('Pod Ips:')
    })
})
