<template>
  <transition>
    <div class="message" v-show="visible">
      {{message}}
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Message',
    data () {
      return {
        msg: '',
        type: 'success',
        duration: 3000,
        visible: false
      };
    },
    mounted () {
      if (this.duration) {
        setTimeout(() => {
          this.$destroy();
          this.$el.remove();
        }, this.duration);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .message {
    &.v-enter {
      opacity: 0;
    }
    &.v-enter-active, &.v-leave-active {
      transition: all 0.3s;
    }
    &.v-leave-to {
      opacity: 0;
    }
  }
</style>
