<template>
  <tr>
    <td>{{ card.id }}</td>
    <td>{{ card.name }}</td>
    <td><img :src="card.image" class="category-image" alt="img" /></td>
    <td>
      <div class="category-buttons">
        <button class="custom-button primary" @click="openEditModal">Modify</button>
        <button class="custom-button danger" @click="openDeleteModal">Delete</button>
      </div>

    </td>
  </tr>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  data() {
    return {
      showModal: false,
      selectedCard: { ...this.card },
      modalTitle: '',
      modalAction: '',
      errorMessage: ''
    };
  },
  methods: {
    openEditModal() {
      this.selectedCard = { ...this.card };
      this.modalTitle = 'Edit Category';
      this.modalAction = 'Save';
      this.showModal = true;
      this.$emit('open-modal', this.selectedCard, this.modalTitle, this.modalAction);
    },
    openDeleteModal() {
      this.$emit('delete', this.card.id);
    },
  },
  watch: {
    card(newCard) {
      this.selectedCard = { ...newCard };
    }
  }
}
</script>

<style>
.category-image {
  width: 100px;
  height: auto;
  border-radius: 4px;
}
.category-buttons {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
</style>