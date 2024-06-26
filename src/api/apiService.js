class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchCategories() {
        try {
            const response = await fetch(`${this.baseURL}/categories`);
            if (!response.ok)  new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }

    async createCategory(category) {
        try {
            const response = await fetch(`${this.baseURL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
            });
            if (!response.ok)  new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    }

    async updateCategory(category) {
        try {
            const response = await fetch(`${this.baseURL}/categories/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
            });
            if (!response.ok) new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    }

    async deleteCategory(id) {
        try {
            const response = await fetch(`${this.baseURL}/categories/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok)  new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
}

export default new ApiService('https://api.escuelajs.co/api/v1');
