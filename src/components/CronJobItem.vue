<template>
  <tr :class="cronJobStatusClass" v-if="cronJob">
    <th scope="row">{{ index }}</th>
    <td>
      <router-link :to="{ name: 'cronDetails',
                        params: { namespace: cronJob.namespace, name: cronJob.name }}">
        {{ cronJob.name }}
      </router-link>
    </td>
    <td>{{ cronJob.namespace }}</td>
    <td>{{ schedule() }}</td>
    <td style="max-width: 400px;">
      <div style="white-space: nowrap; overflow-x: scroll;">{{ cronJob.command }}</div>
    </td>
    <td>{{ lux1(cronJob.last_schedule_time) }}</td>
    <td>{{ lux1(cronJob.last_successful_time) }}</td>
    <td>{{ lux1(cronJob.creation_timestamp) }}</td>
    <td>{{ cronJob.definition }}</td>
    <td>{{ cronJob.active }}</td>
    <td>{{ cronJob.last_duration }}</td>
    <td>{{ cronJob.current_duration }}</td>
    <td>
      <JobPodList :cronjob="cronJob" :job-pods="cronJob.jobsPod" />
    </td>
    <td>
    </td>
    <td>cronJob.jobs</td>
    <td>cronJob.running_jobs</td>
  </tr>
</template>

<script>
// DEPRECATED

// npm install --save luxon
import { DateTime } from 'luxon';
// npm i -S cronstrue
import cronstrue from 'cronstrue';
import JobPodList from '@/components/JobPodList.vue';
import ModalContainer from '@/components/ModalContainer.vue';

export default {
  name: 'CronJobItem',
  props: ['index', 'cronJob'],
  methods: {
    lux1(t) {
      return DateTime.fromISO(t).toRelative();
    },
    schedule() {
      return cronstrue.toString(this.cronJob.definition);
    },
  },
  computed: {
    // eslint-disable-next-line
    jobsPods(vm) {
      const pods = [];
      const that = this;
      vm.cronJob.jobsPods.forEach((jobPod) => {
        const pod = {};
        pod.namespace = jobPod.metadata.namespace;
        pod.name = jobPod.metadata.name;
        pod.jobName = Object.fromEntries(jobPod.metadata.labelsMap)['job-name'];
        pod.uid = jobPod.metadata.uid;
        pod.startTime = jobPod.status.starttime.seconds;
        pod.podIPs = jobPod.status.podIps.map((ip) => ip.ip);
        pod.podIP = jobPod.status.podip;
        pod.hostIP = jobPod.status.hostip;
        pod.nodeName = jobPod.spec.nodename;
        pod.containerStatuses = that.containerStatuses(vm, jobPod.status.containerStatuses);
        pod.started = pod.containerStatuses.filter((status) => status.state === 'running');
        pod.failing = pod.containerStatuses.filter((status) => status.reason === 'Error');
        pods.push(pod);
      });

      return pods;
    },
    failingPods(vm) {
      const failingPods = vm.jobsPods.filter((pod) => pod.failing.length > 0);
      return failingPods;
    },
    readyPods(vm) {
      const readyPods = vm.jobsPods.filter((pod) => pod.failing.length === 0);
      return readyPods;
    },
    containerStatuses(vm, containerStatuses) {
      const status = containerStatuses.flatMap((containerStatus) => {
        return this.processStatus(containerStatus);
      });
      return status;
    },
    // eslint-disable-next-line
    cronJobStatusClass(vm) {
      // if last execution failed but is no longer active, class is removed and
      // state is not visible anymore.
      if (vm.cronJob.active) {
        return vm.failingPods.length > 0 ? 'failing_job' : 'ok_job';
      }

      return '';
    },
  },
  components: {
    JobPodList,
    ModalContainer,
  },
};
</script>
