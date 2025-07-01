<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
defineOptions({
  options: {
    styleIsolation: 'shared'
  }
})
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show")
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
.app {
  position: relative;
  width: 199px;
  height: 199px;
}
</style>
