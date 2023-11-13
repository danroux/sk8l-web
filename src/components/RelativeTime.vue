<template>
  <span>{{ relativeFromSeconds(target) }} {{ relative(target) }} </span>
</template>

<script>
  import { DateTime } from 'luxon';

export default {
  name: 'RelativeTime',
  props: ['target'],
  methods: {
    relative(t) {
      // DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
      return DateTime.fromISO(t).toRelative();
    },
    format(t) {
      // DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
      return DateTime.fromISO(t).toFormat('LLL d, yyyy');
    },
    fromObject(t) {
      Duration.fromObject({ seconds: x.durationTimeInS }).rescale().toHuman({ unitDisplay: 'short' });
    },
    relativeFromSeconds(t) {
      return DateTime.fromSeconds(t).toRelative();
    },
    narrow(t) {
      return DateTime.fromISO(t).toRelative({ style: 'narrow' });
    },
    duration(t) {
      // Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
      return Duration.fromObject({ seconds: t }).rescale().toHuman({ unitDisplay: 'short' });
    },
  },
  components: {},
};
</script>
