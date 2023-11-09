<template>
  <!-- <nav> -->
  <!--   <router-link to="/">Home</router-link> | -->
  <!--   <router-link to="/about">About</router-link> -->
  <!-- </nav> -->
  <!-- <router-view/> -->

  <div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
  .failing_job {
    background: #f4503b !important;
    background: #f33a22 !important;
  }
  .ok_job {
    background: green !important;
    background: #75c181 !important;
    background: #63b971 !important;
  }

  .Box-row--success {
    box-shadow: inset 2px 0 0 #347d39;
  }

  .Box-row--done {
    box-shadow: inset 2px 0 0 #8256d0;
  }

  .Box-row--active {
    box-shadow: inset 2px 0 0 rgb(30, 81, 209);
  }

  .Box-row--danger {
    box-shadow: inset 2px 0 0 rgb(194, 11, 36);
  }
  .repo-language-color {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid var(--color-primer-border-contrast);
    border-radius: 50%;
  }
  .item-pop--success {
    background-color: #347d39;
  }
  .item-pop--danger {
    background-color: rgb(194, 11, 36);
  }
  .item-pop--active {
    background-color: rgb(30, 81, 209);
  }
  .Box-row:first-of-type {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .iESCuU {
    width: 100%;
    margin: 0px 0px 16px;
    overflow: auto;
    border-collapse: separate;
    border-spacing: 0px;
  }
  .orghead {
    padding-top: 16px;
    padding-bottom: 0;
    margin-bottom: 16px;
    color: #1f2328;
    background-color: #f6f8fa;
    border-bottom: 1px solid #d0d7de;
  }

  .pagehead-actions > li {
    float: left;
    margin: 0 8px 0 0;
    font-size: 12px;
    color: var(--color-fg-default);
    list-style-type: none;
  }
  .btn-sm {
    padding: 3px 12px;
    font-size: 12px;
    line-height: 20px;
  }
  .btn {
  }
  .color-calendar-graph-day-bg {
    color: #ebedf0;
  }
  .color-calendar-graph-day-border{ color: rgba(27, 31, 35, 0.06);}
  .color-calendar-graph-day-L1-bg{ color: #9be9a8;}
  .color-calendar-graph-day-L2-bg{ color: #40c463;}
  .color-calendar-graph-day-L3-bg{ color: #30a14e;}
  .color-calendar-graph-day-L4-bg{ color: #216e39;}
  .color-calendar-graph-day-L1-border{ color: rgba(27, 31, 35, 0.06);}
  .color-calendar-graph-day-L2-border{ color: rgba(27, 31, 35, 0.06);}
  .color-calendar-graph-day-L3-border{ color: rgba(27, 31, 35, 0.06);}
  .color-calendar-graph-day-L4-border{ color: rgba(27, 31, 35, 0.06);}

  .copyable-terminal {
    position: relative;
    padding: 8px 55px 8px 8px;
    background-color: rgb(243, 246, 249);
    border-radius: 6px;
  }
</style>
