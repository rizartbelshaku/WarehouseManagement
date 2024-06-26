class apiProduct {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchProducts() {
        try {
            const response = await fetch(`${this.baseURL}/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async createProduct(product) {
        try {
            if (!product.title ||
                !product.price ||
                !product.description ||
                !product.categoryId ||
                !product.images ||
                !product.images.length) {
                throw new Error('Invalid product data');
            }
            const response = await fetch(`${this.baseURL}/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to create product');
            }
            return responseData;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, updatedProduct) {
        try {
            if (!updatedProduct.title.trim() || !updatedProduct.price) {
                throw new Error('Title and price are required.');
            }
            const response = await fetch(`${this.baseURL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updatedProduct.title,
                    price: updatedProduct.price,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }


    async deleteProduct(id) {
        try {
            if (!id) {
                throw new Error('Product ID is missing');
            }
            const response = await fetch(`${this.baseURL}/products/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const responseData = await response.json();
                console.error('Error deleting product:', response.status, responseData);
                throw new Error(responseData.message || 'Failed to delete product');
            }
            return;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

export default new apiProduct('https://api.escuelajs.co/api/v1');
