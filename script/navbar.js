export default class NomadicNavbar {

  expanded = false;

  constructor(container) {
    this.container = container;
    this.initialize();
  }

  initialize() {
    this.toggleButton = this.container.querySelector('[aria-expanded]');
    this.menu = this.container.querySelector('#navbar');
    this.menu.addEventListener('click', () => { this.close() })
    this.toggleButton.addEventListener('click', () => { this.toggle() });
  }

  open() {
    this.setExpanded(true)
  }

  close() {
    this.setExpanded(false)
  }

  toggle() {
    this.setExpanded(!this.expanded)
  }

  setExpanded(expanded) {
    this.expanded = expanded;
    this.update();
  }

  update() {
    const transition = this.expanded ? 'add' : 'remove';
    this.toggleButton.setAttribute('aria-expanded', this.expanded);
    this.menu.classList.add(`${transition}-active`);
    this.menu.classList[transition]('active');
    if (transition === 'add') {
      setTimeout(() => {
          this.menu.classList.remove(`${transition}-active`);
      }, 50)
    }
    this.menu.addEventListener('transitionend', () => {
      this.menu.classList.remove(`${transition}-active`);
    });
  }
}