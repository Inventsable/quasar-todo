<template>
  <!-- quasarcade -->
  <div class="outside" :style="getOutsideStyle()">
    <q-card
      ref="joybounds"
      v-touch-pan.prevent.mouse="handlePan"
      :style="getBoundsStyle()"
      class="custom-area cursor-move text-white shadow-2 relative-position row flex-center"
    >
      <q-tooltip
        :value="isDragging"
        @input="val => { !val ? isDragging = val : null }"
        anchor="bottom middle"
        self="top middle"
      >{{fakePos}}</q-tooltip>
      <div v-if="showInfo" class="custom-info">
        <pre>{{ info }}</pre>
      </div>
      <div v-if="showInfo" class="text-center">
        <q-icon name="arrow_upward" />
        <div class="row items-center">
          <q-icon name="arrow_back" />
          <div>Pan</div>
          <q-icon name="arrow_forward" />
        </div>
        <q-icon name="arrow_downward" />
      </div>

      <div v-if="showInfo" v-show="panning" class="touch-signal">
        <q-icon name="touch_app" />
      </div>
    </q-card>
    <div class="controller" :style="getControllerStyle()">
      <!-- <q-tooltip v-model="isDragging">{{fakePos}}</q-tooltip> -->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    info: null,
    showInfo: false,
    panning: false,
    isDragging: false,
    isHovering: false,
    showTooltip: false,
    dirty: false,
    size: 10,
    padding: 10,
    realCoords: {
      x: null,
      y: null
    },
    joyCoords: {
      x: null,
      y: null
    },
    centerPoint: 20,
    controllerSize: 20,
    isMounted: false
  }),
  props: {
    name: String,
    color: {
      type: String,
      default: "#fff"
    },
    background: {
      type: String,
      default: "var(--q-color-primary)"
    }
  },
  computed: {
    joyPos() {
      return `[${this.realCoords.x}, ${this.realCoords.y}]`;
    },
    fakePos() {
      return `[${this.joyCoords.x}, ${this.joyCoords.y}]`;
    }
  },
  watch: {
    joyPos(x) {
      this.getNewJoyPos();
    },
    isDragging(state) {
      if (state) {
        this.showTooltip = state;
      }
    }
  },
  mounted() {
    this.isMounted = true;
    this.init();
    window.addEventListener("resize", () => {
      this.calculateSize();
    });
  },
  methods: {
    init() {
      this.calculateSize();
    },
    // Reset Joystick to Origin pose ([0, 0])
    reset() {
      this.calculateSize();
      this.setPosition(0, 0);
    },
    // Set controller position to Joystick equivalent range [-200 to 200] for each axis
    setPosition(x, y) {
      this.dirty = true;
      try {
        let size = this.getBoundsSize(this.$refs.joybounds.$el).width;
        let offset = size / 2;
        let ratio = offset / 200;
        this.realCoords.x = x * ratio + offset;
        this.realCoords.y = y * ratio + offset;
      } catch (err) {
        // This currently fires on window changes when Joystick isn't rendered
        // Should be better, perhaps watching parent element size
      }
    },
    getPosition() {
      return {
        x: this.joyCoords.x,
        y: this.joyCoords.y
      };
    },
    // Recalculate Joystick dimensions by the parent HTML element
    calculateSize() {
      this.size = this.getParentSize() - this.getParentSize() / 5;
      this.padding = (this.getParentSize() - this.size) / 2;
      this.controllerSize = this.getParentSize() - this.size;
      this.centerPoint = this.size / 2;
      // Handle window resizing by centering if unmodified
      if (this.dirty) {
        this.joyCoords.x !== null && this.joyCoords.y !== null
          ? this.setPosition(this.joyCoords.x, this.joyCoords.y)
          : this.setPosition(0, 0);
      } else {
        this.realCoords.x = this.centerPoint;
        this.realCoords.y = this.centerPoint;
      }
    },
    // Handle inline CSS styles for wrapper, bounds and controller
    getOutsideStyle() {
      if (this.isMounted)
        return `
        padding: ${this.padding}px;
        width: ${this.size + this.padding * 2}px;
        height: ${this.size + this.padding * 2}px
      `;
      else return ``;
    },
    // Override CSS within calculated inline style to ensure sizing is correct
    getBoundsStyle() {
      return `
        width: ${this.size}px;
        height: ${this.size}px;
        background-color: ${this.background}
      `;
    },
    getControllerStyle() {
      return `
        opacity: ${this.isDragging ? ".5" : "1"};
        width: ${this.controllerSize}px;
        height: ${this.controllerSize}px;
        z-index: 10;
        left: ${this.realCoords.x}px;
        top: ${this.realCoords.y}px;
        background-color: ${this.color}`;
    },
    handlePan({ evt, ...info }) {
      this.info = info;
      this.dirty = true;
      this.getRealControllerPosition(
        this.getParentOffset(this.$refs.joybounds.$el),
        info
      );
      if (info.isFirst) {
        this.panning = true;
      } else if (info.isFinal) {
        this.panning = false;
      }
      this.$emit("update", {
        x: this.joyCoords.x,
        y: this.joyCoords.y,
        name: this.name || "default"
      });
      this.isDragging = !info.isFinal;
    },
    getParentOffset(el) {
      var _x = 0;
      var _y = 0;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: _y, left: _x };
    },
    getRealControllerPosition(parent, info) {
      try {
        let left = (parent.left - info.position.left) * -1;
        let top = (parent.top - info.position.top) * -1;
        this.realCoords.x =
          left > 0
            ? left < this.$refs.joybounds.$el.offsetWidth
              ? left
              : this.$refs.joybounds.$el.offsetWidth
            : 0;
        this.realCoords.y =
          top > 0
            ? top < this.$refs.joybounds.$el.offsetHeight
              ? top
              : this.$refs.joybounds.$el.offsetWidth
            : 0;
      } catch (err) {
        // No need for error. This nullifies when dragging outside bounds of element
      }
    },
    // Determine where controller is on a scale of [-200 - 200] by current position within bounds
    getNewJoyPos() {
      let size = this.getBoundsSize(this.$refs.joybounds.$el).width;
      let offset = size / 2;
      let ratio = offset / 200;
      this.joyCoords.x = Math.round((this.realCoords.x - offset) / ratio);
      this.joyCoords.y = Math.round((this.realCoords.y - offset) / ratio);
    },
    getParentSize() {
      return this.$el && this.$el.parentNode
        ? this.$el.parentNode.clientWidth
        : "0";
    },
    getBoundsSize(elt) {
      return {
        width: elt.offsetWidth,
        height: elt.offsetHeight
      };
    }
  }
};
</script>

<style lang="sass" scoped>
.controller
  position: absolute
  pointer-events: none
  box-shadow: 0 5px 10px rgba(0,0,0,.05), 0 15px 40px rgba(0,0,0,.2);

.outside
  position: relative
  width: 100%
  height: 100%

.custom-area
  position: absolute
  width: 50%
  padding: 8px
  cursor: grab
  border: 10px solid rgba(255,255,255,0.15)

.custom-area:after 
  content: "";
  display: block;
  padding-bottom: 100%;

.custom-info pre
  font-size: 12px
  user-select: none
  color: black

.touch-signal
  position: absolute
  top: 16px
  right: 16px
  width: 35px
  height: 35px
  font-size: 25px
  border-radius: 50% !important
  text-align: center
  background: rgba(255, 255, 255, .2)
</style>