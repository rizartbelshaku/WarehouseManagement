<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content txt">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Success</h2>
      <p>{{ message }}</p>
      <button class="custom-button" @click="$emit('close')">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    message: String,
  }
}
</script>

<style scoped>
.txt {
  color: white;
}
.modal-content {
  background: #439868;
  padding: 20px;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}
</style>
