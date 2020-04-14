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

  intersect(target, once = false, cb, options = { threshold: [0, 0.25, 0.5, 0.75, 1] }) {
    const handleIntersection = ([{isIntersecting, intersectionRatio}]) => {
      target.classList[isIntersecting ? 'add' : 'remove']('is-intersecting');
      if(typeof cb !== 'undefined') {
        cb({isIntersecting, intersectionRatio})
      }
      if(isIntersecting && once) {
        observer.unobserve(target);
      }
    }
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(target)
  }

  async recommendations(product_id, limit, selector, callback) {
    const responseHTML = await $axios.get('/recommendations/products', {
      params: {
        section_id: 'product-recommendations',
        limit,
        product_id
      }
    }).then(res => res.data);

    if(selector) {
      const section = document.querySelector(selector);
      const container = document.createElement("div");
      container.innerHTML = responseHTML;
      section.innerHTML = container.querySelector(selector).innerHTML;
    }
    if(callback) {
      callback(responseHTML);
    }
    return responseHTML;
  }
}

nomadic = new NomadicApplication();

window.addEventListener('DOMContentLoaded', () => {
  nomadic.setNavbar(document.querySelector('[role="navigation"]'));
});