<template>
  <tr>
    <th scope="row" style="text-align: center;">{{ index }}</th>
    <td>{{ activeJob.name }}</td>
    <td>{{ activeJob.namespace }}</td>
    <td>{{ activeJob.uuid }}</td>
    <td>{{ activeJob.generation }}</td>
    <td>{{ lux1(activeJob.creation_timestamp) }}</td>
    <td>{{ activeJob.status.active }}</td>
    <td>{{ activeJob.status.failed }}</td>
    <td>{{ lux1(activeJob.status.startTime) }}</td>
    <td>{{ lux1(activeJob.status.completion_time) }}</td>
    <td>{{ activeJob.duration }}</td>
    <td>{{ activeJob.duration_in_s }}</td>
    <td>{{ activeJob.status }}</td>
  </tr>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'ActiveJob',
  props: [
    'index',
    'activeJob',
  ],
  methods: {
    lux1(t) {
      return DateTime.fromISO(t).toRelative();
    },
  },
};
</script>
