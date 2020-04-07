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

  intersect(target, once = false, cb) {
    const handleIntersection = ([{isIntersecting, intersectionRatio}]) => {
      target.classList[isIntersecting ? 'add' : 'remove']('is-intersecting');
      if(typeof cb !== 'undefined') {
        cb({isIntersecting, intersectionRatio})
      }
      if(isIntersecting && once) {
        observer.unobserve(target);
      }
    }
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(target)
  }
}

nomadic = new NomadicApplication();

window.addEventListener('DOMContentLoaded', () => {
  nomadic.setNavbar(document.querySelector('[role="navigation"]'));
});