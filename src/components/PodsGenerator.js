// https://www.amazon.de/Leak-Proof-Protective-Toiletries-Conditioner-Colourful/dp/B0CC2FS8XQ/
// https://www.amazon.de/-/en/Silicone-Toiletries-Protection-Accessories-Protective/dp/B0BW46D68J
// https://www.amazon.de/-/en/Silicone-Leak-Proof-Reusable-Protection-Protective/dp/B0C5X9FG1V/
// https://www.amazon.de/-/en/P0870422/dp/B00008XXSM/
//

// const {Timestamp} = require('google-protobuf/google/protobuf/timestamp_pb');
// https://github.com/protobufjs/protobuf.js/issues/437
const PodsGenerator = {
  pods(jobPods) {
    const pods = [];
    jobPods.forEach((jobPod) => {
      const pod = {};
      pod.namespace = jobPod.metadata.namespace;
      pod.name = jobPod.metadata.name;
      pod.jobName = Object.fromEntries(jobPod.metadata.labelsMap)['job-name'];
      pod.uid = jobPod.metadata.uid;
      pod.startTime = jobPod.status.starttime.seconds;
      pod.finishedAt = jobPod.finishedat;
      pod.podIPs = jobPod.status.podipsList.map((ip) => ip.ip);
      pod.podIP = jobPod.status.podip;
      pod.hostIP = jobPod.status.hostip;
      pod.nodeName = jobPod.spec.nodename;
      pod.containerStatuses = this.containerStatuses(jobPod.status.containerstatusesList);
      pod.initContainerStatuses = this.containerStatuses(jobPod.status.initcontainerstatusesList);
      pod.ephemeralContainerStatuses = this.containerStatuses(jobPod.status.ephemeralcontainerstatusesList);

      pod.failed = jobPod.failed;
      pod.terminationreasonsList = jobPod.terminationreasonsList;

      let failingC = pod.containerStatuses.filter((status) => status.reason === 'Error');
      let failingI = pod.initContainerStatuses.filter((status) => status.reason === 'Error');
      let failingE = pod.ephemeralContainerStatuses.filter((status) => status.reason === 'Error');

      pod.failing = [].concat(failingC, failingI, failingE);

      // NOTE! Use this somewhere
      let startedC = pod.containerStatuses.filter((status) => status.state === 'running');
      let startedI = pod.initContainerStatuses.filter((status) => status.state === 'running');
      let startedE = pod.ephemeralContainerStatuses.filter((status) => status.state === 'running');

      pod.started = [].concat(startedC, startedI, startedE);
      pods.push(pod);
    });

    pods.failingPods = this.failingPods(pods);
    pods.readyPods = this.readyPods(pods);

    return pods;
  },
  failingPods(pods) {
    const failingPods = pods.filter((pod) => pod.failing.length > 0);
    return failingPods;
  },
  readyPods(pods) {
    const readyPods = pods.filter((pod) => pod.failing.length === 0);
    return readyPods;
  },
  containerStatuses(containerStatuses) {
    const status = containerStatuses.flatMap((containerStatus) => {
      return this.processStatus(containerStatus);
    });
    return status;
  },
  processStatus(containerStatus) {
    let states = Object.entries(containerStatus.state);
    let stateKey = states.find((x) => x[1]);
    let stateAttrs = containerStatus.state[stateKey[0]];

    let status = { state: stateKey, reason: stateAttrs.reason };
    return status;
  },
};

export { PodsGenerator as default };
