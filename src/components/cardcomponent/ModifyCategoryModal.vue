<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <p class="modal-title">{{ modalTitle }}</p>
      <hr>
      <div class="category-name">
        <label>
        Category Name
        </label>
        <input type="text" v-model="localCard.name" />
      </div>
      <div class="category-url">
        <label>
        Category Image URL
        </label>
        <input type="text" v-model="localCard.image" />
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="modal-actions">
        <button class="custom-button secondary" @click="$emit('close')">Close</button>
        <button class="custom-button primary" @click="validateAndSave">{{ modalAction }}</button>
      </div>
    </div>
  </div>
</template>


<script>
import './ModifyCategoryModal.css';

export default {
  props: {
    show: Boolean,
    card: Object,
    modalTitle: String,
    modalAction: String,
    errorMessage: String
  },
  data() {
    return {
      localCard: { ...this.card }
    };
  },
  watch: {
    card(newCard) {
      this.localCard = { ...newCard };
    }
  },
  methods: {
    validateAndSave() {
      if (!this.localCard.name) {
        this.$emit('error', 'Please fill in the name field.');
        return;
      }
      if (!this.localCard.image) {
        this.$emit('error', 'Please fill in the image URL field.');
        return;
      }
      this.$emit('save', this.localCard);
    }
  }
}</script>


