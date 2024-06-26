<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <p class="modal-title">Update Product</p>
      <hr>
      <form @submit.prevent="validateAndUpdate">
        <div class="custom-form-group">
          <label for="updateTitle">New Title</label>
          <input
              type="text"
              id="updateTitle"
              v-model="updatedProduct.title"
              required
          />
        </div>
        <div class="custom-form-group">
          <label for="updatePrice">New Price</label>
          <input
              type="number"
              id="updatePrice"
              v-model="updatedProduct.price"
              required
          />
        </div>
        <div class="modal-actions">
          <button
              type="button"
              class="custom-button secondary"
              @click="closeModal">Cancel
          </button>
          <button type="submit" class="custom-button primary">
            Update Product
          </button>
        </div>
        <p v-if="localErrorMessage" class="error-message">
          {{ localErrorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import apiProduct from "@/api/apiProduct.js";

export default {
  props: {
    show: Boolean,
    productId: Number,
    initialTitle: String,
    initialPrice: Number,
  },
  data() {
    return {
      updatedProduct: { title: this.initialTitle, price: this.initialPrice },
      localErrorMessage: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.updatedProduct = { title: this.initialTitle, price: this.initialPrice };
      this.localErrorMessage = "";
    },
    async validateAndUpdate() {
      console.log('validateAndUpdate called');
      console.log('productId:', this.productId);
      console.log('updatedProduct:', this.updatedProduct);
      if (!this.updatedProduct.title.trim() || !this.updatedProduct.price) {
        this.localErrorMessage = "Title and price are required.";
        return;
      }
      try {
        await apiProduct.updateProduct(this.productId, this.updatedProduct);
        this.$emit("product-updated-success");
        this.closeModal();
      } catch (error) {
        this.localErrorMessage = error.message;
      }
    }
  }
};
</script>

