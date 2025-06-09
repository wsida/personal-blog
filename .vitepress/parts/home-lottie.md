<script setup>
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';
import lottieJson from '@/asserts/lottie/letmesee.json';

const mounted = ref(false);
const lottieRef = ref();
onMounted(() => {
  mounted.value = true;
  setTimeout(() => {
    lottie.loadAnimation({
        container: lottieRef.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieJson,
    });
  }, 300)
})
</script>

<style>
.lottie-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 192px;
  height: 192px;
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  .lottie-wrapper {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  .lottie-wrapper {
    width: 320px;
    height: 320px;
  }
}
</style>

<Teleport v-if="mounted" to=".image-container">
  <div ref="lottieRef" id="lottie" class="lottie-wrapper"></div>
</Teleport>
