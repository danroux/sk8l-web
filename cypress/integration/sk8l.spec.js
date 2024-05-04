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
    });

    describe('CronJobRow Details', () => {
        it('displays details for a working cronjob correctly', () => {
            cy.visit('https://sk8l-ui:8001/')
            const cronJobName = 'process-videos';
            cy.get(`#cronjob-${cronJobName}`).as('cronJobElement');

            cy.get('@cronJobElement')
                .should('exist');

            cy.get('@cronJobElement')
                .find('.cronjob-namespace')
                .should('exist')
                .contains('sk8l');

            cy.get('@cronJobElement')
                .find('.cronjob-completions')
                .should('exist')
                .contains('1');

            cy.get('@cronJobElement')
                .find('.cronjob-parallelism')
                .should('exist')
                .contains('1');

            cy.get('@cronJobElement')
                .find('.cronjob-creation-time')
                .should('exist')
                .contains(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/)

            cy.get('@cronJobElement')
                .find('.cronjob-last-duration')
                .should('exist')
                .contains(/\d+ sec|(\d+ min, \d+ sec)/);

            cy.get('@cronJobElement')
                .find('.cronjob-successful-time')
                .should('exist')
                .contains(/\d+ (?:second|minute)(s)? ago/);

            cy.get('@cronJobElement')
                .find('.cronjob-completion-time')
                .should('exist')
                .contains(/\d+ (?:second|minute)(s)? ago/);

            // cy.get('@cronJobElement')
            //     .find('.cronjob-failure-time')
            //     .should('exist');
        });
    });
});

describe('/cronjobs/:namespace', () => {
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
});

describe('/jobs/:namespace', () => {
    it("visits /jobs/:namespace ", () => {
        cy.visit('https://sk8l-ui:8001/jobs/sk8l/')
        cy.get('#jobs-timeline').should('exist')
        cy.contains('Job activity')
        cy.get('.job-row').should('have.length', 3)
        cy.get('.completed-job').should('have.length.gt', 0)

        cy.get('.completed-job')
            .should('have.length.gt', 0)
            .its('length')
            .then((count) => {
                expect(count).to.be.greaterThan(0)
                cy.log(`Found ${count} elements with class '.completed-job'`)
            })

        cy.get('#job-cypress-job.job-row')
            .find('strong.job-name')
            .should('exist')
            .and('have.text', 'cypress-job');

        cy.get('#job-sk8l-demo-job.job-row').within(() => {
            cy.get('strong.job-name')
                .should('exist')
                .and('have.text', 'sk8l-demo-job');
        });
    })

    describe('JobRow Details', () => {
        it('displays details for a working job correctly', () => {
            cy.visit('https://sk8l-ui:8001/jobs/sk8l/')
            cy.get('#job-sk8l-demo-job').as('jobElement');

            cy.get('@jobElement')
                .find('.job-uuid')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-row-footer')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-completions')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-parallelism')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-suspend')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-start-time')
                .should('exist')
                .contains(/\d+ (?:second|minute)(s)? ago/);

            cy.get('@jobElement')
                .find('.job-duration-time')
                .should('exist')
                .contains(/\d+ sec|(\d+ min, \d+ sec)/);

            cy.get('@jobElement')
                .find('.job-completion-time')
                .should('exist')
                .contains(/\d+ (?:second|minute)(s)? ago/);
        });

        it('displays details for a failing job correctly', () => {
            cy.visit('https://sk8l-ui:8001/jobs/sk8l/')
            cy.get('#job-sk8l-failing-demo-job').as('jobElement');

            // ['job-uuid', 'job-failure-condition', 'job-row-footer', 'job-completions', 'job-parallelism',
            //  'job-suspend', 'job-start-time', 'job-duration-time', 'job-failure-time', 'job-completion-time']
            //     .forEach(className => {
            //         cy.get('@jobElement')
            //             .find(`.${className}`)
            //             .should('exist');
            //     });

            cy.get('@jobElement')
                .find('.job-uuid')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-failure-condition')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-row-footer')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-completions')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-parallelism')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-suspend')
                .should('exist');

            cy.get('@jobElement')
                .find('.job-start-time')
                .should('exist')
                .contains(/\d+ (?:second|minute)(s)? ago/);

            cy.get('@jobElement')
                .find('.job-duration-time')
                .should('exist')
                .contains(/\d+ sec|(\d+ min, \d+ sec)/);

            cy.get('@jobElement')
                .find('.job-failure-time')
                .should('exist')
                .contains(/\d+ (?:second|minute)(s)? ago/);
        });
    });
});
