<template>
  <q-page class="flex justify-center">
    <div class="main">
      <div class="joystick-container" v-for="(joystick, i) in joysticks" :key="i">
        <div class="q-px-lg">
          <q-banner dense inline-actions class="bg-grey-3">
            {{joystick.name}}
            <template v-slot:action>
              <q-btn flat>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="joystick.color" />
                  </q-popup-proxy>
                </q-icon>
              </q-btn>
            </template>
          </q-banner>
        </div>
        <div class="joystick-wrapper">
          <joystick
            @update="updateCoords"
            :background="joystick.color"
            :ref="joystick.name"
            :name="joystick.name"
          />
        </div>
      </div>
      <div class="absolute-bottom text-center q-mb-lg">
        <q-btn @click="createJoystick" round color="primary" size="24px" icon="mdi-plus" />
      </div>
    </div>
  </q-page>
</template>

<script>
import joystick from "../components/joystick.vue";

export default {
  components: {
    joystick: joystick
  },
  data: () => ({
    joysticks: [
      {
        name: "Joystick1",
        x: 0,
        y: 0,
        color: "#26a69a"
      }
    ],
    joyCoords: {
      x: null,
      y: null
    }
  }),
  mounted() {
    this.joysticks.forEach(joystick => {
      this.$refs[joystick.name][0].init();
    });
  },
  methods: {
    createJoystick() {
      let name = `Joystick${this.joysticks.length + 1}`;
      this.joysticks.push({
        name: name,
        x: 0,
        y: 0,
        color: "#1a456b"
      });
    },
    updateCoords(data) {
      let target = this.joysticks.find(joystick => {
        return joystick.name == data.name;
      });
      target.x = data.x;
      target.y = data.y;
    },
    checkCoords(obj) {
      this.joyCoords.x = obj.x;
      this.joyCoords.y = obj.y;
    }
  }
};
</script>

<style>
@media screen and (min-width: 900px) {
  .joystick-container {
    width: 325px !important;
  }
}

.main {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  min-width: 150px;
  width: 100%;
}

.joystick-wrapper {
  width: 100%;
}

.joystick-container {
  width: 50%;
  padding: 15px 30px;
  min-width: 250px;
}

.realCoords {
  font-size: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.centered {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>