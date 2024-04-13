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
})
