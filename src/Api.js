class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.group = "group-8";
        this.token = token;
    }
    signUp(body) {
        body.group = this.group;
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    signIn(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }

    getProductById() {
        return fetch(`${this.path}/products/${this.id}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }

    createProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    modifyProduct(body) {
        return fetch(`${this.path}/products/${this._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    deleteProduct() {
        return fetch(`${this.path}/products/${this._id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }

}

export {Api};