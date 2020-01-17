<template>
  <div class="card-panel">
    <transition
      name="fade"
      appear
      enter-active-class="animated swing"
      leave-active-class="animated fadeOut"
      appear-active-class="animated swing"
    >
      <a v-show="btnMarker" class="sign_">
        <svg-icon icon-class="sign" style="height: 22px;width: 22px" />
      </a>
    </transition>
    <div class="card-panel-icon-wrapper icon-people">
      <svg-icon :icon-class="btnIcon" class-name="card-panel-icon" />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">
        {{ btnText }}
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'CardPanel',
  comments:{
    CountTo
  },
  props: {
    btnText: {
      type: String,
      default: 'default'
    },
    btnIcon: {
      type: String,
      default: 'system'
    },
    btnMarker: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/animate.css";
    .sign_ {
        position: absolute;
        border: 0;
        right: 0;
    }

    .icon-people {
        color: #40c9c6;
    }

    .card-panel:hover {
        .card-panel-icon-wrapper {
            color: #fff;
        }

        .icon-people {
            background: #40c9c6;
        }
    }

    .card-panel {
        margin: 15px;
        width: 300px;
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 48px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;

            .card-panel-text {
                line-height: 55px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }

    @media (max-width: 550px) {
        .card-panel-description {
            display: none;
        }

        .card-panel-icon-wrapper {
            float: none !important;
            width: 100%;
            height: 100%;
            margin: 0 !important;

            .svg-icon {
                display: block;
                margin: 14px auto !important;
                float: none !important;
            }
        }
    }

</style>
