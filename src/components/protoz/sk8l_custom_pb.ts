// @generated by protoc-gen-es v1.7.2 with parameter "target=ts,import_extension=.ts"
// @generated from file sk8l_custom.proto (package sk8l_custom, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";
import { JobCondition, UncountedTerminatedPods } from "./k8s.io/api/batch/v1/generated_pb.ts";
import { Time } from "./k8s.io/apimachinery/pkg/apis/meta/v1/generated_pb.ts";

/**
 * JobStatus represents the current state of a Job.
 *
 * @generated from message sk8l_custom.JobStatus
 */
export class JobStatus extends Message<JobStatus> {
  /**
   * The latest available observations of an object's current state. When a Job
   * fails, one of the conditions will have type "Failed" and status true. When
   * a Job is suspended, one of the conditions will have type "Suspended" and
   * status true; when the Job is resumed, the status of this condition will
   * become false. When a Job is completed, one of the conditions will have
   * type "Complete" and status true.
   * More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/
   * +optional
   * +patchMergeKey=type
   * +patchStrategy=merge
   * +listType=atomic
   *
   * @generated from field: repeated k8s.io.api.batch.v1.JobCondition conditions = 1;
   */
  conditions: JobCondition[] = [];

  /**
   * Represents time when the job controller started processing a job. When a
   * Job is created in the suspended state, this field is not set until the
   * first time it is resumed. This field is reset every time a Job is resumed
   * from suspension. It is represented in RFC3339 form and is in UTC.
   * +optional
   *
   * @generated from field: optional k8s.io.apimachinery.pkg.apis.meta.v1.Time startTime = 2;
   */
  startTime?: Time;

  /**
   * Represents time when the job was completed. It is not guaranteed to
   * be set in happens-before order across separate operations.
   * It is represented in RFC3339 form and is in UTC.
   * The completion time is only set when the job finishes successfully.
   * +optional
   *
   * @generated from field: optional k8s.io.apimachinery.pkg.apis.meta.v1.Time completionTime = 3;
   */
  completionTime?: Time;

  /**
   * The number of pending and running pods.
   * +optional
   *
   * @generated from field: optional int32 active = 4;
   */
  active?: number;

  /**
   * The number of pods which reached phase Succeeded.
   * +optional
   *
   * @generated from field: optional int32 succeeded = 5;
   */
  succeeded?: number;

  /**
   * The number of pods which reached phase Failed.
   * +optional
   *
   * @generated from field: optional int32 failed = 6;
   */
  failed?: number;

  /**
   * The number of pods which are terminating (in phase Pending or Running
   * and have a deletionTimestamp).
   *
   * This field is alpha-level. The job controller populates the field when
   * the feature gate JobPodReplacementPolicy is enabled (disabled by default).
   * +optional
   *
   * @generated from field: optional int32 terminating = 11;
   */
  terminating?: number;

  /**
   * completedIndexes holds the completed indexes when .spec.completionMode =
   * "Indexed" in a text format. The indexes are represented as decimal integers
   * separated by commas. The numbers are listed in increasing order. Three or
   * more consecutive numbers are compressed and represented by the first and
   * last element of the series, separated by a hyphen.
   * For example, if the completed indexes are 1, 3, 4, 5 and 7, they are
   * represented as "1,3-5,7".
   * +optional
   *
   * @generated from field: optional string completedIndexes = 7;
   */
  completedIndexes?: string;

  /**
   * FailedIndexes holds the failed indexes when backoffLimitPerIndex=true.
   * The indexes are represented in the text format analogous as for the
   * `completedIndexes` field, ie. they are kept as decimal integers
   * separated by commas. The numbers are listed in increasing order. Three or
   * more consecutive numbers are compressed and represented by the first and
   * last element of the series, separated by a hyphen.
   * For example, if the failed indexes are 1, 3, 4, 5 and 7, they are
   * represented as "1,3-5,7".
   * This field is alpha-level. It can be used when the `JobBackoffLimitPerIndex`
   * feature gate is enabled (disabled by default).
   * +optional
   *
   * @generated from field: optional string failedIndexes = 10;
   */
  failedIndexes?: string;

  /**
   * uncountedTerminatedPods holds the UIDs of Pods that have terminated but
   * the job controller hasn't yet accounted for in the status counters.
   *
   * The job controller creates pods with a finalizer. When a pod terminates
   * (succeeded or failed), the controller does three steps to account for it
   * in the job status:
   *
   * 1. Add the pod UID to the arrays in this field.
   * 2. Remove the pod finalizer.
   * 3. Remove the pod UID from the arrays while increasing the corresponding
   *     counter.
   *
   * Old jobs might not be tracked using this field, in which case the field
   * remains null.
   * +optional
   *
   * @generated from field: optional k8s.io.api.batch.v1.UncountedTerminatedPods uncountedTerminatedPods = 8;
   */
  uncountedTerminatedPods?: UncountedTerminatedPods;

  /**
   * The number of pods which have a Ready condition.
   *
   * This field is beta-level. The job controller populates the field when
   * the feature gate JobReadyPods is enabled (enabled by default).
   * +optional
   *
   * @generated from field: optional int32 ready = 9;
   */
  ready?: number;

  /**
   * ////// sk8l custom
   *
   * @generated from field: int64 startTimeInS = 880 [json_name = "start_time_in_s"];
   */
  startTimeInS = protoInt64.zero;

  /**
   * @generated from field: int64 completionTimeInS = 881 [json_name = "completion_time_in_s"];
   */
  completionTimeInS = protoInt64.zero;

  constructor(data?: PartialMessage<JobStatus>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sk8l_custom.JobStatus";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "conditions", kind: "message", T: JobCondition, repeated: true },
    { no: 2, name: "startTime", kind: "message", T: Time, opt: true },
    { no: 3, name: "completionTime", kind: "message", T: Time, opt: true },
    { no: 4, name: "active", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 5, name: "succeeded", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 6, name: "failed", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 11, name: "terminating", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 7, name: "completedIndexes", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 10, name: "failedIndexes", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 8, name: "uncountedTerminatedPods", kind: "message", T: UncountedTerminatedPods, opt: true },
    { no: 9, name: "ready", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 880, name: "startTimeInS", jsonName: "start_time_in_s", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 881, name: "completionTimeInS", jsonName: "completion_time_in_s", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): JobStatus {
    return new JobStatus().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): JobStatus {
    return new JobStatus().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): JobStatus {
    return new JobStatus().fromJsonString(jsonString, options);
  }

  static equals(a: JobStatus | PlainMessage<JobStatus> | undefined, b: JobStatus | PlainMessage<JobStatus> | undefined): boolean {
    return proto3.util.equals(JobStatus, a, b);
  }
}

