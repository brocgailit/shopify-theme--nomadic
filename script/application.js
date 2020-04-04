import axios from 'axios';
import NomadicNavbar from './navbar';

const $axios = axios.create({
  baseURL: '/'
});

window.nomadic = window.nomadic || {};

class NomadicApplication {
  setNavbar(element) {
    this.navbar = new NomadicNavbar(document.querySelector('[role="navigation"]'));
  }

  addToCart({ items }) {
    $axios.post('/cart/add.js', { items });
  }

  async getCart() {
    const cart = await $axios.get('/cart.js').then(res => res.data);
    return cart;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  nomadic = new NomadicApplication();
  nomadic.setNavbar(document.querySelector('[role="navigation"]'));
});