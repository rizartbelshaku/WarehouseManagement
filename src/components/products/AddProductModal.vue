<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <p class="modal-title">Add Product</p>
      <hr>
      <form @submit.prevent="validateAndSave">
        <div class="custom-form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="localProduct.title" required />
        </div>
        <div class="custom-form-group">
          <label for="price">Price</label>
          <input type="number" id="price" v-model="localProduct.price" required />
        </div>
        <div class="custom-form-group">
          <label for="description">Description</label>
          <input id="description" v-model="localProduct.description" required />
        </div>
        <div class="custom-form-group">
          <label for="categoryId">Category ID</label>
          <input type="number" id="categoryId" v-model="localProduct.categoryId" required />
        </div>
        <div class="custom-form-group">
          <label for="images">Image URL</label>
          <input type="text" id="images" v-model="localProduct.images[0]" required />
        </div>
        <div class="modal-actions">
          <button type="button" class="custom-button secondary" @click="close">Cancel</button>
          <button type="submit" class="custom-button primary">Add Product</button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import apiProduct from "@/api/apiProduct.js";

export default {
  props: {
    show: Boolean,
    errorMessage: String,
  },
  data() {
    return {
      localProduct: {
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: [""],
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.localProduct = {
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: [""],
        errorMessage: String
      };
    },
    async validateAndSave() {
      if (!this.localProduct.title.trim()) {
        this.$emit("error", "Title field is required.");
        return;
      }
      if (!this.localProduct.price) {
        this.$emit("error", "Price field is required.");
        return;
      }
      if (!this.localProduct.description) {
        this.$emit("error", "Description field is required.");
        return;
      }
      if (!this.localProduct.categoryId) {
        this.$emit("error", "Category ID field is required.");
        return;
      }
      if (!this.localProduct.images[0]) {
        this.$emit("error", "Image URL field is required.");
        return;
      }
      try {
        await apiProduct.createProduct(this.localProduct);
        this.$emit("product-added");
        this.close();
      } catch (error) {
        this.$emit("error", error.message);
      }
    }
  }
}
</script>
