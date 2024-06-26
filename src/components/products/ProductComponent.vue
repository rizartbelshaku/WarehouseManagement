<template>
  <tr>
    <td>{{ product.id }}</td>
    <td>{{ product.title }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.description }}</td>
    <td>
      <img :src="product.images[0]" class="category-image" alt="img"/>
    </td>
    <td>
      <button class="custom-button primary" @click="openEditModal">Modify</button>
      <button class="custom-button danger" @click="openDeleteModal">Delete</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openEditModal() {
      this.$emit('open-modal', this.product, 'Edit Product', 'Save');
    },
    openDeleteModal() {
      this.$emit('delete', this.product.id);
    },
  },
  emits: ['open-modal', 'delete'],
}
</script>
