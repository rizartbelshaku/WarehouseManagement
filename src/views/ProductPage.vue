<template>
  <div>
    <div class="button-container">
      <button class="custom-button success" @click="openAddModal">Add new Product</button>
    </div>
    <table  class="custom-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Price</th>
        <th>Description</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <ProductComponent
          v-for="product in products"
          :key="product.id"
          :product="product"
          @open-modal="openModal"
          @delete="openDeleteModal"
      />
      </tbody>
    </table>
    <AddModal
        :show="showAddModal"
        @close="closeAddModal"
        @product-added="refreshProducts"
    />
    <ModifyModal
        :show="showModifyModal"
        :product-id="selectedProduct?.id"
        :initial-title="selectedProduct?.title"
        :initial-price="selectedProduct?.price"
        @close="closeModifyModal"
        @product-updated-success="refreshProducts"
    />
    <SuccessModalComponent
        :show="showSuccessModal"
        :message="successMessage"
        @close="closeSuccessModal"
    />
  </div>
  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal-content">
      <p class="modal-title">Delete Product</p>
      <p class="delete-text">Are you sure you want to delete this product?</p>
      <div class="modal-actions">
        <button class="custom-button secondary" @click="closeDeleteModal">Cancel</button>
        <button class="custom-button danger" @click="confirmDeleteProduct">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductComponent from "@/components/products/ProductComponent.vue";
import AddModal from "@/components/products/AddProductModal.vue";
import ModifyModal from "@/components/products/ModifyProductModal.vue";
import SuccessModalComponent from "@/components/SuccessModalComponent.vue";
import apiProduct from "@/api/apiProduct.js";

export default {
  components: {
    ProductComponent,
    AddModal,
    ModifyModal,
    SuccessModalComponent,
  },
  data() {
    return {
      products: [],
      showAddModal: false,
      showModifyModal: false,
      showSuccessModal: false,
      selectedProduct: null,
      showDeleteModal: false,
      successMessage: "",
    };
  },
  methods: {
    async fetchProducts() {
      try {
        this.products = await apiProduct.fetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
    },
    openModal(product) {
      this.selectedProduct = product;
      this.showModifyModal = true;
    },
    closeModifyModal() {
      this.showModifyModal = false;
      this.selectedProduct = null;
    },
    openDeleteModal(productId) {
      this.selectedProduct = productId;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.selectedProduct = null;
    },
    async refreshProducts() {
      await this.fetchProducts();
      this.showAddModal = false;
      this.showModifyModal = false;
      this.showSuccessModal = true;
      this.successMessage = "Product added or updated successfully.";
    },
    async confirmDeleteProduct() {
      try {
        await apiProduct.deleteProduct(this.selectedProduct);
        this.selectedProduct = null;
        await this.fetchProducts();
        this.showSuccessModal = true;
        this.successMessage = "Product deleted successfully.";
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        this.closeDeleteModal();
      }
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.successMessage = "";
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
