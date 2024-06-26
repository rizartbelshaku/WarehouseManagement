<template>
  <div>
    <div class="button-container">
      <button class="custom-button success" @click="openAddModal">Add New Category</button>
    </div>
    <table  class="custom-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <CardComponent
          v-for="card in data"
          :key="card.id"
          :card="card"
          @open-modal="openModal"
          @delete="openDeleteModal"
      />
      </tbody>
    </table>
    <ModalComponent
        :show="showModal"
        :card="selectedCard"
        :modalTitle="modalTitle"
        :modalAction="modalAction"
        :errorMessage="errorMessage"
        @close="closeModal"
        @save="saveCard"
        @error="setError"
    />
    <SuccessModalComponent
        :show="showSuccessModal"
        :message="successMessage"
        @close="closeSuccessModal"
    />
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <p class="modal-title">Delete Category</p>
        <p class="delete-text">Are you sure you want to delete this category?</p>
        <div class="modal-actions">
          <button class="custom-button secondary" @click="closeDeleteModal">Close</button>
          <button class="custom-button danger" @click="deleteCard">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/cardcomponent/CardComponent.vue';
import ModalComponent from '@/components/cardcomponent/ModifyCategoryModal.vue';
import SuccessModalComponent from '@/components/SuccessModalComponent.vue';
import apiService from '@/api/apiService.js';
import './PagesStyle.css';

export default {
  components: {
    CardComponent,
    ModalComponent,
    SuccessModalComponent
  },
  data() {
    return {
      data: [],
      selectedCard: {
        id: null,
        name: '',
        image: ''
      },
      modalTitle: '',
      modalAction: '',
      showModal: false,
      showDeleteModal: false,
      showSuccessModal: false,
      cardIdToDelete: null,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async fetchData() {
      try {
        this.data = await apiService.fetchCategories();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    openAddModal() {
      this.selectedCard = { id: null, name: '', image: '' };
      this.modalTitle = 'Add New Category';
      this.modalAction = 'Add';
      this.showModal = true;
      this.errorMessage = '';
      this.successMessage = '';
    },
    openModal(card, title, action) {
      this.selectedCard = { ...card };
      this.modalTitle = title;
      this.modalAction = action;
      this.showModal = true;
      this.errorMessage = '';
      this.successMessage = '';
    },
    closeModal() {
      this.showModal = false;
      this.errorMessage = '';
      this.successMessage = '';
    },
    openDeleteModal(cardId) {
      this.cardIdToDelete = cardId;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.successMessage = '';
    },
    setError(message) {
      this.errorMessage = message;
    },
    async saveCard(card) {
      try {
        if (card.id) {
          const updatedCategory = await apiService.updateCategory(card);
          const index = this.data.findIndex(c => c.id === card.id);
          if (index !== -1) {
            this.data.splice(index, 1, updatedCategory);
          }
          this.successMessage = 'Category updated successfully';
        } else {
          const newCategory = await apiService.createCategory(card);
          this.data.push(newCategory);
          this.successMessage = 'New category created successfully';
        }
        this.selectedCard = { id: null, name: '', image: '' };
        this.showModal = false;
        this.showSuccessModal = true;
      } catch (error) {
        this.setError('Error saving category');
        console.error('Error saving category:', error);
      }
    },
    async deleteCard() {
      try {
        await apiService.deleteCategory(this.cardIdToDelete);
        this.data = this.data.filter(card => card.id !== this.cardIdToDelete);
        this.successMessage = 'Category deleted successfully';
        this.showDeleteModal = false;
        this.showSuccessModal = true;
      } catch (error) {
        this.setError('Error deleting category');
        console.error('Error deleting category:', error);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>
