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
      pod.jobName = jobPod.metadata.labels['job-name'];
      pod.uid = jobPod.metadata.uid;
      pod.startTime = Number(jobPod.status.startTime.seconds);
      pod.finishedAt = jobPod.finishedat;
      pod.podIPs = jobPod.status.podIPs.map((ip) => ip.ip);
      pod.podIP = jobPod.status.podIP;
      pod.hostIP = jobPod.status.hostIP;
      pod.nodeName = jobPod.spec.nodename;
      pod.containerStatuses = this.containerStatuses(jobPod.status.containerStatuses);
      pod.initContainerStatuses = this.containerStatuses(jobPod.status.initContainerStatuses);
      pod.ephemeralContainerStatuses = this.containerStatuses(jobPod.status.ephemeralContainerStatuses);

      pod.failed = jobPod.failed;
      pod.terminationReasons = jobPod.terminationReasons;

      let waitingC = pod.containerStatuses.filter((status) => {
        return status.state && status.state[0] === "waiting";
      });
      let waitingI = pod.initContainerStatuses.filter((status) => {
        return status.state && status.state[0] === "waiting";
      });
      let waitingE = pod.ephemeralContainerStatuses.filter((status) => {
        return status.state && status.state[0] === "waiting";
      });

      pod.waiting = [].concat(waitingC, waitingI, waitingE);

      let failingC = pod.containerStatuses.filter(this.errorReason);
      let failingI = pod.initContainerStatuses.filter(this.errorReason);
      let failingE = pod.ephemeralContainerStatuses.filter(this.errorReason);

      pod.failing = [].concat(failingC, failingI, failingE);

      // NOTE! Use this somewhere
      let startedC = pod.containerStatuses.filter(this.runningState);
      let startedI = pod.initContainerStatuses.filter(this.runningState);
      let startedE = pod.ephemeralContainerStatuses.filter(this.runningState);

      pod.started = [].concat(startedC, startedI, startedE);
      pods.push(pod);
    });

    pods.failingPods = this.failingPods(pods);
    pods.readyPods = this.readyPods(pods);
    pods.waitingPods = this.waitingPods(pods);

    return pods;
  },
  runningState(status) {
    return status.state === 'running';
  },
  errorReason(status) {
    return status.reason === 'Error' || status.reason === "CreateContainerConfigError";
  },
  failingPods(pods) {
    const failingPods = pods.filter((pod) => pod.failing.length > 0);
    return failingPods;
  },
  waitingPods(pods) {
    const waitingPods = pods.filter((pod) => pod.waiting.length > 0);
    return waitingPods;
  },
  readyPods(pods) {
    const readyPods = pods.filter((pod) => pod.failing.length === 0 && pod.waiting.length == 0);
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
