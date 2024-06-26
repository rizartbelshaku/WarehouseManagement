<template>
  <nav class="navbar">
    <div class="navbar-title"> Shop Management System</div>
    <div class="navbar-menu">
      <router-link to="/cards" class="nav-link">Categories</router-link>
      <router-link to="/products" class="nav-link">Products</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  font-family: "Comic Sans MS";
  background-color: #009879;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px 0px 10px 0px;
}
.navbar-title {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.navbar-menu {
  display: flex;
  flex-direction: row;
}
.nav-link {
  color: white;
  padding: 0.75rem 1rem;
  text-decoration: none;
  font-size: 18px;
  margin-right: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.nav-link:hover {
  background-color: #45a049;
  transform: scale(1.05);
}
</style>
