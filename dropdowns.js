document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.custom-dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.custom-dropdown-trigger');
    const menu = dropdown.querySelector('.custom-dropdown-menu');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');

    if (!trigger || !menu || !hiddenInput) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    menu.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', (event) => {
        const value = item.getAttribute('data-value');
        if (!value) return;

        menu.querySelectorAll('li').forEach(option => option.classList.remove('selected'));
        item.classList.add('selected');
        const label = item.textContent.trim();
        const labelElement = trigger.querySelector('.dropdown-value');
        if (labelElement) {
          labelElement.textContent = label;
        }
        hiddenInput.value = value;
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-dropdown.open').forEach(openDropdown => {
      openDropdown.classList.remove('open');
      const trigger = openDropdown.querySelector('.custom-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });
});
