<template>
  {{ setPlotData() }}
  <div id="graph"></div>
</template>

<script>
import { Duration } from 'luxon';
import uPlot from 'uplot';

export default {
  name: 'Chart',
  props: ['cronJob'],
  data() {
    return {
      plot: null,
    };
  },
  mounted() {
    this.generatePlot();
  },
  methods: {
    generatePlot() {
      // let suc = this.dates.map((v,i) => v / 60 / 1000);
      // let datax = [
      //     this.startTimes,    // x-values (timestamps)
      //     suc,    // y-values (series 1)
      //     suc.slice().reverse(),    // y-values (series 2)
      // ];
      const that = this;

      const opts = {
        width: 1280,
        height: 400,
        cursor: {
          drag: {
            setScale: false,
          },
        },
        select: {
          show: false,
        },
        title: that.generatePlotTitle(),
        drawOrder: ['series', 'axes'],
        scales: {
          s: {
            auto: false,
            range: (_min, _max) => that.scaleValues,
          },
        },
        series: [
          {},
          {
            stroke(_idx, _m, _o) {
              const result = 'rgba(5, 141, 199, 1)';
              return result;
            },
            width: 1,
            fill: 'rgba(5, 141, 199, 0.1)',
            points: {
              size: 4,
            },
            label: 'duration',
            scale: 's',
            value: (_u, v) => (v == null ? null : v.toFixed(2)),
            values: (_u, _sidx, idx) => {
              if (idx == null) {
                return {
                  Name: '--',
                  Duration: '--',
                  'Start time': '--',
                  'Completion time': '--',
                  Status: '--',
                };
              }

              return {
                Name: that.theNames(idx),
                Duration: that.seriesDuration(1, idx),
                'Start time': that.seriesStartTime(0, idx),
                'Completion time': that.seriesCompletionTimes(0, idx),
                Status: that.seriesStatus(idx),
              };
            },
          },
        ],
        axes: [
          {},
          {
            scale: 's',
            values: (_u, vals, _space) => vals.map((v) => +v.toFixed(1) + 'm'),
          },
          {
            side: 1,
            scale: 'mb',
            values: (_u, vals, _space) => vals.map((v) => +v.toFixed(2) + ' MB'),
            grid: { show: false },
          },
        ],
      };

      this.plot = new uPlot(opts, this.generateData(), document.getElementById('graph'));
    },
    isCronJobActive() {
      return this.cronJob.active === true;
    },
    generatePlotTitle() {
      return `${this.cronJob.name} (time) ${this.isCronJobActive()}`;
    },
    theNames(idx) {
      if (idx == null) {
        return '';
      }

      return this.totals().flatMap((x) => [x.name, x.name])[idx];
    },
    setPlotData() {
      if (this.startTimes.length === 1) {
        this.startTimes.unshift(this.startTimes[0] - 3000);
        this.durationTimes.unshift(0);
      }

      if (this.plot == null) {
        return;
      }

      const datax = this.generateData();
      this.plot.title = this.generatePlotTitle();
      this.plot.setData(datax);
    },
    totals() {
      const totals = [];
      for (let i = 0; i < this.cronJob.jobsList.length; i += 1) {
        const job = this.cronJob.jobsList[i];
        const result = {
          startTime: job.status.starttimeins,
          completionTimeInS: job.status.completiontimeins,
          durationTimeInS: job.durationins,
          name: job.name,
          succeeded: job.succeeded,
        };
        totals.push(result);
      }

      return totals;
    },
    generateData() {
      // const durationTimesY = [...this.durationTimes];
      const startCompletionTuples = this.totals().flatMap((x) => {
        let target = x.completionTimeInS;

        if (target === 0) {
          target = x.startTime + x.durationTimeInS;
        }

        return [x.startTime, target];
      });

      const suc = this.totals().flatMap((x) => [0, x.durationTimeInS / 60]);
      const datax = [
        startCompletionTuples, // x-values (timestamps)
        suc, // y-values (series 1)
        [], // suc.slice().reverse()
      ];

      return datax;
    },
    seriesStatus(idx) {
      const target = this.totals().flatMap((x) => {
        const m = x.succeeded;
        return [m, m];
      })[idx];

      return target;
    },
    seriesDuration(_i, idx) {
      if (this.durationTimes.length === 0) {
        return '';
      }

      const target = this.totals().flatMap((x) => {
        const m = Duration.fromObject({ seconds: x.durationTimeInS }).rescale().toHuman({ unitDisplay: 'short' });
        return [m, m];
      })[idx];

      return target;
    },
    seriesStartTime(_i, idx) {
      if (this.durationTimes.length === 0) {
        return '';
      }

      const target = this.totals().flatMap((x) => {
        const m = x.startTime;
        return [m, m];
      })[idx];

      return this.timeConverter(target);
    },
    seriesCompletionTimes(_i, idx) {
      if (this.durationTimes.length === 0) {
        return '';
      }

      // let target = this.completionTimes[idx];
      const target = this.totals().flatMap((x) => {
        const m = x.completionTimeInS;
        return [m, m];
      })[idx];

      if (target === null || target === 0) {
        return '--';
      }

      return this.timeConverter(target);
    },
    timeConverter(UNIX_timestamp) {
      // https://stackoverflow.com/a/6078873
      const a = new Date(UNIX_timestamp * 1000);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const sec = a.getSeconds();
      const time = `${date} ${month} ${year} ${hour} : ${min} : ${sec}`;
      return time;
    },
  },
  computed: {
    scaleValues() {
      let max;

      if (this.durationTimes.length > 0) {
        max = Math.max(...this.durationTimes) / 60;
      } else {
        max = 10;
      }

      return [0, max];
    },
    // improve this
    durationTimes() {
      if (this.cronJob === null || this.cronJob.jobsList === null) {
        return [];
      }

      const datesx = this.cronJob.jobsList.flatMap(
        (job) => job.durationins,
      );
      return datesx;
    },
    names() {
      if (this.cronJob === null || this.cronJob.jobsList === null) {
        return [];
      }

      const datesx = this.cronJob.jobsList.flatMap(
        (job) => job.name,
      );
      return datesx;
    },
    startTimes() {
      if (this.cronJob === null || this.cronJob.jobsList === null) {
        return [];
      }

      const datesx = this.cronJob.jobsList.flatMap(
        (job) => job.status.starttimeins,
      );
      return datesx;
    },
    completionTimes: () => {
      if (this.cronJob === null || this.cronJob.jobsList === null) {
        return [];
      }

      const datesx = this.cronJob.jobsList.flatMap(
        (job) => job.status.completiontimeins,
      );
      return datesx;
    },
  },
  components: {},
};
</script>
