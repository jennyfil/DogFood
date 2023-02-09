const onResponce = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

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
        }).then(onResponce);
    }

    signIn(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(onResponce);
    }

    getUserById(userId) {
        return fetch(`${this.path}/v2/group-8/users/${userId}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponce);
    }

    updUserInfo(body, img = false) {
        return fetch(`${this.path}/v2/${this.group}/users/me${img ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        }).then(onResponce);
    }

    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponce);
    }

    getProductById(productId) {
        return fetch(`${this.path}/products/${productId}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponce);
    }

    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        }).then(onResponce);
    }

    modifyProduct(productId, body) {
        return fetch(`${this.path}/products/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        }).then(onResponce);
    }

    deleteProduct(productId) {
        return fetch(`${this.path}/products/${productId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponce);
    }

    setLike(productId, isLike) {
        return fetch(`${this.path}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`            }
        }).then(onResponce);
    }

    addReview(productId, body) {
        return fetch(`${this.path}/products/review/${productId}`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(onResponce);
    }

    deleteReview(productId, reviewId) {
        return fetch(`${this.path}/products/review/${productId}/${reviewId}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        }).then(onResponce);
    }
}

export {Api};